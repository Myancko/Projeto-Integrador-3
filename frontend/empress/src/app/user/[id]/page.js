'use client'

import styles from "./style.module.css"
import React, { useEffect, useState } from 'react';

import Link from 'next/link'
import Header_comp from "../../components/header/page";

import { useRouter } from "next/navigation";

import User_content_view from '../../components/user_content_view/page'
import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import {LogOut} from "lucide-react";

export default function Login() {


    let [id, setId] = useState();

    useEffect(() => {

        const currentURL = window.location.href;

        console.log(currentURL);  
        var id = currentURL.split('/').slice(-1);
        var filter = currentURL.split('/').slice(-2);

        setId(parseInt(id[0]))
    }, []);

    const router = useRouter();

    const Delete_token = () =>{
        setCookie('access', '')
        router.push("http://127.0.0.1:3000/login");
    }

    return (

        <main className={styles.main}>


                <Header_comp/>
                <main className={styles.main}>

                { id ? (
                    <>
                        <User_content_view user = {id}/>
                    </>
                ) : null}

                

                </main>

                <div className={styles.fix_aling_center}>

                    <section className={styles.create}>
                        <button  onClick={Delete_token}>Sair <LogOut /> </button>
                    </section>
                </div>
                

        </main>

)}
  