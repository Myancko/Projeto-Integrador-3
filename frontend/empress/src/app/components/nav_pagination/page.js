"use client"

import Image from 'next/image'
import React, { useState } from 'react';
import styles from "./style.module.css"
import {ChevronRight,  
        ChevronLeft, 
        RefreshCcw, 
        Filter} from "lucide-react";
import Filter_modal from '../filter/page';



export default function Nav_comp() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    
    return (

        <section className={styles.sec}>
            <div className={styles.header_main} >

                <div className={styles.pagination}>
                    <a href="" className={styles.go_left}>
                        <ChevronLeft />
                        <span>Ante</span>
                    </a>

                    <div className={styles.pages}>
                        <a href="">1</a>
                        <a href="">1</a>
                        <a href="">1</a>
                        <a href="">1</a>
                    </div>

                    <a href=""  className={styles.go_right}>
                        <span>Prox</span>
                        <ChevronRight />
                    </a>
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
  