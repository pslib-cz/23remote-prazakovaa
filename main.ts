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


type Protokol = {
    x: number;
    y: number;
    a: boolean;
    b: boolean;
    ab: boolean;
    logo: boolean;
    stop: boolean
}

let proto: Protokol
let acko: string = "";
let becko: string = "";
let aB: string = "";
let loogo: string = "";
let logoo: string = "";
let letter: string = "";


basic.forever(function() {

acko = "0"
becko = "0"
aB = "0"
loogo = "0"
logoo = "0"

    proto = {
        x: input.acceleration(Dimension.X),
        y: input.acceleration(Dimension.Y),
        a: input.buttonIsPressed(Button.A),
        b: input.buttonIsPressed(Button.B),
        ab: input.buttonIsPressed(Button.AB),
        logo: input.logoIsPressed(),
        stop: input.isGesture(Gesture.ScreenDown)
    }

basic.pause(100)
encode(proto)

/* OVLADANI
letter = proto.x + ";" + proto.y
radio.sendString(letter)
*/

//AUTONOMNI
letter = acko + ";" + becko + ";" + aB + ";" + loogo + ";" + logoo
radio.sendString(letter)
basic.showIcon(IconNames.Tortoise)

})


function encode (proto: Protokol) {
    if (proto.ab){
        aB = "1"
    }
    else if (proto.b) {
        becko = "1"
    }
    else if (proto.a) {
        acko = "1"
    }
    else if (proto.logo) {
        loogo = "1"
    }
    else if (proto.stop){
        logoo = "1"
    }

    return {
        acko, becko, aB, loogo, logoo
    }
}
