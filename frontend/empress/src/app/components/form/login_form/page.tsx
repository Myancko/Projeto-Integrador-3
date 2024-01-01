"use client"

import Image from 'next/image'
import styles from "./style.module.css"
import React, { useState, useContext, SyntheticEvent } from "react";
import { setCookie, deleteCookie } from 'cookies-next';
import { useRouter } from "next/navigation";
import Link from 'next/link'

export default function Login_form() {

    const [matricula, setMatricula] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    
    const authenticate_user = async ( ) => {
        const loginUrl = "http://127.0.0.1:8001/account/token";
    
        const formData = new URLSearchParams();
        formData.append('username', matricula);
        formData.append('password', password);
        
        try {
          const response = await fetch(loginUrl, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: formData.toString(), 
          });
    
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const coockie = await response.json()
          const coockie_access = coockie.access_token
          console.log(coockie_access)

          deleteCookie('access', { path: 'http://127.0.0.1:8000/account/token', domain: 'http://127.0.0.1:8000' });
          setCookie('access', coockie_access) 

          await router.push("/home");
    
        } catch (error) {
          console.error(error);
        }
      };

    const handleSubmit = async (e: SyntheticEvent) => {
        console.log('handleSubmit is being called');
        e.preventDefault();
        
        try {
          await authenticate_user();
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
                            placeholder=""
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
  