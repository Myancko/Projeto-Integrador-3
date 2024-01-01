"use client"

import Image from 'next/image'
import styles from "./style.module.css"
import place_holder from "../../../../../assets/images/user_icon.png"
import suap_logo from "../../../../../assets/images/logo do suap.jpeg"
import React, { useState, useContext, SyntheticEvent } from "react";
import { setCookie, deleteCookie } from 'cookies-next';
import { useRouter } from "next/navigation";
import Link from 'next/link'
import axios from 'axios'


export default function Login_form() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);

    const router = useRouter();

    
    const create_user = async ( ) => {

        let num = ''

        if (phone == null){

           num = '1234'

        }
        else{
          num = phone
        }

        const userData = {
          id_user: 0,
          name: name,
          matricula: "",
          email: email,
          password: password,
          number: num,
          role: "anon"
        };
        
        
        try {
          const response = await axios.post('http://127.0.0.1:8001/account/add', userData)
          router.push("/login");


    
        } catch (error) {
          console.error(error, '<<< error cadastro');
        }
      };

    const switchImage = (e) => {
      const file = e.target.files[0];
      setSelectedImage(file)
    };


    const handleSubmit = async (e: SyntheticEvent) => {
        console.log('handleSubmit is being called');
        e.preventDefault();
        
        try {
          await create_user();
        } catch (error) {
          console.error(error);
        }
      };

    return (

        <main className={styles.main}>


            <div className={styles.flex_login}>

                <form className={styles.form_login} onSubmit={handleSubmit}> 

                    <h1 className={styles.title}>Empress</h1>

                    <div className={styles.main_form}>
                      <div className={styles.img_user}>
                          <label htmlFor="user_photo" className={styles.label}>

                            { selectedImage ? (

                              <>
                                <Image
                                  src={URL.createObjectURL(selectedImage)}
                                  alt="plus"
                                  width={75}
                                  height={75}
                                />
                              </>

                              ) : (
                              
                              <>
                                <Image
                                  src={place_holder}
                                  alt="plus"
                                  width={75}
                                  height={75}
                                />
                              </>
                            )}
                          </label>
                        </div>
                        <input type="file" hidden onChange={switchImage} name="user_photo" id="user_photo" />

                        <label className={styles.form_label}>Nome</label>
                        <input 
                            className={styles.form_input} 
                            onChange={(e) => setName(e.target.value)}
                            type="text" 
                            id="name" 
                            name="name" 
                            placeholder=""
                            />
                        
                        <label className={styles.form_label}>E-mail</label>
                        <input 
                            className={styles.form_input} 
                            onChange={(e) => setEmail(e.target.value)}
                            type="text" 
                            id="email" 
                            name="email" 
                            placeholder=""
                            />

                        <label className={styles.form_label}>Telefone</label>
                        <input 
                            className={styles.form_input} 
                            onChange={(e) => setPhone(e.target.value)}
                            type="text" 
                            id="phone" 
                            name="phone" 
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
                      
                    <Link href={"http://127.0.0.1:3000/cadastro/suap"}>

                      <Image src={suap_logo} width={100} height={50} />

                    </Link>
                    
                  
                    <div className={styles.submit}>

                        <Link href="/login">Voltar</Link>
                        <button type="submit">Entrar</button>

                    </div>

                </form>

            </div>

        </main>

)}
  