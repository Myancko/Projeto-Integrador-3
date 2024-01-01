'use client'

import styles from "./style.module.css"
import { getCookie } from 'cookies-next';
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Image from 'next/image'
import no_image from '../../../../assets/images/user_icon.png'


export default function User_content_view ( props ) {

    const [currentUser, setCurrentUser] = useState()

    useEffect(() => {
        
        async function getOwner() {

            console.log(props)

            try {
                const user = await axios.get("http://127.0.0.1:8001/account/get/"+props.user)
                setCurrentUser(user.data)
            } catch (error)
            {
                console.error('Error:', error);
            }

            console.log(currentUser)
            } 

            
        
        if (props)
        {
            getOwner()
        }
    }, [props]); 

    
    return currentUser ? (

        <>
            <div className={styles.body}>

                <div className={styles.main}>

                    <div  className={styles.padding} >
                        <Image src={no_image} width={150} height={150}/>
                    </div>

                    <div className={styles.user_inf + ' ' + styles.padding}>

                        <div className={styles.name}>
                            <p>{currentUser.name}</p>
                        </div>

                        <div>

                            <p>Email: {currentUser.email ? currentUser.email :  null}</p>
                            <p>{currentUser.matricula ? 'Matricula: '+ currentUser.matricula :  null}</p>
                            <p>função: {currentUser.role}</p>

                        </div>

                    </div>
                </div>
            </div>  
        </>

) : null}
  