'use client'

import Image from 'next/image'
import styles from "./style.module.css"
import { Clock } from "lucide-react";

export default function Prioridade({status}) {

    let statusText = '';

    if (status === 'Baixa') {

        statusText = 'Baixa Prioridade';
        
    } 
    else if (status === 'Alta') {
        statusText = 'Alta Prioridade';
    } 

    return (

        <>
            {statusText === 'Baixa Prioridade' ? (
                <section className={styles.baixa_pri}>
                    <span>Baixa Prioridade</span>
                </section>
                
            ) : statusText === 'Alta Prioridade' ? (
                <section className={styles.sec}>
                    <span>Alta Prioridade</span>
                </section>

            ): null}
        </>
    );
}
  