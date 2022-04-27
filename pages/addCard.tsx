import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import styles from '../styles/AddCard.module.css'
import type { Deck, Card } from '../model/types'
import axios from 'axios'
import Link from 'next/link'

type AddCardProps = {
    deckId: string;
}

function doAdd(frontTitle: string, frontText: string, backTitle: string, backText: string, deckId: string) {
    axios.post('/api/decks/' + deckId + "/cards/add", {
            frontTitle: frontTitle,
            frontText: frontText,
            backTitle: backTitle,
            backText: backText
    });
}

const AddCard: NextPage<AddCardProps> = ({ deckId }) => {

    const submitClick = () => {
        doAdd(frontTitle.current?.value as string, frontText.current?.value as string, backTitle.current?.value as string, backText.current?.value as string, deckId);
        frontTitle.current!.value = "";
        frontText.current!.value = "";
        backTitle.current!.value = "";
        backText.current!.value = "";

        toast.current!.style.top = "7vh";

        setTimeout(() => {
            if(toast.current != null)
                toast.current!.style.top = "-25vh";
        }, 3000);
    }; 

    const frontTitle = React.useRef<HTMLInputElement>(null);
    const frontText = React.useRef<HTMLTextAreaElement>(null);
    const backTitle = React.useRef<HTMLInputElement>(null);
    const backText = React.useRef<HTMLTextAreaElement>(null);
    const toast = React.useRef<HTMLDivElement>(null);

    return (
        <div className={styles.container}>
            <Head>
                <title>Flash/Cards</title>
                <meta name="description" content="Flashcard study app" />
                <link rel="icon" href="/check.png" />
            </Head>    
            <div className={styles.topBar}>
                <Link href={"/"} passHref><button className={styles.topBarBack}></button></Link>
            </div>
            <div className={styles.toast} ref={toast}><span>Added card!</span></div>
            <div>
                <form className={styles.newForm}>
                <h3>Front</h3>
                <input type="text" className={styles.titleInput} placeholder="Title" ref={frontTitle}/><br/>
                <textarea className={styles.textInput} placeholder="Text" ref={frontText}/><br/>
                <h3>Back</h3>
                <input type="text" className={styles.titleInput} placeholder="Title" ref={backTitle}/><br/>
                <textarea className={styles.textInput} placeholder="Text" ref={backText}/><br/>
                <input type="button" className={styles.submitButton} value="Add" onClick={submitClick}/><br/>
                </form>
            </div>
        </div>
    )
}


AddCard.getInitialProps = async (ctx) => {
    const deckId = ctx.query.deck as string;
    return { deckId };
}


export default AddCard
