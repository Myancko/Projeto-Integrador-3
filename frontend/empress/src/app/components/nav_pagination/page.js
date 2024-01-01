"use client"

import Image from 'next/image'
import React, { useState, useEffect } from 'react';
import styles from "./style.module.css"
import {ChevronRight,  
        ChevronLeft, 
        RefreshCcw, 
        Filter} from "lucide-react";
import Link from 'next/link'
import Filter_modal from '../filter/page';



export default function Nav_comp( props ) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    let [currentPage, setCurrentPage] = useState();
    let [lastPage, setLastPage] = useState(false);
    let [firstPage, setFirstPage] = useState(false);
    let [currentUrl, setCurrentUrl] = useState();
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {

        const currentURL = window.location.href;

        console.log(currentURL);  
        var id = currentURL.split('/').slice(-1);
        let lastSlashIndex = currentURL.lastIndexOf('/');

        setCurrentUrl(currentURL.substring(0, lastSlashIndex)+'/');

        console.log(id[0], currentURL.substring(0, lastSlashIndex),'>>>>>>>>')
        setCurrentPage(parseInt(id[0]))

        console.log(props.numPage, '>>>>>>>> prop')

        if (parseInt(id[0]) === 1 && (!props.numPage || props.numPage === 1)) {
            setFirstPage(true);
            setLastPage(true);
        } else if (parseInt(id[0]) === 1) {
            setFirstPage(true);
            setLastPage(false);
        } else if (props.numPage && parseInt(id[0]) === props.numPage) {
            setLastPage(true);
            setFirstPage(false);
        } else {
            setFirstPage(false);
            setLastPage(false);
        }

        

        setIsLoading(false)
      }, [props]);
    
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    
    return isLoading ? null :(

        <section className={styles.sec}>
            <div className={styles.header_main} >

                <div className={styles.pagination}>

                    {firstPage ? (
                        <Link href="" className={styles.go_left + ' ' + styles.noclick}>
                            <ChevronLeft />
                            <span>Ante</span>
                        </Link>
                    ) : (
                        <Link href={currentUrl + (currentPage-1)} className={styles.go_left}>
                            <ChevronLeft />
                            <span>Ante</span>
                        </Link>
                    )

                    }

                    <div className={styles.pages}>

                        {props.numPage ? (
                            [...Array(props.numPage).keys()].map((pageNumber) => (
                                <>
                                    {currentPage === pageNumber+1 ? (
                                        <Link className={styles.noclick} href={currentUrl+(pageNumber+1)}>{pageNumber+1}</Link>
                                    ) : (
                                        <Link href={currentUrl+(pageNumber+1)}>{pageNumber+1}</Link>
                                    )}
                                    

                                </>
                            ))
       
                         ) : (<a href="">1</a>)
                        }
    
                    </div>
                    
                    {lastPage ? (
                        <Link href=""  className={styles.go_right + ' ' + styles.noclick}>
                            <span>Prox</span>
                            <ChevronRight />
                        </Link>
                    ) : (
                        <Link href={currentUrl + (currentPage+1)}  className={styles.go_right}>
                            <span>Prox</span>
                            <ChevronRight />
                        </Link>
                    )}

                </div>
                

                <div className={styles.filter_refresh}>

                    <a href="javascript:void(0);">
                        <RefreshCcw />
                    </a>

                    <a href="javascript:void(0);" onClick={toggleModal}>
                        <Filter  className={styles.display} />
                    </a>

                    <div className={styles.div_modal}>
                        <Filter_modal className={styles.modal}  isOpen={isModalOpen} onClose={toggleModal}  />
                    </div>

                </div>
                
            </div>
        </section>
        
)}
  