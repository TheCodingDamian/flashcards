import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import styles from '../styles/Home.module.css'
import type { Deck, Card } from '../model/types'
import axios from 'axios'
import Link from 'next/link'

type DeckViewProps = {
    deck: Deck
}
type CardScoresViewProps = {
    deckId: string
    cards: Card[]
}

function colorScale(min: number, max: number, value: number) {
    const percentage = (value - min)/(max - min);
    type Color = {
        red: number,
        green: number,
        blue:number
    };
    const scale: Color[] = [
        { red: 44, green: 186, blue: 0 },
        { red: 163, green: 255, blue: 0 } ,
        { red: 255, green: 244, blue: 0 } ,
        { red: 255, green: 167, blue: 0 } ,
        { red: 255, green: 0, blue: 0 } 
    ];
    if (value >= max) {
        return "rgb(" + scale[-1].red + ", " + scale[-1].green + ", " + scale[-1].blue + ")";
    }
    if (value <= min) {
        return "rgb(" + scale[0].red + ", " + scale[0].green + ", " + scale[0].blue + ")";
    }

    const step = 1.0 / scale.length;

    const index = Math.floor(percentage / step);
    const subPercentage = (percentage - step * index) / step;

    const color1 = scale[index];
    const color2 = scale[index + 1];

    const finalColorRed = Math.floor((color1.red + (color2.red - color1.red)*subPercentage));
    const finalColorGreen = Math.floor((color1.green + (color2.green - color1.green)*subPercentage));
    const finalColorBlue = Math.floor((color1.blue + (color2.blue - color1.blue)*subPercentage));
    return "rgb(" + finalColorRed + ", " + finalColorGreen + ", " + finalColorBlue + ")";

    

}

const CardScoresView: React.FC<CardScoresViewProps> = ({ deckId, cards }) => {
    const entryWidth = 100 / cards.length;
    return (
        <div className={styles.cardScores}>
            {
                cards.map((card, index) => (
                    <div className={styles.cardScoreEntry} key={deckId + " " + card.id} style={
                        {
                            height: (Math.min(4, card.score) / 4 * 100) + "%",
                            width: entryWidth - 1 + "%",
                            left: (entryWidth * index) + "%",
                            backgroundColor: colorScale(0.5, 4, card.score)
                        }
                    }></div>
                ))
            }
        </div>
    )
}

const DeckView: React.FC<DeckViewProps> = ({ deck })  => {

    const deleteClick = (event: React.MouseEvent) => {
        deleteDeck(deck.id);
        event.stopPropagation();
        setTimeout(() => location.reload(), 100);
    };

    return (
        <Link href={{
            pathname: "/card",
            query: { deck: deck.id }
        }}>
            <div className={styles.deck}>
                <h2>{deck.id}</h2>
                <button className={styles.deleteButton} onClick={deleteClick}></button>

                <Link href={{
                    pathname: "/addCard",
                    query: { deck: deck.id }
                }}>
                    <button className={styles.addButton}></button>
                </Link>
                <div className={styles.deckSize}>{deck.cards.length} cards</div>
                <CardScoresView cards={deck.cards} deckId={deck.id}/>
            </div>
        </Link>
    )
}


type HomeProps = {
    decks: Deck[];
}

const Home: NextPage<HomeProps> = ({ decks }) => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Flash/Cards</title>
                <meta name="description" content="Flashcard study app" />
                <link rel="icon" href="/check.png" />
            </Head>    
            <div className={styles.topBar}>
                <Link href={"/addDeck"}><button className={styles.topBarAdd}></button></Link>
            </div>
            <div>
            {decks.map((deck) => 
            {
                return (
                    <DeckView deck={deck} key={deck.id} />
                )
            })}
            </div>
            <Link href="/info">
                <div className={styles.info}><Image src="/info.png" width="100%" height="100%"/></div>
            </Link>
        </div>
    )
}


Home.getInitialProps = async (ctx) => {
    const decks = await getDecks();
    return { decks: decks }
}

type DecksResultType = {
    decks: Deck[];
}
async function getDecks() {
    try {
        const response = await axios.get('/api/decks');
        const result = (await response.data) as DecksResultType
        return result.decks;
    } catch {
        const response = await axios.get('http://localhost:3000/api/decks');
        const result = (await response.data) as DecksResultType
        return result.decks;
    }
}

function deleteDeck(id: string) {
    axios.post('/api/decks/' + id + "/delete");
}


export default Home
