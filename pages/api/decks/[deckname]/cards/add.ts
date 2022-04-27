// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Deck, Card, CardSide } from '../../../../../model/types'
import fs from 'fs'

type AddRequestType = {
    frontTitle: string,
    frontText: string,
    backTitle: string,
    backText: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const { deckname } = req.query;

    const cardValues: AddRequestType = req.body;

    fs.readFile("data/decks/" + deckname + ".json", (err, data) => {
        const deck = JSON.parse(data.toString()) as Deck;
        console.log(deck);
        console.log(deck.cards);
        const lastId = deck.cards.length > 0 ? deck.cards[deck.cards.length - 1].id : 0;
        const cd: Card = {
            id: lastId + 1,
            score: 1,
            front: {
                title: cardValues.frontTitle,
                text: cardValues.frontText,
            },
            back: {
                title: cardValues.backTitle,
                text: cardValues.backText
            }
        }
        deck.cards.push(cd)

        fs.writeFile("data/decks/" + deckname + ".json", JSON.stringify(deck), () => {});
    });
    

    
    res.status(200).send({});
}
