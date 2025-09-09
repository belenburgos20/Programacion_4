import { Auto } from "./clases/Auto";
import { Moto } from "./clases/Moto";
import { AutoElectrico } from "./clases/AutoElectrico";
import { MotoElectrica } from "./clases/MotoElectrica";


const ford = new Auto("Ford", 0, 4, 2025, 4);
console.log("- AUTO -");
ford.acelerar();
ford.frenar();
console.log(ford.getInfo());


const yamaha = new Moto("Yamaha", 0, 2, 2024, 150);
console.log("- MOTO -");
yamaha.acelerar();
yamaha.frenar();
console.log(yamaha.getInfo());


const tesla = new AutoElectrico("Tesla", 0, 4, 2025, 4);
console.log("- AUTO ELECTRICO -");
tesla.acelerar();
tesla.verNivelBateria();
tesla.cargarBateria();
console.log(tesla.getInfo());

const zero = new MotoElectrica("Zero", 0, 2, 2023, 350);
console.log("- MOTO ELECTRICA -");
zero.acelerar();
zero.verNivelBateria();
zero.cargarBateria();
console.log(zero.getInfo());
