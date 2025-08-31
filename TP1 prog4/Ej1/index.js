var Perro = /** @class */ (function () {
    function Perro() {
    }
    Perro.prototype.RealizarSonido = function () {
        console.log("Guau");
    };
    Perro.prototype.Mover = function () {
        console.log("el perro empieza a correr");
    };
    return Perro;
}());
var miPerro = new Perro();
miPerro.RealizarSonido();
miPerro.Mover();
