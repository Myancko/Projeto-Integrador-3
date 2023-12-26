"use client"
import React, { useState } from 'react';
import axios from 'axios';

export default function UserHeaderSection() {
    const [lastId, setLastId] = useState(null);

    const submitRequest = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/request/get/last_id');
            console.log(response.data.last_id, '<<<<');
            setLastId(response.data.last_id);
        } catch (error) {
            console.error('Error fetching last ID:', error);
        }
    };

    return (
        <div>
            <button onClick={submitRequest}>Get Last ID</button>
            {lastId !== null && (
                <p>{lastId ? lastId  : 'aaaaaaaaaaa'}</p>
            )}
            <p></p>
        </div>
    );
}

