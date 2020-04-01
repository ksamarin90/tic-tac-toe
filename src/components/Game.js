import React, {useState, useEffect} from 'react';
import Board from "./Board"
import { calculateWinner } from '../helpers'

const cross = 'images/close.png';
const zero = 'images/circle.png';

const Game = () => {
    const [board, setBoard] = useState(Array(9).fill(<img src='' alt=''/>))
    const [xIsNext, setXisNext] = useState(true)
    const [isStarted, setIsStarted] = useState(false)
    const [isEndOfGame, setIsEndOfGame] = useState(false)
    
    const winner = calculateWinner(board);

    const handleClick = (index) => {
        const boardCopy = [...board];

        if (winner || boardCopy.every(square => square.props.alt.length > 0)) {
            return;
        } else if (boardCopy[index].props.alt.length > 0 || !isStarted) {
            return;
        } else {
            boardCopy[index] = xIsNext ? <img src={cross} alt="X"/> : <img src={zero} alt="O"/>;
            setBoard(boardCopy);
            setXisNext(!xIsNext);
        }
    }

    const startGame = () => {
        setIsStarted(true);
        setIsEndOfGame(false);
        setBoard(Array(9).fill(<img src='' alt=''/>));
    }
    
    const endGame = () => {
        setIsStarted(false);
        setXisNext(true);
        setIsEndOfGame(true);
    }

    useEffect(() => {
        if (winner || board.every(square => square.props.alt.length > 0)) {
            endGame()
        }
    })

    return (
        <>
            {isEndOfGame ? winner ? <h1>Congratulations, {winner} won! </h1> : <h1>It's a draw, try again!</h1>
            : 
            !isStarted ? <h1>Let's play a Tic Tac Toe!</h1> : (xIsNext ? <h1>X is next.</h1> : <h1>O is next.</h1>)}
            <Board squares={board} onClick={handleClick} />
            <button className="start-game" disabled={isStarted} onClick={startGame}>
               {isStarted ? 'Playing' : 'Start Game'}
            </button>
        </>
    )
}

export default Game;