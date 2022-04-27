import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import styles from '../styles/AddDeck.module.css'
import type { Deck, Card } from '../model/types'
import axios, { AxiosError } from 'axios'
import Link from 'next/link'

async function doAdd(deckName: string) {
    try {
        const response = await axios.post('/api/decks/add', {
            deckName: deckName,
        });
    } catch (e: any) {
        return false;
    }
    return true;
}

const AddDeck: NextPage = () => {

    const submitClick = () => {
        doAdd(deckName.current!.value).then((ok) => {
            if(ok) {
                deckName.current!.value = "";
                toast.current!.innerHTML = "<span>Deck added successfully!</span>";
            }
            else {
                toast.current!.innerHTML = "<span>Invalid Deck name!</span>";
            }

            toast.current!.style.top = "7vh";

            setTimeout(() => {
                if(toast.current != null)
                    toast.current!.style.top = "-25vh";
            }, 3000);
        });
    }; 

    const deckName = React.useRef<HTMLInputElement>(null);
    const toast = React.useRef<HTMLDivElement>(null);

    return (
        <div className={styles.container}>
            <Head>
                <title>Flash/Cards</title>
                <meta name="description" content="Flashcard study app" />
                <link rel="icon" href="/check.png" />
            </Head>    
            <div className={styles.topBar}>
                <Link href={"/"}><button className={styles.topBarBack}></button></Link>
            </div>
            <div className={styles.toast} ref={toast}><span>Added card!</span></div>
            <div>
                <form className={styles.newForm}>
                <input type="text" className={styles.titleInput} placeholder="Title" ref={deckName}/><br/>
                <input type="button" className={styles.submitButton} value="Add" onClick={submitClick}/><br/>
                </form>
            </div>
        </div>
    )
}

export default AddDeck
