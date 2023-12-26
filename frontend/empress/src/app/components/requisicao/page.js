'use client'

import Image from 'next/image'
import styles from "./style.module.css"
import Status_aguardo from '../status/aguardando_r/page';
import status_concluido from '../status/concluido/page';
import Status_nao_visto from '../status/nao_visto/page';
import status_negado from '../status/negado/page';
import Link from 'next/link'

import { CalendarClock,  Layers3} from "lucide-react";
import Prioridade from '../prioridade/page';

export default function Requisicao_comp( props ) {

    let prioridade = 'Baixa';
    let link =  "home/request/" + props.content.id_request
    let data = new Date(props.content.date);

    let month = ("0" + (data.getMonth() + 1)).slice(-2); // Adding 1 to get the correct month (months are zero-based)
    let day = ("0" + data.getDate()).slice(-2);

    console.log(day, month, data.getFullYear(), '<<<<')

    let which;

    if ( props.content.status == "pending")
    {
        which = <Status_nao_visto />;
    }
    else{ which = <Status_nao_visto /> }

    return (
        <Link href={link}>
            <section className={styles.sec}>

                {/* <Image className={styles.img} /> */}
                <img className={styles.img} src="" alt="" />
                <div className={styles.data}>

                    <Prioridade status={prioridade} />

                    <div className={styles.user_info}>

                        <div className={styles.nome_mat}>

                            <h3>{props.user.name}</h3>
                            <h3>{props.user.matricula ? props.user.matricula : props.user.email}</h3>

                        </div>

                        <p>{props.content.reason}</p>

                        <div className={styles.under_half}>

                            <div className={styles.date_page}>

                                <div className={styles.date}>
                                    <CalendarClock />
                                    <span>{day}/{month}</span>
                                </div>

                                <div className={styles.pages}>
                                    <Layers3 />
                                    <span>{props.content.quantity}</span>
                                </div>

                            </div>

                            <div className={styles.status}>

                                {which}
                            </div>
                        </div>

                    </div>

                </div>


            </section>
        </Link>
        
)}
  