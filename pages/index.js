import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect, useRef, useCallback, useState } from "react";
import dynamic from "next/dynamic";

const Code = dynamic(async () => import("./../components/Code"), {
  loading: () => <div>Loading</div>,
  ssr: false,
});

export default function Home({ hello }) {
  const workerRef = useRef();
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  useEffect(() => {
    workerRef.current = new Worker(new URL("../worker.js", import.meta.url));
    workerRef.current.onmessage = (evt) => {
      console.log(evt.data)
      setOutput(evt.data["results"] || evt.data["error"])
    };
    return () => {
      workerRef.current.terminate();
    };
  }, []);

  const handleWork = useCallback(async () => {
    workerRef.current.postMessage(code);
  }, [code]);

  return (
    <div className={styles.container}>
      <Code setCode={setCode}/>
      <button onClick={handleWork}>Analyze</button>
      <div><p>{output}</p></div>
    </div>
  );
}
