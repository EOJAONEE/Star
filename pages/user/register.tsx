import styles from "@/styles/register.module.css"
import Link from "next/link"

export default function loginPage() {
    return (
       <main className={`flex min-h-screen`}>
         <form className={styles.formulario} >
            <div className={styles.logo}>
            </div>

            <div className={styles.container}>
                <div>
                    <h1 className={styles.h1}>Crie sua conta</h1>
                    
                    <h2 className={styles.h2}>Digite seu E-mail,senha e nome de usuario</h2>

                    <br />

                    <input className={styles.input} type="text" placeholder="Digite seu E-mail" />

                    <br />
                    <br />

                    <input className={styles.input} type="password" placeholder="Senha" />

                    <br />
                    <br />

                    <input className={styles.input} type="password" placeholder="Confirme sua senha" />

                    <br />
                    <br />

                    <input className={styles.input} type="text" placeholder="Nome de Usuario" />

                    <br />

                    <button className={styles.button}>Continuar</button>
                    <h3 className={styles.h3}>Já possui uma conta? <Link className={styles.Link} href={`/user/login`}>Acessar</Link> </h3>
                </div>
            </div>
        </form>
       </main>
    )

}