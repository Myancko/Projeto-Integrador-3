'use client'

import Image from 'next/image'
import styles from "./style.module.css"
import backgroun_img from '../../../assets/images/printer_background.png'
import React from "react";
import Login_form from '../components/form/login_form/page';
import Link from 'next/link'
import { useRouter } from "next/navigation";

import { getCookie, setCookie, deleteCookie } from 'cookies-next';


export default function Login() {

    const router = useRouter();

    const Delete_token = () =>{
        setCookie('access', '')
        router.push("http://127.0.0.1:3000/login");
    }

    return (

        <main className={styles.main}>

            <button  onClick={Delete_token}>sair</button>

        </main>

)}
  