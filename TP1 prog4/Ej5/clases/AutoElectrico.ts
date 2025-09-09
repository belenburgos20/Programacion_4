import { Auto } from "./Auto";
import { Electrico } from "../interface/Electrico";

export class AutoElectrico extends Auto implements Electrico {
  private nivelBateria: number = 100;

  constructor(marca: string, velocidad: number, cantidadRuedas: number, anio: number, cantidadPuertas: number) {
    super(marca, velocidad, cantidadRuedas, anio, cantidadPuertas);
  }

  cargarBateria(): number {
    this.nivelBateria = 100;
    console.log("Batería del auto cargada al 100%");
    return this.nivelBateria;
  }

  verNivelBateria(): number {
    console.log(`Nivel de batería del auto: ${this.nivelBateria}%`);
    return this.nivelBateria;
  }
}
