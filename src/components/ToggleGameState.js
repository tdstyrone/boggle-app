import React, {useState} from 'react';
import {GAME_STATE} from '../services/GameState.js';
import { Button, Form, FloatingLabel} from 'react-bootstrap';
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import '../scss/ToggleGameState.scss';

function ToggleGameState({gameState, setGameState, setSize, setTotalTime, setMaxTime, maxTime}) {

  const [buttonText, setButtonText] = useState("Start a new game!");
  const [startTime, setStartTime] = useState(0);
  const [timeSelection, setTimeSelect] = useState(0);
  const [boardSizeSelection, setBoardSizeSelect] = useState(3);
  let deltaTime;

  function updateGameState(endTime) {
    if (gameState === GAME_STATE.BEFORE || gameState === GAME_STATE.ENDED) {
      setStartTime(Date.now());
      setGameState(GAME_STATE.IN_PROGRESS);
      setButtonText("End Game");
    } else if (gameState === GAME_STATE.IN_PROGRESS) {
      deltaTime = (endTime - startTime)/ 1000.0;
      setTotalTime(deltaTime); 
      setGameState(GAME_STATE.ENDED);
      setButtonText("Start a new game!");
    }
  }

  const handleChange = (event) => {
    setBoardSizeSelect(parseInt(event.target.value));
    setSize(parseInt(event.target.value));
  };

  const handleTimeChange = (event) => {
    setTimeSelect(parseInt(event.target.value));
    setMaxTime(parseInt(event.target.value));
  };

  const timerProps = {
    isPlaying: true,
    size: 100,
    strokeWidth: 10
  };

  const renderTime = (dimension, time) => {
    return (
      <div className="time-wrapper">
        <div className="time">{time}</div>
        <div>{dimension}</div>
      </div>
    );
  };

  return (
    <div className="ToggleGameState" >
      <div className="sbcenter">
      { (gameState === GAME_STATE.BEFORE || gameState === GAME_STATE.ENDED) &&
          <FloatingLabel controlId="floatingSelect" label="Game Timer">
            <Form.Select aria-label="Floating label select example" value={timeSelection} onChange={handleTimeChange}>
              <option value="-1">None</option>
              <option value="1">1 minute</option>
              <option value="2">2 minutes</option>
              <option value="3">3 minutes</option>
              <option value="4">4 minutes</option>
              <option value="5">5 minutes</option>
            </Form.Select>
          </FloatingLabel>
        }

        <Button variant="outline-primary" onClick={() => updateGameState(Date.now())} >
          {buttonText}
        </Button>

        { (gameState === GAME_STATE.BEFORE || gameState === GAME_STATE.ENDED) &&
          <FloatingLabel controlId="floatingSelect" label="Size">
            <Form.Select aria-label="Floating label select example" value={boardSizeSelection} onChange={handleChange}>
              <option value="3">3x3</option>
              <option value="4">4x4</option>
              <option value="5">5x5</option>
              <option value="6">6x6</option>
              <option value="7">7x7</option>
              <option value="8">8x8</option>
              <option value="9">9x9</option>
            </Form.Select>
          </FloatingLabel>
        }
      </div>

      <div className="sbcenter">
        { (gameState === GAME_STATE.IN_PROGRESS) && maxTime !== -1 &&
          <CountdownCircleTimer
          {...timerProps}
          duration={maxTime * 60}
          colors={[
            ['#07ad1a', 0.33],
            ['#f7de01', 0.33],
            ['#f00505', 0.33],
          ]}
          onComplete={(totalElapsedTime) => [
            updateGameState(Date.now())
          ]}
          >
          {({ remainingTime }) => renderTime("seconds", remainingTime)}
          </CountdownCircleTimer>
        }
      </div>
    </div>
  );
}

export default ToggleGameState;
