import { checktoken } from "@/services/tokenConfig"
import { deleteCookie, getCookie } from "cookies-next"
import styles from "@/styles/home.module.css"
import { useRouter } from "next/router"
import {useEffect, useState} from 'react'
import { createMovie } from "./api/controller/MovieController"
import Link from "next/link"

export default function Home() {
  //Recarregar a pagina
  const router = useRouter();

  const [data, setData]: any = useState();

  async function fetchData() {
    const response = await fetch(`/api/action/movie/select`, {
      method: 'GET'
    })

    const responseJson = await response.json();

    setData(responseJson);

    console.log(data);
  }

  //Funções que vão acontecer antes da pagina carragar
  useEffect(() => {
    fetchData();
  }, []);

  function logout() {
    deleteCookie(`authorization`);

    router.push(`/user/login`);
  }

  function movieClick(movieName:string) {
    router.push(`/movie/` + movieName)
  }


  return (
    <main className={styles.body}>
      <nav className={styles.navBar}>

        
        <button className={styles.btnLogout} onClick={logout} type="submit">Logout</button>
        <Link href={`/movie/create`} className={styles.btnCreate}>Criar Filme</Link>
      </nav>
      <div className={styles.container}>

        {
          data != undefined && data instanceof Array ?

          data.map(movie => (

            <div className={styles.card} onClick={() => {movieClick(movie.name)}}>
              <p>{movie.name}</p>
              <p>{movie.releaseDate}</p>
            </div>


          ))

          :

          <div className={styles.Filmes_bar}>
            Filmes não encontrados
          </div>
        }

      </div>
    </main>
  )
}


