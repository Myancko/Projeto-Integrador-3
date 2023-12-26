import '../globals.css'
import styles from "./style.module.css"
import Header_comp from '../components/header/page'
import Nav_comp from '../components/nav_pagination/page'
import Link from 'next/link'
import Requisicao_comp from '../components/home_comp/page'

export default async function Home() {

    return (

        < >
            <div className={styles.body}>
                <Header_comp/>
                <main className={styles.main}>

                <Requisicao_comp/>
                    
                </main>
                <section>
                    <Link href="/create_request">
                        <button>
                            Criar Requisição
                        </button>
                    </Link>
                </section>
                
                
            </div>
        </>

)}
  