import styles from "@/styles/login.module.css"
import Link from "next/link"

export default function loginPage() {
    return (
        <main   className={`flex min-h-screen`}>
            <form className={styles.formulario}>
                <div className={styles.logo}>
                </div>
                    <div className={styles.container}>
                        <div className={styles.container2}>
                            <br />
                            <h2 className={styles.h2}>Use seu E-mail e Senha para entrar</h2>

                            <input className={styles.input} type="text" placeholder="Digite os seu Email" />

                            <input className={styles.input} type="password" placeholder="Senha" />
                            <br />
                            <br />
                            <br />
                            <button className={styles.button}>Continuar</button>

                            <div className={styles.register}>
                                <h3>Não Possui uma conta? <Link className={styles.Link} href={`/user/register`}><b><u>Registre-se</u></b></Link></h3>
                            </div>
                        </div>
                    </div>
            </form>
        </main>
    )
}
