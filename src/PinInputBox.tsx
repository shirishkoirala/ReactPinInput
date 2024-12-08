import React, { useRef } from 'react'

type PinInputBoxProps = {
    pin: Array<number | undefined>;
    pinLength: number;
    onPinChanged: (pinEntry: number | null, index: number) => void;
}

const PIN_MIN_VALUE = 0
const PIN_MAX_VALUE = 9

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
    return (
        <>{
            Array.from({ length: pinLength }, (_, index) => {
                return <input ref={
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

