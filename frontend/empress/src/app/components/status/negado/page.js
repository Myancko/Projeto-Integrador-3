import Image from 'next/image'
import styles from "./style.module.css"
import { X } from "lucide-react";

export default async function status_negado() {
    return (

        <section className={styles.sec}>
            
            <X size={30} />
            <span>Negado</span>

        </section>
        
)}
  