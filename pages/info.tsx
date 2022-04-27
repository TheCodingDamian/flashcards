import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import styles from '../styles/Info.module.css'
import type { Deck, Card } from '../model/types'
import axios from 'axios'
import Link from 'next/link'

const InfoPage: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Flash/Cards</title>
                <meta name="description" content="Flashcard study app" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="icon" href="/check.png" />
            </Head>    
            <div className={styles.topBar}>
                <Link href={"/"} passHref><button className={styles.topBarBack}></button></Link>
            </div>
            <div>
                <h2>Flash/Cards App by <i>TheCodingDamian</i></h2><br/>
                <h3>Thank you to the following artists for providing images for this app:</h3><br/>
                <a href="https://www.flaticon.com/free-icons/plus" title="plus icons">Plus icons created by srip - Flaticon</a><br/>
                <a href="https://www.flaticon.com/free-icons/trash" title="trash icons">Trash icons created by Freepik - Flaticon</a><br/>
                <a href="https://www.flaticon.com/free-icons/info" title="info icons">Info icons created by Freepik - Flaticon</a><br/>
                <a href="https://www.flaticon.com/free-icons/arrow" title="arrow icons">Arrow icons created by Kirill Kazachek - Flaticon</a><br/>
                <a href="https://www.flaticon.com/free-icons/check" title="check icons">Check icons created by Freepik - Flaticon</a><br/>
                <a href="https://www.flaticon.com/free-icons/close" title="close icons">Close icons created by Pixel perfect - Flaticon</a><br/>
            </div>
        </div>
    )
}

export default InfoPage
