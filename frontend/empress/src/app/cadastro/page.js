import '../globals.css'
import Image from 'next/image'
import styles from "./style.module.css"
import suap_logo from '../../../assets/images/image.jpeg'
import backgroun_img from '../../../assets/images/printer_background.png'
import Cadastro_form from '../components/form/cadastro/page'
import Link from 'next/link'

export default async function Cadastro() {
    return (
        
        <main className={styles.main}>

            <div className={styles.background}>
                <Image  src={backgroun_img} layout='fill' quality={100} objectFit='cover'/>
            </div>

            <div className={styles.flex_login}>

                <Cadastro_form/>

            </div>

        </main>

)}
  