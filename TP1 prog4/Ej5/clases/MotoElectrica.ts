import { Moto } from "./Moto";
import { Electrico } from "../interface/Electrico";

export class MotoElectrica extends Moto implements Electrico {
  private nivelBateria: number = 100;

  constructor(marca: string, velocidad: number, cantidadRuedas: number, anio: number, cilindrada: number) {
    super(marca, velocidad, cantidadRuedas, anio, cilindrada);
  }

  cargarBateria(): number {
    this.nivelBateria = 100;
    console.log("Batería de la moto cargada al 100%");
    return this.nivelBateria;
  }

  verNivelBateria(): number {
    console.log(`Nivel de batería de la moto: ${this.nivelBateria}%`);
    return this.nivelBateria;
  }
}
