'use client'

import styles from "./style.module.css"
import { getCookie } from 'cookies-next';
import { setCookie, deleteCookie } from 'cookies-next';
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import axios from 'axios'

interface User {
    email: string;
    id_user: number;
    name: string;
    password: string;
    role: string;
    matricula: string;
    number: string | null;
}

export default function Form_submit_request() {
    
    const [currentUser, setCurrentUser] = useState(0)
    const [selectedFile, setSelectedFile] = useState('');
    const [motivo, setMotivo] = useState('');
    const [selectedColor, setSelectedColor] = useState();
    const [selectedDouble, setSelectedDouble] = useState();
    const [quantidade, setQuantidade] = useState(1);
    const [lastId, setLastId] = useState(null);
    
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-based
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    const router = useRouter();

    const handleRadioColorChangeTrue = (event) => {
        setSelectedColor(true);
      };
    const handleRadioColorChangeFalse = (event) => {
      setSelectedColor(false);
    };
    const handleRadioDoubleChangeTrue = (event) => {
        setSelectedDouble(true);
    };
    const handleRadioDoubleChangeFalse = (event) => {
        setSelectedDouble(false);
    };

    useEffect(() => {
        

        async function getUser() {
            const coockie = getCookie('access');
            console.log(coockie)

            const config = {
                headers: { Authorization: `Bearer ${coockie}` }
            };

            try {
                const user = await axios.get<User>("http://127.0.0.1:8000/account/me",
                config
                )
                setCurrentUser(user.data)
            } catch (error)
            {
                console.error('Error:', error.response.status, error.response.statusText);
            }
            
            console.log(currentUser)
        } 
        getUser()
        }, []); 

        const handleFileChange = (event) => {
            const file = event.target.files[0]; // Get the selected file
            if (file) {
                setSelectedFile(file); // Set the selected file name
                // Additional logic or state management with the file if needed
            }
        };

        const handleSubmit = async (e: SyntheticEvent) => {
            console.log('handleSubmit is being called');
            e.preventDefault();
            
            try {
              await addRequest();
            } catch (error) {
              console.error(error);
            }
          };
        
        const get_request_id = async () => 
        {

        }
        

        const addRequest = async () => {


            try {

                const response_id = await axios.get('http://127.0.0.1:8000/request/get/last_id');
                console.log(response_id.data.last_id, '<<<<');


                
                const requestData = {
                    id_request: response_id.data.last_id + 1,
                    owner: currentUser.id_user,
                    color: selectedColor,
                    two_sided: selectedDouble,
                    quantity: quantidade,
                    reason: motivo,
                    status: 'pending',
                    data: selectedFile.name, 
                    date: formattedDate, 
                  };

                console.log(requestData)

              
                const formData = new FormData();
                formData.append('req', JSON.stringify(requestData));
                formData.append('file', selectedFile, selectedFile.name);
              
                const response = await axios.post('http://127.0.0.1:8000/request/add', formData, {
                  params: requestData,
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  },
                });
              
                console.log('Request added:', response.data);
                await router.push("/home");
            } catch (error) {
              console.error('Error adding request:', error);
            }
          };
          

        useEffect(() => {
            console.log(selectedColor);
          }, [selectedColor]);
          
        useEffect(() => {
            console.log(selectedDouble);
          }, [selectedDouble]);

        useEffect(() => {
            console.log(motivo);
            console.log(quantidade);
          }, [motivo]);
        useEffect(() => {
            console.log(quantidade);
          }, [quantidade]);

    return (

        <form action="" onSubmit={handleSubmit}>
            <div className={styles.label_file}>
                
                <label htmlFor="request">{selectedFile ? selectedFile.name : 'Selecione um arquivo para imprimir'}</label>
                <input 
                    type="file" 
                    name="request" 
                    id="request" 
                    className={styles.input_file} 
                    onChange={handleFileChange}/>
            </div >
            <div className={styles.motivo_div}>
                <p>Motivo:</p>
                <textarea className={styles.motivo} name="motivo" id="motivo" cols="30" rows="10" onChange={e => setMotivo(e.target.value)}></textarea>
            </div>
            <div className={styles.underhalf}>
                <div className={styles.qnt_pg}>
                    <p>Quantidade de copias:</p>
                    <input defaultValue={1} type="number" name="qnt" id="" onChange={e => setQuantidade(e.target.value)} />
                </div>
                <div className={styles.cor}>
                    <div>
                        <p>Cor:</p>
                    </div>
                    <div className={styles.select}>
                        
                        <div>
                            <input type="radio" name="cor" id="sim"  onChange={handleRadioColorChangeTrue} />
                            <label for="sim">Colorido</label>
                        </div>
                    
                        <div>
                            <input type="radio" name="cor" id="nao" onChange={handleRadioColorChangeFalse}/>
                            <label for="nao">Preto e Branco</label>
                        </div>
                    </div>
                </div>
                <div  className={styles.fv}>
                    <div>
                        <p>Impressão:</p>
                    </div>
                    <div className={styles.select}>
                        
                        <div>
                            <input type="radio" name="frente-verso" id="fv" onChange={handleRadioDoubleChangeTrue} />
                            <label for="fv">Frente e Verso</label>
                        </div>
                    
                        <div>
                            <input type="radio" name="frente-verso" id="f" onChange={handleRadioDoubleChangeFalse}/>
                            <label for="f">Apenas Frente</label>
                        </div>
                    </div>
            
                </div>
                
            </div>
            <div className={styles.submit}>
                <button className={styles.but_sub} type="submit">Enviar</button>
            </div>
            
        </form>
)}
  