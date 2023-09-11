import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { PromptInput } from './components/PromptInput';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>AI Image Editor</title>
      </Head>

      <main>
        <h1 className={styles.title}>
          <a>AI Image Editor</a>
        </h1>
        <PromptInput 
          prompt="Enter a prompt"
          value=""
          onChange={() => {}} 
        /> 
      </main>
      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family:
            Menlo,
            Monaco,
            Lucida Console,
            Liberation Mono,
            DejaVu Sans Mono,
            Bitstream Vera Sans Mono,
            Courier New,
            monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            Segoe UI,
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            Fira Sans,
            Droid Sans,
            Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
