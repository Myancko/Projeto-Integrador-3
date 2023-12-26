import Image from 'next/image'
import styles from "./style.module.css"
import { Check } from "lucide-react";

export default async function status_concluido() {
    return (

        <section className={styles.sec}>
            
            <Check size={30} />
            <span>Concluido</span>

        </section>
        
)}
  