export type PropsType = {
  deck: { rank: string; }[];
  decks: string[];
  isTurnOver: boolean;
  dealersHand: string[];
  dealerHand: { rank: string; }[];
  playersHand: string[];
  playerHand: { rank: string; }[];
}

export type ActionType = { type: 'SHUFFLE' } | { type: 'HIT' } | { type: 'STAND' } | { type: 'INIT' } | { type: 'CHECK' };

export const getDeck = (numDeck = 1) => {
  const suits = ["♠️", "♣️", "♥️", "♦️"];
  const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  const deck:{suit:string; rank:string}[] = [];

  for (let i=0; i < numDeck; i++) {
    suits.forEach((suit) => {
      ranks.forEach((rank) => deck.push({ suit: suit, rank: rank }));
    })
  }
  return deck;
}

export const getRankNum = (rank:string) => {
  switch (rank) {
    case "A":
      return 1;
    case "J":
    case "Q":
    case "K":
      return 10;
    default:
      return Number(rank);
  }
}

export const getTotal = (hand:{rank:string}[]) => {
  let total = 0;
  for (const card of hand) {
    total += getRankNum(card.rank);
  }
  return total;
}

export const hasAce = (hand:{rank:string}[]) => {
  for (const card of hand) {
    if (card.rank === "A") return true;
  }
  return false;
}

export const checkDealersScore = (hand:{rank: string;}[]) => {
  let total = getTotal(hand);
  if (isSoftHand(hand)) total += 10;
  if (total < 17) return true;
  return false;
}

export const isAce = (card:{rank:string;}) => { return card.rank === "A" };

export const isFaceCardOrTen = (card:{rank: string;}) => {
  if (getRankNum(card.rank) === 10) return true;
  return false;
}

export const isSoftHand = (hand:{rank: string;}[]) => {
  if (isBlackJack(hand)) return false;
  if (!hasAce(hand)) return false;
  if (getTotal(hand) + 10 < 21) return true;
  return false;
}

export const isBlackJack = (hand:{rank: string;}[]) => {
  const firstCard = hand[0];
  const secondCard = hand[1];
  if (
    (isAce(firstCard) && isFaceCardOrTen(secondCard)) || (isFaceCardOrTen(firstCard) && isAce(secondCard))
  ) {
    return true;
  }
  return false;
}

export const getScore = (hand:{rank: string;}[]) => {
  if (isBlackJack(hand)) { return [21]; }
  if (isSoftHand(hand)) {
    return [getTotal(hand), getTotal(hand) + 10];
  }
  return [getTotal(hand)];
}

export const getScoreDisplay = (hand:{rank: string;}[]) => {
  const score = getScore(hand);
  if (isSoftHand(hand)) {
    return `${score[0]} | ${score[1]}`;
  }
  return score[0];
}

export const getLastScore = (hand:{rank: string;}[]) => {
  const score = getScore(hand);
  if (isSoftHand(hand)) {
    return score[1];
  }
  return score[0];
}

export const judge = (dealersHand:{rank: string;}[], playersHand:{rank: string;}[]) => {
  const dealersScore = getLastScore(dealersHand);
  const playersScore = getLastScore(playersHand);

  if (getTotal(playersHand) > 21) return "YOU LOSE!";
  if (dealersScore === playersScore) return "PUSH";
  if (isBlackJack(playersHand)) return "BLACKJACK!!";
  if (isBlackJack(dealersHand)) return "YOU LOSE!";
  if (dealersScore > 21) return "DEALER BUST, YOU WIN!"
  if (dealersScore < playersScore) return "YOU WIN!";
  if (dealersScore > playersScore) return "YOU LOSE!";

  return "YOU WIN!";
}