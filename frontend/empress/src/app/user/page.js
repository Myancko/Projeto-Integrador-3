'use client'

import styles from "./style.module.css"
import React from "react";

import Link from 'next/link'
import Header_comp from "../components/header/page";

import { useRouter } from "next/navigation";
import User_view from "../components/user_view/page";
import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import {LogOut} from "lucide-react";

export default function Login() {

    const router = useRouter();

    const Delete_token = () =>{
        setCookie('access', '')
        router.push("http://127.0.0.1:3000/login");
    }

    return (

        <main className={styles.main}>


                <Header_comp/>
                <main className={styles.main}>

                <User_view/>

                </main>

                <div className={styles.fix_aling_center}>

                    <section className={styles.create}>
                        <button  onClick={Delete_token}>Sair <LogOut /> </button>
                    </section>
                </div>
                

        </main>

)}
  