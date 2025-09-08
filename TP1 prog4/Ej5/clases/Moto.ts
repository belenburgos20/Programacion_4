import {Vehiculo} from "./Vehiculo";

export class Moto extends Vehiculo {
  protected cilindrada: number;

  constructor(marca: string, velocidad:number, cantidadRuedas: number, anio: number, cilindrada: number) {
    super(marca, velocidad, cantidadRuedas, anio);
    this.cilindrada = cilindrada;
  }

  acelerar(): void {
    this.velocidad +=10;
    console.log(`La moto acelera a ${this.velocidad} km/h`);
}
  frenar(): void {
    this.velocidad -=10;
    if (this.velocidad < 0) {
      this.velocidad = 0;
    }
    console.log(`La moto frena a  ${this.velocidad} km/h`);
  }
}