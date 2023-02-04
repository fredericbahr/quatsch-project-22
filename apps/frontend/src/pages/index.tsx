import Head from "next/head";

// import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Quatsch-Projekt 22</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Quatsch Projekt von Gudat, Guzy, Fornacon, Bahr</h1>
      </main>

      <footer className={styles.footer}>
        {/* <Image
          alt='HTWK Logo'
          src='https://upload.wikimedia.org/wikipedia/de/thumb/1/16/HTWK-Logo.svg/2560px-HTWK-Logo.svg.png'
        /> */}
        <section>
          <p>Projekt für das Modul Fortgeschrittene Themen der Informatik (C204): Question Answering & Chatbots</p>
          <p>Hochschule für Technik, Wirtschaft und Kultur Leipzig Prof. Andreas Both</p>
        </section>
      </footer>

      <div
        id='rasa-chat-widget'
        data-websocket-url='http://localhost:5005'
        data-default-open='true'
        data-height='650'
        data-width='1000'
        data-primary='#FF0000'
        data-primary-highlight='#DD0000'
        data-avatar-background='#FF0000'
      ></div>
      {/* eslint-disable-next-line @next/next/no-sync-scripts */}
      <script src='https://unpkg.com/@rasahq/rasa-chat' type='application/javascript'></script>
    </div>
  );
}
