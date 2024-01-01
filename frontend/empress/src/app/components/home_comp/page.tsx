'use client'

import styles from "./style.module.css"
import Nav_comp from "../nav_pagination/page"
import Requisicao_comp from "../requisicao/page";
import { getCookie } from 'cookies-next';
import React, { useState, useEffect } from 'react';
import axios from 'axios'


export default function Home_list( ) {

    const [currentUser, setCurrentUser] = useState()
    const [Content, setContent] = useState()
    const [isLoading, setIsLoading] = useState(true);

    let [numPages, setNumPages] = useState(1)
    let [currentPage, setCurrentPage] = useState();
    const [pageContent, setPageContent] = useState([]);

    let [filter, setFilter] = useState('');
    let [filterStatus, setFilterStatus] = useState();

    useEffect(() => {

        const currentURL = window.location.href;

        console.log(currentURL);  
        var id = currentURL.split('/').slice(-1);
        var filter = currentURL.split('/').slice(-2);
        console.log(id[0], filter[0], 'aguardo')

        setCurrentPage(parseInt(id[0]))
        
        if (filter[0] == 'aguardo')
        {
            setFilter(filter[0])
            setFilterStatus(true)
        }
        else if (filter[0] == 'concluido')
        {
            setFilter(filter[0])
            setFilterStatus(true)
        }
        else if (filter[0] == 'nao_visto')
        {
            setFilter(filter[0])
            setFilterStatus(true)
        }
        else if (filter[0] == 'cancelado')
        {
            setFilter(filter[0])
            setFilterStatus(true)
        }

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
                console.log(user.data, '<<<<>')
                
            } catch (error)
            {
                console.error('Error:', error);
            }
            
        } 

        getUser()
        }, []); 
    
    useEffect(() => {
        

        async function getContent() {
            
            console.log(currentUser, '<<<<<')

            const data = {
                'owner_id' : currentUser.id_user
            }

            try {
                let response;
          
                if (currentUser.role === 'admin') {
                  response = await axios.get("http://127.0.0.1:8000/request/list");
                } else {
                  response = await axios.get("http://127.0.0.1:8000/request/list/users_request", {
                    params: {
                      owner_id: currentUser.id_user
                    }
                  });
                }
          
                setContent(response.data);
                console.log(response);
              } catch (error) {
                console.error('Error:', error);
              }

        }
        
        if (currentUser)
        {
            getContent();
        }
        else
        {
            console.log('user ainda n chego')
        }
        
        }, [currentUser]); 

    useEffect(() => {

        async function listContent() {
            
            console.log(Content, '<<<<<')

            if (filterStatus == true)
            {
                var filtered_content = []
                
                if (filter == 'aguardo')
                {

                    for (var x = 0; x < Content.length; x++)
                    {
                        if (Content[x].status == 'waiting')
                        {
                            filtered_content.push(Content[x])
                        }
                    } 

                }
                else if (filter == 'concluido')
                {
                    for (var x = 0; x < Content.length; x++)
                    {
                        if (Content[x].status == 'ok')
                        {
                            filtered_content.push(Content[x])
                        }
                    } 

                }
                else if (filter == 'nao_visto')
                {
                    for (var x = 0; x < Content.length; x++)
                    {
                        if (Content[x].status == 'pending')
                        {
                            filtered_content.push(Content[x])
                        }
                    } 

                }
                else if (filter == 'cancelado')
                {
                    for (var x = 0; x < Content.length; x++)
                    {
                        if (Content[x].status == 'closed')
                        {
                            filtered_content.push(Content[x])
                        }
                    } 

                }
                  
            }
            else{filtered_content = Content}
            
            const pageSize = 9;
            const totalItems = filtered_content.length;
            const calculatedNumPages = Math.ceil(totalItems / pageSize);
                
            setNumPages(calculatedNumPages);


            var page_content_index_start = (currentPage-1) * 9
            var page_content_index_end = currentPage * 9 

            page_content_index_end = Math.min(page_content_index_end, filtered_content.length);
            
            setPageContent(filtered_content.slice(page_content_index_start, page_content_index_end))

            setIsLoading(false);

            console.log(numPages, page_content_index_start , page_content_index_end,  pageContent, '><>><><>>')

        }

        if (Content)
        {
            listContent()
        }
    
        }, [Content]); 

    return (

        <>
            <div className={styles.body}>
                <Nav_comp numPage={numPages}/>
                
                <div className={styles.list_request}>

                    {isLoading ? (
                        <div>Loading...</div>
                    ) : (
                        pageContent ? (
                            pageContent.map((cont) => (

                                <div>

                                    <Requisicao_comp user={currentUser} content={cont}/>

                                </div>
                                

                            ))
                            
                        ) : (
                            <p>No content available</p>
                        )
                    )}

                </div>
            </div>
        </>

)}
  