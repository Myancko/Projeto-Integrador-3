'use client'

import styles from "./style.module.css"
import { getCookie } from 'cookies-next';
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Image from 'next/image'
import no_image from '../../../../assets/images/user_icon.png'


export default function User_view( ) {

    const [currentUser, setCurrentUser] = useState()
    const [Content, setContent] = useState()
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        async function getUser() {
            const coockie = getCookie('access');
            console.log(coockie)

            const config = {
                headers: { Authorization: `Bearer ${coockie}` }
            };

            try {
                const user = await axios.get("http://127.0.0.1:8001/account/me",
                config
                )
                setCurrentUser(user.data)
                setIsLoading(false)
                console.log(user.data, '<<<<>')
                
            } catch (error)
            {
                console.error('Error:', error);
            }
            
        } 

        getUser()
        }, []); 

    
    return !isLoading ? (

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
  