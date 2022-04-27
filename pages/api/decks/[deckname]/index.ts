// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Deck } from '../../../../model/types'
import fs from "fs"

type DeckResultType = {
    deck: Deck;
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<DeckResultType>
) {
    const { deckname } = req.query;

    const raw = fs.readFileSync("data/decks/" + deckname + ".json");
    const deck = JSON.parse(raw.toString()) as Deck;

    if(deck.cards.length > 20)
    {
        deck.cards.sort((a, b) => b.score - a.score);
        deck.cards = deck.cards.slice(0, 20);
    }

    for(let i = 0; i < deck.cards.length - 1; i++) {
        const other = Math.floor(Math.random() * (deck.cards.length - i)) + i;
        const temp = deck.cards[i];
        deck.cards[i] = deck.cards[other];
        deck.cards[other] = temp;
    }

    res.status(200).json({deck: deck});
}
