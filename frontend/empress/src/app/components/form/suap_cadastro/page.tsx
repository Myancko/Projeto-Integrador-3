"use client"

import Image from 'next/image'
import styles from "./style.module.css"
import React, { useState, useContext, SyntheticEvent } from "react";
import { setCookie, deleteCookie } from 'cookies-next';
import { useRouter } from "next/navigation";
import Link from 'next/link'
import axios from 'axios'

export default function Suap_cadastro_form() {

    const [matricula, setMatricula] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    
    const create_user_suap = async ( ) => {

      const userData = {

        matricula: matricula,
        password: password

      };
      
      
      try {
        const response = await axios.post('http://127.0.0.1:8001/account/suap/add', userData)
        router.push("/login");


  
      } catch (error) {
        console.error(error, '<<< error cadastro');
      }
    };

    const handleSubmit = async (e: SyntheticEvent) => {
        console.log('handleSubmit is being called');
        e.preventDefault();
        
        try {
          await create_user_suap();
        } catch (error) {
          console.error(error);
        }
      };

    return (

        <main className={styles.main}>


            <div className={styles.flex_login}>

                <form className={styles.form_login} onSubmit={handleSubmit}> 

                    <h1 className={styles.title}>Empress</h1>

                    <div>
                        <label className={styles.form_label}>Matricula</label>
                        <input 
                            className={styles.form_input} 
                            onChange={(e) => setMatricula(e.target.value)}
                            type="text" 
                            id="matricula" 
                            name="matricula" 
                            placeholder=""
                            />
                        <label className={styles.form_label}>Senha</label>
                        <input 
                            className={styles.form_input} 
                            onChange={(e) => setPassword(e.target.value)}
                            type="password" 
                            id="senha" 
                            name="senha" 
                            placeholder="senha do SUAP*"
                            />
                    </div>
                    
                  
                    <div className={styles.submit}>

                        <Link href="/cadastro">Criar Conta</Link>
                        <button type="submit">Entrar</button>

                    </div>

                </form>

            </div>

        </main>

)}
  