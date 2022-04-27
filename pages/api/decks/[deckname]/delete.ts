// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Deck } from '../../../../model/types'
import fs from "fs"

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { deckname } = req.query;
    console.log(deckname + " is deleted now");

    fs.renameSync("data/decks/" + deckname + ".json", "data/deck-archive/" + deckname + ".json")

    console.log("DELETE OVER");

    res.status(200).json({});
}
