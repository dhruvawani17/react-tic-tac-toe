import React, { useState } from 'react';
import './tictactoe.css';
import circle_icon from './assets/images/circle.png';
import cross_icon from './assets/images/crosss.png';

const TicTacToe = () => {
    const [data, setData] = useState(["", "", "", "", "", "", "", "", ""]);
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);
    const [winner, setWinner] = useState(null);

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const checkWinner = (newData) => {
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (newData[a] && newData[a] === newData[b] && newData[a] === newData[c]) {
                setWinner(newData[a]);
                setLock(true);
                return;
            }
        }
        // Check for draw
        if (!newData.includes("")) {
            setWinner("Draw");
            setLock(true);
        }
    };

    const toggle = (num) => {
        if (lock || data[num]) {
            return;
        }
        const newData = [...data];
        if (count % 2 === 0) {
            newData[num] = "x";
        } else {
            newData[num] = "o";
        }
        setData(newData);
        setCount(count + 1);
        checkWinner(newData);
    };

    const resetGame = () => {
        setData(["", "", "", "", "", "", "", "", ""]);
        setCount(0);
        setLock(false);
        setWinner(null);
    };

    const getBoxContent = (value) => {
        if (value === "x") {
            return <img src={cross_icon} alt="X" />;
        } else if (value === "o") {
            return <img src={circle_icon} alt="O" />;
        }
        return null;
    };

    return (
        <div className="container">
            <h1 className="title">TIC TAC TOE</h1>
            <div className="board">
                {[0, 1, 2].map((row) => (
                    <div className="row" key={row}>
                        {[0, 1, 2].map((col) => {
                            const index = row * 3 + col;
                            return (
                                <div
                                    key={index}
                                    className="boxes"
                                    onClick={() => toggle(index)}
                                >
                                    {getBoxContent(data[index])}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
            <div className="status">
                {winner ? (
                    winner === "Draw" ? (
                        <h2 className="draw">It's a Draw!</h2>
                    ) : (
                        <h2 className='winner'>{winner === "x" ? "Player X Wins!" : "Player O Wins!"}</h2>
                    )
                ) : (
                    <h2>{count % 2 === 0 ? "Player X's Turn" : "Player O's Turn"}</h2>
                )}
            </div>
            <div>
                <button className="reset" onClick={resetGame}>
                    Reset
                </button>
            </div>
        </div>
    );
};

export default TicTacToe;
