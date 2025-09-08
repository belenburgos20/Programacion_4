export abstract class Vehiculo {
    protected marca: string;
    protected velocidad: number;
    protected cantidadRuedas: number;
    protected anio: number;

  constructor(marca: string, velocidad:number, cantidadRuedas: number, anio: number) {
    this.marca = marca;
    this.velocidad = 0;
    this.cantidadRuedas = cantidadRuedas;
    this.anio = anio;
  }
  abstract acelerar(): void;
  abstract frenar(): void;

  getInfo(): void {
    console.log(`Marca: ${this.marca}, Velocidad: ${this.velocidad} km/h, Cantidad de Ruedas: ${this.cantidadRuedas} Año: ${this.anio}`);
  }
}