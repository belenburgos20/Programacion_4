interface Animal {
    RealizarSonido(): void;
    Mover(): void;
}

class Perro implements Animal{
    RealizarSonido(): void {
        console.log("Guau")
    }
    Mover(): void {
        console.log("el perro empieza a correr")
    }
}

const miPerro: Animal = new Perro();
miPerro.RealizarSonido();
miPerro.Mover();