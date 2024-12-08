import React, { useState } from 'react';
import './App.css';
import PinInputBox from './PinInputBox.tsx';

const PIN_LENGTH = 4;

export default function App() {
  const [pin, setPin] = useState<Array<number | undefined>>(new Array(PIN_LENGTH))

  const onPinChanged = (pinEntry: number | null, index: number) => {
    const newPin = [...pin]
    newPin[index] = pinEntry
    setPin(newPin)
  }

  return (
    <div className="App">
      <PinInputBox onPinChanged={onPinChanged} pin={pin} pinLength={PIN_LENGTH} />
    </div>
  );
}