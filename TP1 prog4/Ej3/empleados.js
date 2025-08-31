var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Empleado = /** @class */ (function () {
    function Empleado(nombre, sueldoBase) {
        this.nombre = nombre;
        this.sueldoBase = sueldoBase;
    }
    return Empleado;
}());
var EmpleadoJornadaTotal = /** @class */ (function (_super) {
    __extends(EmpleadoJornadaTotal, _super);
    function EmpleadoJornadaTotal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EmpleadoJornadaTotal.prototype.calcularSueldo = function () {
        return this.sueldoBase + 20000;
    };
    return EmpleadoJornadaTotal;
}(Empleado));
var EmpleadoMediaJornada = /** @class */ (function (_super) {
    __extends(EmpleadoMediaJornada, _super);
    function EmpleadoMediaJornada() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EmpleadoMediaJornada.prototype.calcularSueldo = function () {
        return this.sueldoBase * 0.5;
    };
    return EmpleadoMediaJornada;
}(Empleado));
var empleados = [
    new EmpleadoJornadaTotal("Alverto", 50000),
    new EmpleadoMediaJornada("Maxi", 40000),
    new EmpleadoJornadaTotal("Mati", 60000),
    new EmpleadoMediaJornada("Rami", 30000),
];
empleados.forEach(function (empleado) {
    console.log("".concat(empleado.nombre, " gana: $").concat(empleado.calcularSueldo()));
});
