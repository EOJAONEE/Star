import styles from "@/styles/home.module.css"
import Link from "next/link"

export default function Home() {
  return (
    <main className={styles.body}>
      <button className={styles.button}><Link href={`/user/login`} >ENTRAR</Link></button>
          <form className={`flex min-h-screen`}>   
            <div className={styles.logo}>
            </div>
              <div className={styles.container}>
                <h1 className={styles.h1}>Séries, filmes e esportes que você adora.</h1>

                  <br />
                  <br />

                <button className={styles.oferta}><Link href={`/user/register`}>APROVEITE A OFERTA COMBO+</Link></button>
              </div>
          </form>
    </main>
  )
}
''