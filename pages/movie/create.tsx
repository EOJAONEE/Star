import styles from '@/styles/createMovie.module.css'
import { useState } from 'react';
import Link from 'next/link';

export default function page() {
    const [ formData , setFormData ] = useState({
        name: '',
        releaseDate:''
    });

    const [ imageUploaded , setImageUploaded ] = useState(undefined);

    function handleFormEdit(event:any , field:string) {
        setFormData({
            ...formData,
            [field] : event.target.value
        });
    }

    function handleImageEdit(event:any) {
        setImageUploaded( event.target.files[0] );
    }

    async function formSubmit_image(event:any){
        event.preventDefault();

        if (imageUploaded == undefined) {
            alert("Selecione uma imagem");
            return;
        }

        try{
            const img = new FormData();
            img.append("image", imageUploaded);

            const response = await fetch(`/api/action/movie/createImage` , {
                method: 'POST',
                body: img
            });

            const responseJson = await response.json();

            if ( response.status != 200 ) {
                throw new Error(responseJson.message);
            }
            else {
               createMovie(responseJson.secure_url);
            }

        }
        catch (err:any) {
            alert(err.messag);
        }
    }

    async function createMovie(imgURL:string) {
        try {
            const response = await fetch(`/api/action/movie/create`, {
                method: 'POST',
                headers: {
                    'Content-type' : 'application/json',
                },
                body: JSON.stringify( {
                    name: formData.name,
                    releasedate: formData.releaseDate,
                    imgURL: imgURL
                })
            });
            

            const responseJson = await response.json();

            if (response.status != 201) {
                throw new Error (responseJson.message);
            }
            else {
                alert("Movie created");
            }
        }
        catch (err:any) {
            alert(err.message);
        }

    }

    return (
        <main className={`flex min-h-screen`}>
            <div className={styles.container}>
                <div className={styles.container2}>
                    <h1 className={styles.h1}>Criar um filme</h1>
                    <br />

                    <form onSubmit={formSubmit_image}>
                        <input className={styles.input} value={formData.name} onChange={(event) => {handleFormEdit(event,'name')}} type="text" placeholder='Nome' />
                        <br />
                        <br />
                        <input className={styles.inputDate} value={formData.releaseDate} onChange={(event) => {handleFormEdit(event, 'releaseDate')}} type="date" />
                        
                        <br />
                        <br />

                        <input onChange={handleImageEdit} className={styles.inputImage} type="file" accept='jpg, .jpeg, .png, .gif' />
                        
                        <br />
                        <br />

                        <Link className={styles.link} href={`/`}>Enviar</Link>
                    </form>
                </div>
            </div>
        </main>
    );
}