import styles from '@/styles/register.module.css';
import { useState } from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';

export default function registerPage() {

    const [formData , setFormData] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
        confirmpassword: ''
    });

    const router = useRouter();

    function handleFormEdit(event: any , fieldName:string) {
        setFormData({
            ...formData,
            [fieldName] : event.target.value
        });
    }

    async function formSubmit( event:any) {
        event.preventDefault();

        try{

            const response = await fetch('/api/action/user/create', {
                method: 'POST',
                headers: {'Content-type' : 'application/json'},
                body: JSON.stringify(formData)
            });

            const responseJson = await response.json();

            console.log(response.status);
            console.log(responseJson);

            if(response.status != 201) {
                throw new Error(responseJson.message);
            }
            else{
                alert('Accont Created');
                router.push('/user/login');
            }

        }
        catch(err:any) {
            alert(err.message);
        }
    }

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

                        <input className={styles.input} type="text" placeholder="Digite seu Nome" />

                        <br />
                        <br />

                        <input className={styles.input} type="text" placeholder="Digite seu E-mail" />

                        <br />
                        <br />
                        <input className={styles.input} type="text" placeholder="Nome de Usuario" />

                        <br />
                        <br />

                        <input className={styles.input} type="password" placeholder="Senha" />

                        <br />
                        <br />

                        <input className={styles.input} type="password" placeholder="Confirme sua senha" />

                        <br />
                        <br />

                        <button className={styles.button}>Continuar</button>
                        <h3 className={styles.h3}>Já possui uma conta? <Link className={styles.Link} href={`/user/login`}>Acessar</Link> </h3>
                    </div>
                </div>
            </form>
        </main>
    )

}