radio.setFrequencyBand(72)
radio.setTransmitPower(5)
radio.setGroup(73)
radio.setTransmitSerialNumber(true)

enum Pins {
    wr = DigitalPin.P8,
    wl = DigitalPin.P12,
    r = DigitalPin.P13,
    l = DigitalPin.P14,
    c = DigitalPin.P15,
    trig = DigitalPin.P2,
    echo = DigitalPin.P1
}

enum ServoDirection {
    Left = 2,
    Center = 1,
    Right = 0
}

/*
const allIRPins: Array<number> = [Pins.wr, Pins.wl, Pins.r, Pins.l, Pins.c, Pins.trig]
or (let pin of allIRPins) {
    pins.setPull(pin, PinPullMode.PullNone);
}

const carMotor = (leftwheel: number = 0, rightwheel: number = 0): void => {
    if (leftwheel === 0 && rightwheel === 0) { PCAmotor.MotorStopAll(); return; }

    //PCAmotor.MotorRun(PCAmotor.Motors.M1, -1 * abrakadabra)
    //PCAmotor.MotorRun(PCAmotor.Motors.M4, -1 * abrakabadra)
}

const servoMove = (direction: ServoDirection): void => {
    PCAmotor.GeekServo(PCAmotor.Servos.S1, 500 + 1000 * direction)
    basic.pause(2000)
    PCAmotor.StopServo(PCAmotor.Servos.S1)
}
*/



type Protocol = {
    x: number; //smer
    y: number; //rychlost
}

let message: string

basic.forever(function () {
    let directionValue = input.acceleration(Dimension.X)
    let speedValue = input.acceleration(Dimension.Y)

    let dataToSend: Protocol = {
        x: directionValue,
        y: speedValue
    }

    let messageParts = [dataToSend.x, dataToSend.y]
    message = messageParts.join(";") + ";"
    radio.sendString(message)

    basic.pause(100)
    basic.showLeds(`
        . # # . .
        . # # # .
        . # # # #
        . # . . .
        . # . . .
    `)
})
