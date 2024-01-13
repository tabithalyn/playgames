import { useEffect, useState } from "react";
import { cardImages } from "../data/cardData";
import Card from "../components/Memoree/Card";

export type CardType = {
  id: number;
  src: string;
  flipped: boolean;
  clickable: boolean;
  matchingCardId: string;
}

const Memoree = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [win, setWin] = useState(false);
  const [matchedCards, setMatchedCards] = useState(0);
  const [clickedCard, setClickedCard] = useState<CardType|undefined>(undefined);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => (
        { ...card, id:Math.random(), clickable:true, flipped:false, matchingCardId:card.src }
      ));
    setCards(shuffledCards);
  }

  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    // Check for win
    if (matchedCards === cards.length / 2) {
      setWin(true);
    }
  }, [matchedCards, cards.length]);

  const cardClick = (currentCard:CardType) => {
    // Flip card
    setCards(prev => prev.map(card => (
      card.id === currentCard?.id ? {...card, flipped:true, clickable:false} : card
    )));

    // First card flipped
    if (!clickedCard) {
      setClickedCard({ ...currentCard });
      return;
    }

    // It's a match
    if (clickedCard.matchingCardId === currentCard.id.toString()) {
      setMatchedCards(prev => prev + 1);
      setCards(prev => prev.map(card => (
        card.id === clickedCard.id || card.id === currentCard.id ? {...card, clickable:false} : card
      )));
      setClickedCard(undefined);
      return;
    }

    // Timeout if not matched
    setTimeout(() => {
      setCards(prev => prev.map(card => (
        card.id === clickedCard.id || card.id === currentCard.id ? {...card, flipped:false, clickable:true} : card
      )));
    }, 1000);
    setClickedCard(undefined);
  }

  return (
    <div className="flex flex-wrap justify-center m-0 p-0">
      <h1 className="w-full text-center">Memoree Game</h1>
      <div className="w-full bg-red-200 p-14 flex flex-wrap justify-center">
        {cards.map(card => (
          <Card
            key={card.id}
            card={card}
            callback={cardClick}
            flipped={false}
          />
        ))}
      </div>
      <p>{win ? <span>You win!</span> : null}</p>
      <p>Image by <a href="https://www.freepik.com/free-vector/hand-drawn-memory-game-cards_37451756.htm#query=memory%20game%20cards&position=25&from_view=search&track=ais&uuid=38fc2146-49f3-4178-a888-34d1dfe637e7">Freepik</a></p>
    </div>
  );
}
 
export default Memoree;