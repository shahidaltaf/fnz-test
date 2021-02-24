import React, { useState, useEffect } from 'react';

import './App.css';

import rockButtonImage from './assets/svg/button-rock.svg';
import paperButtonImage from './assets/svg/button-paper.svg';
import scissorsButtonImage from './assets/svg/button-scissors.svg';

import rockImage from './assets/svg/rock.svg';
import paperImage from './assets/svg/paper.svg';
import scissorsImage from './assets/svg/scissors.svg';

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
        setOutcome('LOST');
        setLoses(loses + 1);
      }
    }

    if (player === 'paper') {
      if (cpu === 'rock') {
        setOutcome('WIN');
        setWins(wins + 1);
      } else {
        setOutcome('LOST');
        setLoses(loses + 1);
      }
    }

    if (player === 'scissors') {
      if (cpu === 'paper') {
        setOutcome('WIN');
        setWins(wins + 1);
      } else {
        setOutcome('LOST');
        setLoses(loses + 1);
      }
    }
  }

  const cpuChoice = () => {
    const random = Math.floor(Math.random() * 3);
    setCpu(items[random]);
  }

  const playerChoice = (choice) => {
    setPlayer(choice);
    setOutcome(null);

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
  }, [loading, cpu]);

  useEffect(() => {
    if (counter > 0) {
      setTimeout(() => {
        setCounter(counter - 1)
      }, 1000);
    }
  }, [counter]);

  const PlayButtons = ({variant}) => {
    return <div className={`buttons ${variant === 'small' ? 'buttons--small' : ''}`}>
      <img src={rockButtonImage} alt="Choose Rock" onClick={() => { playerChoice(items[0])}} />
      <img src={paperButtonImage} alt="Choose Paper" onClick={() => { playerChoice(items[1])}} />
      <img src={scissorsButtonImage} alt="Choose Scissors" onClick={() => { playerChoice(items[2])}} />
    </div>;
  }

  const GuestureImage = ({guesture, status, player}) => {
    let imageName;
    let statusClass;

    if (guesture === 'rock') {
      imageName = rockImage;
    } else if (guesture === 'paper') {
      imageName = paperImage;
    } else {
      imageName = scissorsImage;
    }

    switch (status) {
      case 'WIN':
        statusClass = 'chosen-image--win';
        break;
      
      case 'LOST':
        statusClass = 'chosen-image--lost';
        break;

      case 'DRAW':
        statusClass = 'chosen-image--draw';
        break;
    
      default:
        statusClass = '';
        break;
    }

    return <div className={`chosen-image ${player ? 'chosen-image--player' : ''} ${statusClass}`}><img src={imageName} alt="Chosen guesture" /></div>
  }

  return <div>
    <h1 className="hidden">Rock, Paper, Scissors</h1>

    {
      !player ? <div className="card">
        <p className="intro">Choose:</p>
        <PlayButtons />
      </div> : <>
        <div className="container">

        <div className="card-container">
          <h2>You</h2>
          <div className="card">
            
            <GuestureImage guesture={player} status={outcome} player/>
            {
              !loading && <div className="play-again">
                <p>Play Again:</p>
                <PlayButtons variant="small" />
              </div>
            }
          </div>
          </div>

          <div className="outcome">
            {
              !loading && <h3 className="outcome">{outcome && outcome}</h3>
            }
          </div>

          <div className="card-container">
          <h2>AI</h2>
          <div className="card">
            
            {
              loading ? <h3 className="counter">{counter}</h3> : <GuestureImage guesture={cpu} status={outcome === 'WIN' ? 'LOST' : (outcome === 'LOST' ? 'WIN' : outcome)} />
            }
          </div>
          </div>

        </div>
        <ul className="tally">
          <li>Win: {wins}</li>
          <li>Lost: {loses}</li>
          <li>Draw: {draws}</li>
        </ul>
      </>
    }
  </div>;
}

export default App;
