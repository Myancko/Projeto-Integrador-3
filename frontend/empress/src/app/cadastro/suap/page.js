import Image from 'next/image'
import styles from "./style.module.css"
import backgroun_img from '../../../../assets/images/printer_background.png'
import React from "react";
import Suap_cadastro_form from "../../components/form/suap_cadastro/page"


export default async function Login() {

    return (

        <main className={styles.main}>

            <div className={styles.background}>
                <Image  src={backgroun_img} layout='fill' quality={100} objectFit='cover'/>
            </div>

            <Suap_cadastro_form/>

        </main>

)}
  