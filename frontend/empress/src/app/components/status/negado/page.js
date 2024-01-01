import Image from 'next/image'
import styles from "./style.module.css"
import { X } from "lucide-react";

export default function Status_negado() {
    return (

        <section className={styles.sec}>
            
            <X size={30} />
            <span>Cancelado</span>

        </section>
        
)}
  