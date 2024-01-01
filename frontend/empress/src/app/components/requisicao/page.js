'use client'

import Image from 'next/image'
import styles from "./style.module.css"
import Status_aguardo from '../status/aguardando_r/page';
import Status_concluido from '../status/concluido/page';
import Status_nao_visto from '../status/nao_visto/page';
import Status_negado from '../status/negado/page';
import Link from 'next/link'
import noImage from '../../../../assets/images/No-Image-Placeholder.png'
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { CalendarClock,  Layers3} from "lucide-react";
import Prioridade from '../prioridade/page';

export default function Requisicao_comp( props ) {

    let prioridade = 'Baixa';
    let link =  "/home/request/" + props.content.id_request
    let data = new Date(props.content.date);

    let month = ("0" + (data.getMonth() + 1)).slice(-2); // Adding 1 to get the correct month (months are zero-based)
    let day = ("0" + data.getDate()).slice(-2);

    const [hasImage, setImage] = useState(false)
    const [t, setT] = useState()
    const [owner, setOwner] = useState()

    /* console.log(day, month, data.getFullYear(), '<<<<') */

    async function getImage() {

        try {
            
            const response = await axios.get("http://127.0.0.1:8000/request/file/img/"+props.content.id_request);
            console.log(response, props.content.id_request, '<<<<<< img')

            setImage(true)
            
        } catch (error)
        {
            console.error('Error: get img', error, '<<<<< erro img');
        }

        }
    

    let which;

    getImage()  

    if ( props.content.status == "pending")
    {
        which = <Status_nao_visto />;
    }
    else if (props.content.status == "waiting"){
        which = <Status_aguardo />;
    }
    else if (props.content.status == "ok"){
        which = <Status_concluido />;
    }
    else if (props.content.status == "closed"){
        which = <Status_negado />;
    }
    else{ which = <Status_nao_visto /> }

    useEffect(() => {

        async function getOwner() {

            try{
                const response = await axios.get("http://127.0.0.1:8001/account/get/"+props.content.owner);
            setOwner(response.data)
            }
            catch (error)
        {
            console.error('Error: user', error);
        }

        }

    getOwner()
    }, []);

    return (

        owner ? (
        
            <Link href={"/home/request/" + props.content.id_request}>
                <section className={styles.sec}>
            
                    {/* <Image className={styles.img} /> */}
                    { hasImage ? <Image src={"http://127.0.0.1:8000/request/file/img/"+props.content.id_request} className={styles.img} width={200} height={200}/> : <Image src={noImage} className={styles.img} width={200} height={200}/> }
            
                    <div className={styles.data}>
            
                        <Prioridade status={prioridade} />
            
                        <div className={styles.user_info}>
            
                            <div className={styles.nome_mat}>
            
                                <h3>{owner.name.split(' ')[0] } {owner.name.split(' ')[1] } </h3>
                                <h3>{owner.matricula ? owner.matricula : owner.email}</h3>
            
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
        ) : (null)
)}
  