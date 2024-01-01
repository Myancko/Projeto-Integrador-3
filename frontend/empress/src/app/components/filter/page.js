import Image from 'next/image'
import styles from "./style.module.css"
import {Filter, 
        RefreshCcw, 
        XCircle, 
        Check,
        Clock,
        AlertCircle,
        X} from "lucide-react";
import Link from 'next/link'

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

                    <Link href={'/home'}><RefreshCcw className={styles.refresh}/></Link>
                    <XCircle className={styles.close} onClick={onClose} />

                </div>

            </div>

            <div className={styles.filters}>

                <Link href={'http://127.0.0.1:3000/home/filter/concluido/1'}> <Check className={styles.check}/> </Link>
                <Link className={styles.fix} href={'http://127.0.0.1:3000/home/filter/aguardo/1'}><Clock className={styles.clock}/></Link>
                <Link className={styles.fix} href={'http://127.0.0.1:3000/home/filter/nao_visto/1'}><AlertCircle className={styles.alert}/> </Link>
                <Link className={styles.fix} href={'http://127.0.0.1:3000/home/filter/cancelado/1'}><X className={styles.x}/></Link>
            
            </div>

            <div className={styles.air}>
                
            </div>

        </section>

)}
  