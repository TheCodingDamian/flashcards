
type CardSide = {
    title: string;
    text: string;
}

type Card = {
    front: CardSide;
    back: CardSide;
    id: number;
    score: number;
}

type Deck = {
    id: string;
    cards: Card[];
}

export type { CardSide, Card, Deck };