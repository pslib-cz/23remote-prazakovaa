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

type Protokol = {
    x: number;
    y: number;
    a: boolean;
    b: boolean;
    logo: boolean
}

let proto: Protokol
let acko: string = "";
let becko: string = "";
let loogo: string = "";
let letter: string = ""

basic.forever(function() {

acko = "0"
becko = "0"
loogo = "0"

    proto = {
        x: input.acceleration(Dimension.X),
        y: input.acceleration(Dimension.Y),
        a: false,
        b: false,
        logo: false,
    }

if (input.buttonIsPressed(Button.A)) {
    proto.a = true
} else if (input.buttonIsPressed(Button.B)) {
    proto.b = true
}else if (input.logoIsPressed()){
    proto.logo = true
}

basic.pause(500)

encode(proto)

/* OVLADANI
letter = proto.x + ";" + proto.y
radio.sendString(letter)
*/

//AUTONOMNI
radio.sendString(acko + ";" + becko + ";" + loogo)

})


function encode (proto: Protokol) {
    if (proto.a){
        acko = "1"
    }
    
    if (proto.b) {
        becko = "1"
    }

    if (proto.logo) {
        loogo = "1"
    }

    return {
        acko, becko, loogo
    }
}
