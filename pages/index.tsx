import { checktoken } from "@/services/tokenConfig"
import { deleteCookie, getCookie } from "cookies-next"
import styles from "@/styles/home.module.css"
import { useRouter } from "next/router"
import { useEffect, useState } from 'react'
import { createMovie } from "./api/controller/MovieController"
import Link from "next/link"

export default function Home() {
  //Recarregar a pagina
  const router = useRouter();
  const [data, setData]: any = useState();
  const [saveData, setSaveData]: any = useState();
  const [search, setSearch]: any = useState();

  function handleSearchEdit(event: any) {
    event.preventDefault();
    setSearch(event.target.value);

    searchformSubmit(event)
  }

  //Encontar filme
  function searchFilter(vetor: Array<any>) {
    if (search == '') {
      return vetor;
    }
    else {
      return vetor.filter(
        (movie: any) => movie.name.toLowerCase().includes(search)
      )
    }
  }

  function searchformSubmit(event: any) {
    event.preventDefault();
    try {
      const filteredArray = searchFilter(saveData);

      setData(filteredArray);
    }
    catch (err: any) {
      alert(err.message);
    }
  }

  async function fetchData() {
    const response = await fetch(`/api/action/movie/select`, {
      method: 'GET'
    })

    const responseJson = await response.json();

    setData(responseJson);
    setSaveData(responseJson);

    console.log(data);
  }

  // Funções que vão acontecer antes da pagina carregar
  useEffect(() => {
    fetchData();
  }, []);

  function logout() {
    deleteCookie('authorization');

    router.push(`/user/login`);
  }

  function movieClick(movieName: string) {
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

              <div className={styles.card} onClick={() => { movieClick(movie.name) }}>
                <img src={movie.imageURL} alt="" />
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

//Usuario n estiver logado ir a tela de login
export function getServerSideProps({ req, res }: any) {
  try {
    const token = getCookie('authorization', { req, res })

    if (!token) {
      throw new Error('Invalid Token');
    }

    checktoken(token);

    return {
      props: {}
    }

  }
  catch (err) {
    console.log(err)
    return {
      redirect: {
        permanent: false,
        destination: '/user/login'
      },
      props: {}
    }
  }
}

