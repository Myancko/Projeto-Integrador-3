import '../globals.css'
import styles from "./style.module.css"
import Header_comp from '../components/header/page'
import Form_submit_request from '../components/form/request/page'
export default async function Home() {

    return (

        < >
            <div className={styles.body}>
                <Header_comp/>

                <main className={styles.main}>

                    <Form_submit_request/>
                    

                </main>
                
            </div>
        </>

)}
  