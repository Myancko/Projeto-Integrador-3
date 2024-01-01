import styles from "./style.module.css"
import Header_comp from "../../../../components/header/page"
import Link from 'next/link'
import Requisicao_comp from '../../../../components/home_comp/page'

export default async function Home() {

    return (

        < >
            <div className={styles.body}>
                <Header_comp/>
                <main className={styles.main}>

                <Requisicao_comp/>

                </main>

                <div className={styles.fix_aling_center}>

                    <section className={styles.create}>
                        <Link href="/create_request">
                            <button>
                                Criar Requisição
                            </button>
                        </Link>
                    </section>
                </div>
                
                
                
            </div>
        </>

)}
  