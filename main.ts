radio.setFrequencyBand(73)
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
const allIRPins: Array<number> = [Pins.wr, Pins.wl, Pins.r, Pins.l, Pins.c, Pins.trig]
for (let pin of allIRPins) {
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


//



type Protokol = {
    x: number; //smer
    y: number; //rychlost
    //a: boolean; //tlacitko
    //b: boolean; //tlacitko
    //logo: boolean
}

let letter: string = ""
//let btnA: boolean = input.buttonIsPressed(Button.A)
//let btnB: boolean = input.buttonIsPressed(Button.B)


basic.forever( function () {

    let send: Protokol = {
        x: input.acceleration(Dimension.X),
        y: input.acceleration(Dimension.Y),
        //a: btnA,
        //b: btnB,
        //logo: input.logoIsPressed()
    }

    letter = send.x + ";" + send.y + ";"
    radio.sendString(letter)
     
    basic.showIcon(IconNames.Yes)
    basic.pause(10)
})
