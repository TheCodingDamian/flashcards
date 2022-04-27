// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Deck, Card, CardSide } from '../../../model/types'
import fs from 'fs'

type AddRequestType = {
    deckName: string,
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const dck: AddRequestType = req.body;

    if(dck.deckName == "add") {
        res.status(500).send({});
        return;
    }

    if(fs.existsSync("data/decks/" + dck.deckName + ".json")) {
        res.status(500).send({});
        return;
    }

    const deck: Deck = {
        id: dck.deckName,
        cards: []
    };

    fs.writeFileSync("data/decks/" + deck.id + ".json", JSON.stringify(deck));
    res.status(200).send({});
}
