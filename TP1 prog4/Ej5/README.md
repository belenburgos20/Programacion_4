## Diagrama correspondiente al ejercicio.
## Este proyecto implementa un sistema de clases en TypeScript usando
![alt text](image.png)

### Incluye:

- Una clase abstracta `Vehiculo`
- Las clases concretas `Auto` y `Moto`
- La interfaz `Electrico`
- Las clases `AutoElectrico` y `MotoElectrica`
- Un archivo `index.ts` para probar todas las clases

---

## Arrancar el proyecto en TypeScript

### 1. Inicializar el proyecto

npm init -y

### 2. Instalar dependencias 

npm i typescript -D
npm i @types/node -D
npm i ts-node -D

### Compilar el proyecto

npx tsc

### Ejecutar

node dist/index.js

*En lugar de compilar y luego correr con Node, se puede ejecutar directamente el .ts*

npx ts-node src/index.ts


