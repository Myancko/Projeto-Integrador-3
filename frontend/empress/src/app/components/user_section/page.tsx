'use client'

import { getCookie } from 'cookies-next';
import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import styles from "./style.module.css"
import { Bell } from "lucide-react";
import Link from 'next/link'
import axios from 'axios'
import user_icon from "../../../../assets/images/user_icon.png"

interface User {
    email: string;
    id_user: number;
    name: string;
    password: string;
    role: string;
    matricula: string;
    number: string | null; // Assuming "number" can be null based on "None" in the JSON
}


export default function User_header_section() {

    const [currentUser, setCurrentUser] = useState()

    useEffect(() => {
        

        async function getUser() {
            const coockie = getCookie('access');
            console.log(coockie)

            const config = {
                headers: { Authorization: `Bearer ${coockie}` }
            };

            try {
                const user = await axios.get<User>("http://127.0.0.1:8001/account/me",
                config
                )
                setCurrentUser(user.data)
            } catch (error)
            {
                console.error('Error:', error.response.status, error.response.statusText);
            }
            
            console.log(currentUser)
        } 
        getUser()
        }, []); 
    return (

        <section className={styles.user}>
            <Bell size={25} color={"white"} />

            <Link className={styles.user_fix}  href={"/user"}>
                <Image src={user_icon} className={styles.user_photo} width={30} height={30}/>
                <p>{currentUser ? currentUser.name.split(' ')[0]  : 'Loading...'}</p>
            </Link>
            
        </section>     

)}
  