'use client'
 
import React, { useEffect, useState } from 'react';
import styles from "./style.module.css"
import { getCookie } from 'cookies-next';
import Header_comp from '../../../components/header/page'
import Link from 'next/link'
import axios from 'axios'
import user_icon  from '../../../../../assets/images/user_icon.png'
import noImage from '../../../../../assets/images/No-Image-Placeholder.png'
import Image from 'next/image'
import { useRouter } from "next/navigation";


export default function Request_page() {
    const [id, setId] = useState(-1)
    const [currentUser, setCurrentUser] = useState()
    const [Content, setContent] = useState()
    const [ownerUser, setOwnerUser] = useState()
    const [isLoading, setIsLoading] = useState(true);
    const [hasImage, setImage] = useState(false)
    const [isAdmin, setAdmin] = useState(false)
    const router = useRouter();

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
                const user = await axios.get("http://127.0.0.1:8001/account/me",
                config
                )
                setCurrentUser(user.data)

                if (user.data.role == 'admin')
                {
                    setAdmin(true)
                }

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
                const user = await axios.get("http://127.0.0.1:8001/account/get/"+Content.owner)
                setOwnerUser(user.data)
            } catch (error)
            {
                console.error('Error:', error);
            }

            console.log(currentUser)
            } 


        async function getImage() {

            const data = {
                'id' : id
            } 

            try {
                
                const response = await axios.get("http://127.0.0.1:8000/request/file/img/"+Content.id_request);
                console.log(response, '<<<<<< img')
                setImage(true)
                
                
            } catch (error)
            {
                console.error('Error: get img', error, '<<<<< erro img');
            }
    
            }
            
        
        if (Content)
        {
            getOwner()
            getImage()
        }
    }, [Content]); 


    useEffect(() => {

        console.log(Content,  
                    ownerUser, 
                    currentUser, '><><><>')

        if (ownerUser){setIsLoading(false);}

    },[ownerUser]);

    async function handlePatchWaiting ()
    {
        try {

            const patch_data = {
                "id_request": Content.id_request,
                "owner": Content.owner,
                "data": Content.data,
                "color": Content.color,
                "reason": Content.reason,
                "two_sided": Content.two_sided,
                "quantity": Content.quantity,
                "status": "waiting",
                "date": Content.date
              }
                
            const response = await axios.patch("http://127.0.0.1:8000/request/update/"+Content.id_request, patch_data);
            console.log(response, '<<<<<< patch')

        } catch (error)
        {
            console.error('Error: patch', error);
        }

    }
    async function handlePatchOk ()
    {
        try {

            const patch_data = {
                "id_request": Content.id_request,
                "owner": Content.owner,
                "data": Content.data,
                "color": Content.color,
                "reason": Content.reason,
                "two_sided": Content.two_sided,
                "quantity": Content.quantity,
                "status": "ok",
                "date": Content.date
              }
                
            const response = await axios.patch("http://127.0.0.1:8000/request/update/"+Content.id_request, patch_data);
            console.log(response, '<<<<<< patch')
            await router.push("/home");
        } catch (error)
        {
            console.error('Error: patch', error);
        }

    }
    async function handlePatchClosed ()
    {
        try {

            const patch_data = {
                "id_request": Content.id_request,
                "owner": Content.owner,
                "data": Content.data,
                "color": Content.color,
                "reason": Content.reason,
                "two_sided": Content.two_sided,
                "quantity": Content.quantity,
                "status": "closed",
                "date": Content.date
              }
                
            const response = await axios.patch("http://127.0.0.1:8000/request/update/"+Content.id_request, patch_data);
            console.log(response, '<<<<<< patch')
            await router.push("/home");
        } catch (error)
        {
            console.error('Error: patch', error);
        }

    }

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

            const fileArray = Content.data.split('.');
            const fileExtension = fileArray[fileArray.length - 1];

            const fileArray_2 = Content.data.split('/');
            const fileName = fileArray_2[fileArray_2.length - 1];

            link.setAttribute('download', 'print_request_'+Content.id_request+' - '+fileName+'.'+fileExtension); // Replace with the desired file name
            document.body.appendChild(link);
            link.click();

            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);
            handlePatchWaiting()
        } catch (error) {
            console.error('Error downloading file:', Content.id_request, error);
        }
    };

    return !isLoading ? (

        < >
            <div className={styles.body}>
                <Header_comp/>
                
                
                <div className={styles.main}>

                    <section className={styles.user_content}>


                        
                        { ownerUser ? (
                            <>
                                <Link className={styles.link_user} href={'http://127.0.0.1:3000/user/'+ownerUser.id_user}>
                                    <Image src={user_icon} className={styles.user_photo} width={100} height={100}/>

                                    <p > <b>{ ownerUser.name.split(' ')[0] } {ownerUser.name.split(' ')[1]} </b></p>

                                    <div>

                                        <p>{ ownerUser.matricula ? ownerUser.matricula : ownerUser.email }</p>
                                        <p>{ ownerUser.role }</p>
                                    </div>
                                </Link>
                            </>
                        )  : (<p>owner</p>)
                        }

                    </section>

                    <div className={styles.main_content}>  
                        
                        {

                            Content ? (

                                
                                <>

  {/*                                   <p>{Content.id_request}</p> */}

                                    <section className={styles.centent_sec}>

                                    {hasImage ? <Image src={"http://127.0.0.1:8000/request/file/img/"+Content.id_request}  className={styles.user_photo} width={535} height={600}/> :  <Image src={noImage} className={styles.user_photo} width={535} height={600}/> }

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

                                        { Content.status == "ok" || Content.status == "closed" ? (
                                            null
                                        ) : (

                                            <div className={styles.buttons}>
                                            
                                                {isAdmin || currentUser.id_user == ownerUser.id_user ? (
                                                    <>
                                                        
                                                        <button className={styles.btn_close} onClick={handlePatchClosed}>Cancelar</button>
                                                
                                                        {isAdmin ? (
                                                        
                                                        <div className={styles.button_2}>
                                                        
                                                            <button className={styles.btn_download}  onClick={handleDownload}>Baixar</button>
                                                            <button className={styles.btn_ok}  onClick={handlePatchOk} >Concluir</button>
                                                        
                                                        </div>) : null }
                                                        
                                                    </>
                                                ) : null}

                                            </div>

                                        )}

                                        
                                    </section>

                                </>
                            ) : ( <p>loading</p> )

                        }
                       

                    </div>

                </div>

            </div>
        </>

): null;}
  