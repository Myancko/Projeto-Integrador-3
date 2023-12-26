'use client'
 
import React, { useEffect, useState } from 'react';
import styles from "./style.module.css"
import Header_comp from '../../../components/header/page'
import Link from 'next/link'



export default function Request_page() {
    const [id, setId] = useState(-1)

    useEffect(() => {

        const currentURL = window.location.href;

        console.log(currentURL);  
        var id = currentURL.split('/').slice(-1);
        console.log(id[0])
        setId(parseInt(id[0]))
      }, []);

    return (

        < >
            <div className={styles.body}>
                <Header_comp/>
                
                <h1>{id}</h1>

            </div>
        </>

)}
  