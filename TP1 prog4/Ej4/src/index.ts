interface Volador{
    volar(): void;
}
abstract class Animal{
    constructor(
        public nombre: string
    )
    {
        this.nombre = nombre;
    }
    abstract hacerSonido(): void;
}
class Pajaro extends Animal implements Volador{
    public especie: string;
    constructor(
        nombre: string,
        especie: string
    ){
        super(nombre);
        this.especie = especie;
    }
    hacerSonido(): void {
        console.log(`${this.nombre} es un ${this.especie} y está piando`);
    }
    volar(): void {
        console.log(`${this.nombre} es un ${this.especie} y está volando`);
    }
}
class Zorro extends Animal{
    public especie: string;
    constructor(
        nombre: string,
        especie: string
    ){
        super(nombre);
        this.especie = especie;
    }
    hacerSonido(): void {
        console.log(`${this.nombre} es un zorro ${this.especie} y está gruñendo`);
    }
}

const pajaro = new Pajaro("Carlos", "Hornero");
pajaro.hacerSonido();
pajaro.volar();
const zorro = new Zorro("Don Diego de la Vega", "Gris");
zorro.hacerSonido();