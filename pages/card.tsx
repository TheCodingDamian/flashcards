import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/CardView.module.css'
import * as react from 'react'
import { CardSide, Card, Deck } from '../model/types'
import { useRouter } from 'next/router'
import * as axios from 'axios'
import next from 'next'
import Link from 'next/link'
import * as katex from 'react-katex'
import 'katex/dist/katex.min.css';

type CardViewProps = {
    card: Card;
}

type CardViewState = {
    card: Card;
    cardSide: CardSide;
    extraStyle: string
}

class CardView extends react.Component<CardViewProps, CardViewState> {

    constructor(props: CardViewProps) {
        super(props);
        this.state = {
            card: props.card,
            cardSide: props.card.front,
            extraStyle: "",
        };
    }

    turn() {
        if(this.state.cardSide == this.state.card.front) {
            this.setState({
                card: this.state.card,
                cardSide: this.state.card.back,
                extraStyle: this.state.extraStyle
            });
        } else {
            this.setState({
                card: this.state.card,
                cardSide: this.state.card.front,
                extraStyle: this.state.extraStyle
            });
        }
    }

    render() {
        const titleParts = this.state.cardSide.title.split("$$");
        const textParts = this.state.cardSide.text.replaceAll("\n", "<br/>").split("$$");
        return (
            <div className={styles.card + " " + this.state.extraStyle} onClick={() => this.turn()}>
                <div className={styles.cardTitle}>
                    {titleParts.map((part, index) => {
                        return index % 2 == 0 ?
                            (
                                <span key={index}>{part}</span>
                            )
                            :
                                titleParts.length > 3 || titleParts[0].length >  0 || (titleParts.length == 3 && titleParts[2].length > 0) ? 
                                    (<katex.InlineMath key={index} math={part} />)
                                    :
                                    (<katex.BlockMath key={index} math={part} />)
                    })}
                </div>
                <div className={styles.cardText}>
                {textParts.map((part, index) => {
                        return index % 2 == 0 ?
                            (
                                <span key={index} dangerouslySetInnerHTML={{__html: part}}></span>
                            )
                            :
                                textParts.length > 3 || textParts[0].length >  0 || (textParts.length == 3 && textParts[2].length > 0) ? 
                                    (<katex.InlineMath key={index} math={part} />)
                                    :
                                    (<katex.BlockMath key={index} math={part} />)
                    })}
                </div>
            </div>
        )
    }
}

type DeckResultType = {
    deck: Deck;
}
async function getDeck(deckId: string) {

    try {
        const response = await axios.default.get('/api/decks/' + deckId);
        const result = (await response.data) as DeckResultType
        return result.deck;
    } catch {
        const response = await axios.default.get('http://localhost:3000/api/decks/' + deckId);
        const result = (await response.data) as DeckResultType
        return result.deck;
    }
}

type HomeProps = {
    deck: Deck;
}

const Home: NextPage<HomeProps> = ({ deck }) => {

    const currentCard = deck.cards[0];

    const cardView = react.useRef<CardView>(null)
    
    const okClick = () => {
        if(deck.cards.length == 0)
            return;

        const card = deck.cards[0];
        axios.default.post('/api/decks/' + deck.id + "/cards/" + card.id + "/ok");

        cardView.current?.setState({
            card: cardView.current?.state.card,
            cardSide: cardView.current?.state.cardSide,
            extraStyle: styles.cardOkay
        });
        setTimeout(nextCard, 1000);
    }

    const nopeClick = () => {
        if(deck.cards.length == 0)
            return;

        const card = deck.cards[0];
        axios.default.post('/api/decks/' + deck.id + "/cards/" + card.id + "/nope");

        cardView.current?.setState({
            card: cardView.current?.state.card,
            cardSide: cardView.current?.state.cardSide,
            extraStyle: styles.cardNope
        });
        setTimeout(nextCard, 400);
    }

    const nextCard = () => {
        cardView.current?.setState({
            card: deck.cards[0],
            cardSide: deck.cards[0].front,
            extraStyle: styles.cardWaiting
        });
        setTimeout(openNextCard, 50);
    }

    const openNextCard = () => {
        deck.cards.splice(0, 1);
        if(deck.cards.length == 0)
            return;
        cardView.current?.setState({
            card: deck.cards[0],
            cardSide: deck.cards[0].front,
            extraStyle: ""
        });
    }

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
            <main className={styles.main}>
                <div className={styles.cardContainer}>
                { currentCard != null ?
                    (<CardView card={currentCard} ref={cardView}/>)
                    :
                    (<div></div>)
                }
                </div>
                <div className={styles.feedbackBar}>
                    <button className={styles.feedbackButton + " " + styles.feedbackButtonNo} onClick={nopeClick}></button>
                    <button className={styles.feedbackButton + " " + styles.feedbackButtonYes} onClick={okClick}></button>
                </div>
            </main>
        </div>
    )
}

Home.getInitialProps = async (ctx) => {

    const deckId = ctx.query.deck as string;

    const deck = await getDeck(deckId);

    return { deck: deck }
}

export default Home
