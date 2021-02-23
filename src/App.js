import React, { useState, useEffect } from 'react';

import './App.css';

const App = () => {

  const [wins, setWins] = useState(0);
  const [loses, setLoses] = useState(0);
  const [draws, setDraws] = useState(0);
  const [player, setPlayer] = useState(null);
  const [cpu, setCpu] = useState(null);
  const [outcome, setOutcome] = useState(null);
  const [loading, setLoading] = useState(false);
  const [counter, setCounter] = useState(0);
  const items = ['rock', 'paper', 'scissors'];

  const gameLogic = () => {
    if (player === cpu) {
      setOutcome('DRAW');
      setDraws(draws + 1);
      return;
    }

    if (player === 'rock') {
      if (cpu === 'scissors') {
        setOutcome('WIN');
        setWins(wins + 1);
      } else {
        setOutcome('LOSE');
        setLoses(loses + 1);
      }
    }

    if (player === 'paper') {
      if (cpu === 'rock') {
        setOutcome('WIN');
        setWins(wins + 1);
      } else {
        setOutcome('LOSE');
        setLoses(loses + 1);
      }
    }

    if (player === 'scissors') {
      if (cpu === 'paper') {
        setOutcome('WIN');
        setWins(wins + 1);
      } else {
        setOutcome('LOSE');
        setLoses(loses + 1);
      }
    }
  }

  const cpuChoice = () => {
    const random = Math.floor(Math.random() * Math.floor(3));
    setCpu(items[random]);
  }

  const playerChoice = (choice) => {
    setPlayer(choice);
    setLoading(true);
    setCounter(3);

    setTimeout(() => {
      cpuChoice();
      setLoading(false);
    }, 3000)
  }

  useEffect(() => {
    if (!loading && cpu !== null) {
      gameLogic();
    }
  }, [loading]);

  useEffect(() => {
    if (counter > 0) {
      setTimeout(() => {
        setCounter(counter - 1)
      }, 1000);
    }
  }, [counter]);

  return <div>
    <h1 className="hidden">Rock, Paper, Scissors</h1>

    {
      !player ? <div className="card">
        <p>Choose:</p>
        <button onClick={() => { playerChoice(items[0]) }}>Rock</button>
        <button onClick={() => { playerChoice(items[1]) }}>Paper</button>
        <button onClick={() => { playerChoice(items[2]) }}>Scissors</button>
      </div> : <>
        <div className="container">
          <div className="card card--player">
            <h2>You</h2>
            <p>{player ? player : ''}</p>

            {
              !loading && <div>
                <p>Play Again:</p>
                <button onClick={() => { playerChoice(items[0]) }}>Rock</button>
                <button onClick={() => { playerChoice(items[1]) }}>Paper</button>
                <button onClick={() => { playerChoice(items[2]) }}>Scissors</button>
              </div>
            }
          </div>

          <div className="outcome">
            {
              !loading && <h3 outcome>{outcome ? outcome : ''}</h3>
            }
          </div>

          <div className="card card--player">
            <h2>AI</h2>
            {
              loading ? <h3>{counter}</h3> : <p>{cpu ? cpu : ''}</p>
            }
          </div>
        </div>
        <ul className="tally">
          <li>Win: {wins}</li>
          <li>Lose: {loses}</li>
          <li>Draw: {draws}</li>
        </ul>
      </>
    }
  </div>;
}

export default App;
