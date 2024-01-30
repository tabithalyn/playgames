/* eslint-disable @typescript-eslint/no-explicit-any */
import { useReducer, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import GameProgButton from "../components/Blackjax/GameProgButton";
import BlackJaxButtons from "../components/Blackjax/BlackJaxButtons";
import { checkDealersScore, getDeck, getTotal, isBlackJack } from "../utils/BlackJaxUtils";
import PlayArea from "../components/Blackjax/PlayArea";

// https://codesandbox.io/p/sandbox/blackjack-react-hooks-ezb5hn?file=%2Fsrc%2Fcomponents%2FGameProgressButton.js%3A10%2C7

const initialDeck = getDeck(3);
const penetration = 0.8;

const getMinNum = (initialDeck:{ suit: string; rank: string; }[], penetration:number) => {
  return initialDeck.length - Math.floor(initialDeck.length * penetration);
}

const initialState = {
  deck: initialDeck,
  minNumber: getMinNum(initialDeck, penetration),
  dealersHand: [],
  playersHand: [],
  isTurnOver: false
}

  const dealForDealer = (deck:{ rank: string; }[], hand: { rank: string; }[]) => {
    const newDeck:{ rank: string; }[] = deck.slice();
    const newHand:{ rank: string; }[] = hand.slice();
    while (checkDealersScore(newHand)) {
      const index = Math.floor(Math.random() * newDeck.length);
      newHand.push(newDeck[index]);
      newDeck.splice(index, 1);
    }
    return [newDeck, newHand];
  }
  
  const deal = (deck:string[], hand:string[], time:number) => {
    const newDeck:string[] = deck.slice();
    const newHand:string[] = hand.slice();
    for (let i=0; i < time; i++) {
      const index = Math.floor(Math.random() * newDeck.length);
      newHand.push(newDeck[index]);
      newDeck.splice(index, 1);
    }
    return [newDeck, newHand];
  }

  const initDealersHand = (state: { deck: string[]; playersHand?: string[]; dealersHand?: string[] | { rank: string; }[]; }) => {
    const [newDeck, newHand] = deal(state.deck, [], 2);
    return {...state, deck: newDeck, dealersHand: newHand};
  }
  const initPlayersHand = (state: { deck: string[]; playersHand?: string[]; dealersHand?: string[] | { rank: string; }[]; }) => {
    const [newDeck, newHand] = deal(state.deck, [], 2);
    return {...state, deck: newDeck, playersHand: newHand};
  }

  function reducer(state, action) {
    switch (action.type) {
      case "init": {
        state = initDealersHand(state);
        state = initPlayersHand(state);
        return {...state, isTurnOver: false};
      }
      case "hit": {
        const [newDeck, newHand] = deal(state.deck, state.playersHand, 1);
        return {...state, deck: newDeck, playersHand: newHand};
      }
      case "stand": {
        const [newDeck, newHand] = dealForDealer(state.deck, state.dealersHand);
        return {...state, deck: newDeck, dealersHand: newHand, isTurnOver: true};
      }
      case "check": {
        if (isBlackJack(state.dealersHand) || isBlackJack(state.playersHand)) {
          return {...state, isTurnOver: true};
        }
        if (getTotal(state.playersHand) === 21) {
          const [newDeck, newHand] = dealForDealer(state.deck, state.dealersHand);
          return {...state, deck: newDeck, dealersHand: newHand, isTurnOver: true};
        }
        if (getTotal(state.playersHand) > 21) {
          return {...state, isTurnOver: true};
        }
        return {...state};
      }
      case "shuffle": {
        const newDeck = getDeck(3);
        return {...state, deck: newDeck};
      }
      default:
    }
  }

const Blackjax = () => {
  const [state, dispatch] = useReducer<(state: any, actions: any) => { deck: { suit: string; rank: string; }[]; minNumber: number; dealersHand: never[]; playersHand: never[]; isTurnOver: boolean; }>(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "init" });
    dispatch({ type: "check" });
  }, []);

  useEffect(() => {
    if (state.deck.length <= state.minNumber) {
      dispatch({ type: "shuffle" });
      toast("Shuffled!", {
        style: {
          borderRadius: "10px",
          background: "#737373",
          color: "#ffffff"
        }
      });
    }
  }, [state.deck.length, state.minNumber]);

  const hit = () => {
    dispatch({ type: "hit" });
    dispatch({ type: "check" });
  }
  const stand = () => {
    dispatch({ type: "stand" });
  }
  const next = () => {
    dispatch({ type: "init" });
    dispatch({ type: "check" });
  }

  const getButtons = (playersHand:{rank: string}[]) => {
    if (getTotal(playersHand) > 21 || state.isTurnOver) {
      return <GameProgButton onClickNext={next} isLastGame={false} />
    } else {
      return <BlackJaxButtons onClickHit={hit} onClickStand={stand} />
    }
  }

  return (
    <div className="flex flex-wrap justify-center items-center h-[100vh] w-[100vw] bg-[#362312]">
    <div className="w-3/4 justify-center flex flex-wrap">
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
    <div className="bg-green-800 border-t-[15px] border-l-[15px] border-r-[15px] border-green-950 rounded-t-xl w-3/4 p-10 flex flex-wrap items-center justify-center">
      <PlayArea
        dealersHand={state.dealersHand}
        playersHand={state.playersHand}
        isTurnOver={state.isTurnOver}
        deck={state.deck}
        decks={[]}
        dealerHand={[]}
        playerHand={[]}
      />
    </div>
    <div className="p-2 bg-green-800 flex flex-wrap justify-center gap-2 w-3/4 mb-5 -mt-20 rounded-b-xl border-b-[15px] border-l-[15px] border-r-[15px] border-green-950">
      {getButtons(state.playersHand)}
    </div>
    </div>
  );
}
 
export default Blackjax;
