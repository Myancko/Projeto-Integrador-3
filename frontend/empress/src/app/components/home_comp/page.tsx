'use client'

import styles from "./style.module.css"
import Nav_comp from "../nav_pagination/page"
import Requisicao_comp from "../requisicao/page";
import { getCookie } from 'cookies-next';
import React, { useState, useEffect } from 'react';
import axios from 'axios'


export default function Home_list() {

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
                const user = await axios.get("http://127.0.0.1:8000/account/me",
                config
                )
                setCurrentUser(user.data)
                console.log(user.data, '<<<<>')
                
            } catch (error)
            {
                console.error('Error:', error);
            }
            
        } 

        getUser()
        }, []); 
    
    useEffect(() => {
        

        async function getContent() {
            
            console.log(currentUser, '<<<<<')

            const data = {
                'owner_id' : currentUser.id_user
            }

            try {
                
                const response = await axios.get("http://127.0.0.1:8000/request/list/users_request", {
                    params: {
                        owner_id: currentUser.id_user
                    }
                
            });
                setContent(response.data)
                
                console.log(response)
            } catch (error)
            {
                console.error('Error:', error);
            }

        }
        
        if (currentUser)
        {
            getContent();
            setIsLoading(false);
        }
        else
        {
            console.log('user ainda n chego')
        }
        
        }, [currentUser]); 

    return (

        <>
            <div className={styles.body}>
                <Nav_comp />
                
                <div className={styles.list_request}>

                    {isLoading ? (
                        <div>Loading...</div>
                    ) : (
                        Content ? (
                            Content.map((cont) => (

                                <Requisicao_comp user={currentUser} content={cont}/>

                            ))
                            
                        ) : (
                            <p>No content available</p>
                        )
                    )}

                </div>
            </div>
        </>

)}
  