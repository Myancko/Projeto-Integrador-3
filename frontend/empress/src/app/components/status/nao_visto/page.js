'use client'

import Image from 'next/image'
import styles from "./style.module.css"
import { AlertCircle } from "lucide-react";

export default function Status_nao_visto() {
    return (

        <section className={styles.sec}>
            
            <AlertCircle size={30} />
            <span>Não Visto</span>

        </section>
        
)}
  