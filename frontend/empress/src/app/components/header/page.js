"use client"

import { getCookie } from 'cookies-next';
import { setCookie, deleteCookie } from 'cookies-next';
import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import styles from "./style.module.css"
import { Bell } from "lucide-react";
import Link from 'next/link'
import axios from 'axios'
import User_header_section from '../user_section/page'

export default function Header_comp() {

    return (

        <header className={styles.header_main}>
            <nav  className={styles.header}>

                <h1>Empress</h1>

                <ul className={styles.main_nav}>
                    <li> <Link href="/home/1">Home</Link> </li>
                </ul>
                
                <User_header_section/>

            </nav>
        </header>
        

)}
  