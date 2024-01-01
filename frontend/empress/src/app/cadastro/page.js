import '../globals.css'
import Image from 'next/image'
import styles from "./style.module.css"
import backgroun_img from '../../../assets/images/printer_background.png'
import React from "react";
import Cadastro_form from '../components/form/cadastro/page';


export default async function Login() {

    return (

        <main className={styles.main}>

            <div className={styles.background}>
                <Image  src={backgroun_img} layout='fill' quality={100} objectFit='cover'/>
            </div>

            <Cadastro_form/>

        </main>

)}
  