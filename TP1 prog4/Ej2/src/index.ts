// Clase Abstracta - Implementar el método calcularArea() usando la fórmula del área de cada uno.

abstract class Figura {
    abstract calcularArea(): number;
}

class Circulo extends Figura {
    private radio: number;
    constructor(radio: number) {
        super();
        this.radio = radio;
    }
    calcularArea(): number {
        return Math.PI * Math.pow(this.radio, 2);
    }
}

class Rectangulo extends Figura {
    private base: number;
    private altura: number;
    constructor(base: number, altura: number) {
        super();
        this.base = base;
        this.altura = altura;
    }
    calcularArea(): number {
        return this.base * this.altura;
    }
}

class Triangulo extends Figura {
    private base: number;
    private altura: number;
    constructor(base: number, altura: number) {
        super();
        this.base = base;
        this.altura = altura;
    }
    calcularArea(): number {
        return (this.base * this.altura) / 2;
    }
}

// Ejemplo
const figuras: Figura[] = [
    new Circulo(5),
    new Rectangulo(4, 6),
    new Triangulo(3, 7)
];
figuras.forEach(figura => {
    console.log(`Área: ${figura.calcularArea()}`);
});

