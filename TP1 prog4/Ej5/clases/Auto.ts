import { Vehiculo } from "./Vehiculo";

export class Auto extends Vehiculo {
  protected cantidadPuertas: number;

    constructor(marca: string, velocidad:number, cantidadRuedas: number, anio: number, cantidadPuertas: number) {
    super(marca, velocidad, cantidadRuedas, anio);
    this.cantidadPuertas = cantidadPuertas;
  }
    acelerar(): void {
        this.velocidad += 20;
        console.log(`El auto acelera a ${this.velocidad} km/h`);
    }

    frenar(): void {
        this.velocidad -= 10;
        if (this.velocidad < 0) {
            this.velocidad = 0;
        }
        console.log(`El auto frena a ${this.velocidad} km/h`);
    }
}
