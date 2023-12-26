'use client'

import Image from 'next/image'
import styles from "./style.module.css"
import { Clock } from "lucide-react";

export default function Status_aguardo() {
    return (

        <section className={styles.sec}>
            
            <Clock width={50}/>
            <span>Aguardando Retirada</span>

        </section>
        
)}
  