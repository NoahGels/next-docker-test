import Head from "next/head";
import styles from '../styles/Home.module.css';
import {useRef, useState} from "react";
import { useEffect } from 'react'
import io from 'socket.io-client'
import useSocket from "../hooks/useSocket";

export default function SocketIO(props) {

  const [counter, setCounter] = useState(0);
  const [connected, setConnected] = useState(false);

  const socket = useSocket();

  useEffect(() => {

    if (socket) {
      setConnected(true);

      socket.on('a user connected', () => {
        console.log('a user connected')
      })

      socket.on('disconnect', () => {
        setConnected(false);
      })

      socket.on('increase', (data) => {
        console.log('Hi');
        setCounter(data);
      });
    }
  }, [socket]);

  const increase = () => {
    socket.emit('increase');
  }

  return (
    <div>
      <Head>
        <title>My Socket App</title>
        <meta name="description" content="Scoket Test Yeah" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>{counter}</h1>
        <button onClick={increase}>
          Increase
        </button>
        <div style={{
          display: 'flex',
          alignItems: 'center',
        }}>
          <div style={{
            width: 16,
            height: 16,
            borderRadius: '50%',
            backgroundColor: connected ? '#0f4' : 'red',
            marginRight: 10,
          }}/>
          <h2>{connected ? 'Connected' : 'Disconnected'}</h2>
        </div>
      </main>
    </div>
  )
}
