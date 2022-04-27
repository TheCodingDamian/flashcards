// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Deck, Card } from '../../../model/types'
import fs from 'fs'

type DeckListResultType = {
    decks: Deck[];
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<DeckListResultType>
) {
    const deckNames = fs.readdirSync("data/decks");
    const decks: Deck[] = []
    deckNames.forEach((deck) => {
        console.log(deck);
        const raw = fs.readFileSync("data/decks/" + deck);
        const dck = JSON.parse(raw.toString());
        decks.push(dck as Deck);
    });

    res.status(200).json({decks: decks});
}
