import React, { useRef } from 'react'

type PinInputBoxProps = {
    pin: Array<number | undefined>;
    pinLength: number;
    onPinChanged: (pinEntry: number | null, index: number) => void;
}

const PIN_MIN_VALUE = 0
const PIN_MAX_VALUE = 9
const BACKSPACE_KEY = "Backspace"

export default function PinInputBox({ pin, pinLength, onPinChanged }): PinInputBoxProps {
    const inputRefs = useRef<HTMLInputElement[]>({})
    const changePinFocus = (pinIndex: number) => {
        const ref = inputRefs.current[pinIndex]
        if (ref) {
            ref.focus()
        }
    }
    const onChanged = (event, index) => {
        const value = event.target.value;
        const pinNumber = Number(value.trim())

        if (isNaN(pinNumber) || value.length === 0) {
            return
        }
        if (pinNumber >= PIN_MIN_VALUE && pinNumber <= PIN_MAX_VALUE) {
            console.log(pinNumber)
            onPinChanged(pinNumber, index)
            if (index < pinLength - 1) {
                changePinFocus(index + 1)
            }
        }
    }

    const onKeyDown = (event, index) => {
        const keyboardKeyCode = event.nativeEvent.code;
        if (keyboardKeyCode !== BACKSPACE_KEY) {
            return
        }
        if (pin[index] === undefined) {
            changePinFocus(index - 1)
        } else {
            onPinChanged(undefined, index)
        }
    }
    return (
        <>{
            Array.from({ length: pinLength }, (_, index) => {
                return <input
                    onKeyDown={(event) => onKeyDown(event, index)}
                    key={`pin_input_${index}`}
                    ref={
                        el => {
                            if (el) {
                                inputRefs.current[index] = el;
                            }
                        }
                    } onChange={(event) => onChanged(event, index)} value={pin[index]} />
            })
        }</>
    );
}

