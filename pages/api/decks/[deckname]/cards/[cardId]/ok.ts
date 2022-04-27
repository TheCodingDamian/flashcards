// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Deck } from '../../../../../../model/types'
import fs from 'fs'


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const { deckname, cardId } = req.query;
    const card = parseInt(cardId as string);

    fs.readFile("data/decks/" + deckname + ".json", (err, data) => {
        const deck = JSON.parse(data.toString()) as Deck;
        const cd = deck.cards.find((val, index, obj) => {
            return val.id === card;
        });
        if(cd != undefined)
        {
            cd.score /= 2;
        }

        fs.writeFile("data/decks/" + deckname + ".json", JSON.stringify(deck), () => {});
    });
    
    res.status(200).send({});
}
