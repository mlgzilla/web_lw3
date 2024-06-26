import {YMaps, Map, Clusterer, Placemark, ObjectManager,} from '@pbe/react-yandex-maps';
import React, {useState, useEffect} from 'react';

const getQuery = `SELECT * FROM coords`;


export const getStaticProps = async () => {
    const {Client} = require('pg');
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: '1234',
        port: 5432,
        idleTimeoutMillis: 20000,
        connectionTimeoutMillis: 20000,
    });
    await client.connect();
    const coords = await client.query(getQuery);
    client.end();
    console.log(coords.rows);
    return {
        props: {stores: coords.rows}
    }
}
const MapZoo = ({stores}) => {
    let newStore = [];
    for (let store of stores) {
        newStore.push({
            id: store.id,
            coordinates: [store.x, store.y],
        })
    }
    const [placemarks, setPlacemarks] = useState(newStore);

    const addPlacemark = async function (e) {
        const newPlacemark = {
            id: placemarks.length + 1,
            coordinates: [e.get('coords')[0], e.get('coords')[1]],
        };
        let values = {
            length: placemarks.length,
            x: e.get('coords')[0],
            y: e.get('coords')[1]
        };
        fetch('/api/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });
        setPlacemarks([...placemarks, newPlacemark]);
    }

    return (
        <div>
            <h2>Информация о зоомагазинах</h2>
            <YMaps>
                <Map defaultState={{center: [55.751574, 37.573856], zoom: 10}}
                     style={{width: '800px', height: '600px'}}
                     onClick={addPlacemark}>
                    {placemarks.map((placemark) => (
                        <Placemark key={placemark.id} geometry={placemark.coordinates}/>
                    ))}
                </Map>
            </YMaps>
        </div>
    )
};

export default MapZoo;