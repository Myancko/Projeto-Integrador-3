'use client'
 
import React, { useEffect, useState } from 'react';
import styles from "./style.module.css"
import { getCookie } from 'cookies-next';
import Header_comp from '../../../components/header/page'
import Link from 'next/link'
import axios from 'axios'
import user_icon  from '../../../../../assets/images/user_icon.png'
import Image from 'next/image'

export default function Request_page() {
    const [id, setId] = useState(-1)
    const [currentUser, setCurrentUser] = useState()
    const [Content, setContent] = useState()
    const [ownerUser, setOwnerUser] = useState()
    const [isLoading, setIsLoading] = useState(true);
    

    useEffect(() => {

        const currentURL = window.location.href;

        console.log(currentURL);  
        var id = currentURL.split('/').slice(-1);
        console.log(id[0])
        setId(parseInt(id[0]))
      }, []);
    
    useEffect(() => {
          
        async function getUser() {
            const coockie = getCookie('access');
            console.log(coockie)
            
            const config = {
                headers: { Authorization: `Bearer ${coockie}` }
            };
            try {
                const user = await axios.get("http://127.0.0.1:8000/account/me",
                config
                )
                setCurrentUser(user.data)
            } catch (error)
            {
                console.error('Error:', error);
            }

            console.log(currentUser)
    } 
    getUser()
    }, []); 

    useEffect(() => {
        

        async function getContent() {

            const data = {
                'id' : id
            }

            try {
                
                const response = await axios.get("http://127.0.0.1:8000/request/get/"+id);
                setContent(response.data)
                
                console.log(response, '<<<<<< content')
            } catch (error)
            {
                console.error('Error:', error);
            }

        }
        
        if (currentUser)
        {
            getContent();
        }
        else
        {
            console.log('id ainda n chego')
        }
        
       
        }, [currentUser]); 

    useEffect(() => {
          
        async function getOwner() {
            const coockie = getCookie('access');
            console.log(coockie)
            /* const config = {
                headers: { Authorization: `Bearer ${coockie}` }
            }; */
            try {
                const user = await axios.get("http://127.0.0.1:8000/account/get/"+Content.owner)
                setOwnerUser(user.data)
            } catch (error)
            {
                console.error('Error:', error);
            }

            console.log(currentUser)
            } 
        
        if (Content)
        {
            getOwner()
            setIsLoading(false);
        }
    }, [Content]); 

    useEffect(() => {

        console.log(Content,  
                    ownerUser, 
                    currentUser, '><><><>')

    },[ownerUser]);

    const handleDownload = async () => {
        try {
            const response = await axios({
                url: 'http://127.0.0.1:8000/request/download/'+Content.id_request,
                method: 'GET',
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');

            console.log(response,  '<<<<<')
            link.href = url;
            link.setAttribute('download', 'print_request_'+Content.id_request); // Replace with the desired file name
            document.body.appendChild(link);
            link.click();

            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    return (

        < >
            <div className={styles.body}>
                <Header_comp/>
                
                
                <div className={styles.main}>

                    <section className={styles.user_content}>


                        
                        { ownerUser ? (
                            <>
                                <Image src={user_icon} className={styles.user_photo} width={100} height={100}/>

                                <p > <b>{ ownerUser.name.split(' ')[0] } {ownerUser.name.split(' ')[1]} </b></p>

                                <div>
                                    
                                    <p>{ ownerUser.matricula ? ownerUser.matricula : ownerUser.email }</p>
                                    <p>{ ownerUser.role }</p>
                                </div>

                            </>
                        )  : (<p>owner</p>)
                        }

                    </section>

                    <div className={styles.main_content}>  
                        
                        {

                            Content ? (
                                <>
                                    <section className={styles.centent_sec}>
                                
                                        <Image  className={styles.user_photo} width={535} height={600}/>

                                        <div className={styles.motivo}>

                                            <h2>Motivo</h2>
                                            <p>{Content.reason ? Content.reason : "Não foi inserido nem um motivo"}</p>


                                        </div>
                            
                                        <div className={styles.align}>
                                            <p>Quantidade de Paginas: </p>
                                            <p><b>{Content.quantity}</b></p>
                                        </div>

                                        <div className={styles.align}>
                                            <p>Impressão frente e verso: </p>
                                            <p>{Content.two_sided ?  <b>Sim</b> : <b>Não</b> }</p>
                                        </div>

                                        <div className={styles.align}>
                                            <p>Paginas Coloridas: </p>
                                            <p>{Content.color ?  <b>Sim</b> : <b>Não</b> }</p>
                                        </div>



                                        <div className={styles.buttons}>

                                            <button>Cancelar</button>

                                            <div className={styles.button_2}>

                                                <button onClick={handleDownload}>Baixar</button>
                                                <button>Concluir</button>

                                            </div>

                                        </div>
                                    </section>

                                </>
                            ) : ( <p>loading</p> )

                        }
                       

                    </div>

                </div>

            </div>
        </>

)}
  