abstract class Empleado {
    constructor(public nombre: string, public sueldoBase: number) {}
    abstract calcularSueldo(): number;
}

class EmpleadoJornadaTotal extends Empleado {
    calcularSueldo(): number {
        return this.sueldoBase + 20000;
    }
}

class EmpleadoMediaJornada extends Empleado{
    calcularSueldo(): number {
        return this.sueldoBase * 0.5;
    }
}

const empleados: Empleado[] = [
    new EmpleadoJornadaTotal("Alverto", 50000),
    new EmpleadoMediaJornada("Maxi" , 40000),
    new EmpleadoJornadaTotal("Mati", 60000),
    new EmpleadoMediaJornada("Rami", 30000),
];

empleados.forEach((empleado) => {
    console.log(`${empleado.nombre} gana: $${empleado.calcularSueldo()}`)
});