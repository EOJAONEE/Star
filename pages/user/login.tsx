import { checktoken } from "@/services/tokenConfig"
import styles from "@/styles/login.module.css"
import { getCookie, setCookie } from "cookies-next"
import { useRouter } from "next/router"
import { useState } from "react"
import Link from "next/link"

export default function loginPage() {

    const [formData, setFormData] = useState({
        login: '',
        password: ''
    });

    const router = useRouter();

    function handleFormEdit(event: any, fielName: string) {
        setFormData({
            ...formData,
            [fielName]: event.target.value
        })
    }

    async function formSubmit(event: any) {
        event.preventDefault();

        try {
            const response = await fetch(`/api/action/user/login`, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const responseJson = await response.json();

            console.log(response.status)
            console.log(responseJson);

            if (response.status != 200) {
                throw new Error(responseJson.message);
            }
            else {
                setCookie('autorization', responseJson.token);

                router.push(`/`)
            }

        }
        catch (err: any) {
            alert(err.message);
        }
    }

    return (
        <main className={`flex min-h-screen`}>
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

export function getServersSideProps({req,res}: any) {
    try {
        const token = getCookie('autorization', { req, res })

        if (!token) {
            throw new Error('Invalid Token');
        }

        checktoken(token);

        return {
            redirect: {
                permenent: false,
                destination: '/'
            },
            props: {}
        }

    }
    catch(err) {
        return {
            props: {}
        }
    }
}
