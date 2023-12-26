import Image from 'next/image'
import styles from "./style.module.css"
import {Filter, 
        RefreshCcw, 
        XCircle, 
        Check,
        Clock,
        AlertCircle,
        X} from "lucide-react";

export default function Filter_modal({ isOpen, onClose }) {
    if (!isOpen) return null;
    return (

        <section className={styles.main_filter}>

            <div className={styles.upper}>

                <div  className={styles.first_half}>

                    <Filter/>
                    <span>Filtro</span>

                </div>

                <div className={styles.second_half}>

                    <RefreshCcw className={styles.refresh}/>
                    <XCircle className={styles.close} onClick={onClose} />

                </div>

            </div>

            <div className={styles.filters}>

                <Check className={styles.check}/>
                <Clock className={styles.clock}/>
                <AlertCircle className={styles.alert}/>
                <X className={styles.x}/>
            
            </div>

            <div className={styles.air}>
                
            </div>

        </section>

)}
  