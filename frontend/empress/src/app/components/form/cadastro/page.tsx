'use client'

import Image from 'next/image'
import styles from "./style.module.css"
import suap_logo from '../../../../../assets/images/image.jpeg'
import React, { useState, useContext, SyntheticEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link'
import axios from 'axios'

export default function Cadastro_form() {

    const [nome, setNome] = useState("");
    const [matricula, setMatricula] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [senha, setPassword] = useState("");
    const [loop, setLoop] = useState(false);
    const router = useRouter();

    
    const submit_request = async ( ) => {


        const requestBody = {
            "id_user": Math.floor(Math.random() * 90000),
            "name": nome,
            "matricula": matricula,
            "email": email,
            "password": senha,
            "number": phone,
            "role": "123213"
          };

        try {
            const response = await axios.post("http://127.0.0.1:8000/account/add", requestBody )
            await router.push("/login");
            
        } catch (error)
        {
            console.error('Error: >>>', error);

            if(error.response.status == 500)
            {
                console.log('dsads')
                if(loop == false){
                    setLoop(true)
                    submit_request()
                }
                
            }
    
        }
        
    }


    const handleSubmit = async (e: SyntheticEvent) => {
        console.log('handleSubmit is being called');
        e.preventDefault();
        
        try {
          await submit_request();
        } catch (error) {
          console.error(error);
        }
      };

    return (
        
  
        <form className={styles.form_login} onSubmit={handleSubmit}> 

            <h1 className={styles.title}>Empress</h1>
            
            <div>
                <label className={styles.form_label} for="nome">Nome</label>
                <input className={styles.form_input} type="text" id="nome" name="nome" placeholder="" onChange={(e) => setNome(e.target.value)}/>
                <label className={styles.form_label} for="matricula">Matricula</label>
                <input className={styles.form_input} type="text" id="matricula" name="matricula" placeholder="" onChange={(e) => setMatricula(e.target.value)}/>
                <label className={styles.form_label} for="email">E-mail</label>
                <input className={styles.form_input} type="email" id="email" name="email" placeholder="" onChange={(e) => setEmail(e.target.value)}/>
                <label  className={styles.form_label} for="phone">Telefone</label>

                <input  className={styles.form_input} 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    /* pattern="^\(\d{2,3}\) \d{5} \d{4}$" 
                    placeholder="(00) 00000 0000"  */
                    onChange={(e) => setPhone(e.target.value)}
                />

                <label  className={styles.form_label} for="senha">Senha</label>
                <input  className={styles.form_input} type="password" id="senha" name="senha" placeholder="" onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <a href="">
                <Image className={styles.suap} src={suap_logo} width={110} height={60} quality={100}/>
            </a>
            <div className={styles.submit}>
               <Link href="/login">Voltar</Link>
                <button type="submit">Criar Conta</button>
            </div>
        </form>

)}
  