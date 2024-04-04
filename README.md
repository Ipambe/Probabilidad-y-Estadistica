
# Tablas de frecuencia en segundos

El código que contiene este repositorio tiene una clase TablaFrecuencias que proporciona varios cálculos estadísticos para un conjunto de intervalos. He aquí una breve descripción de sus capacidades:
## Creación de la tabla
- Constructor: Acepta una matriz de intervalos y configura la frecuencia acumulada.

```typescript
const intervalos = [
  new Intervalo(20, 30, 20),
  new Intervalo(30, 40, 35),
  new Intervalo(40, 50, 50),
  new Intervalo(50, 60, 45),
  new Intervalo(60, 70, 25),
  new Intervalo(70, 80, 15),
  new Intervalo(80, 90, 6)
]
const tabla = new TablaFrecuencias(intervalos)
```

## Medidas de posición
- Rango: Calcula el rango de los intervalos.
- Amplitud: Calcula la amplitud de los intervalos.
- N: Devuelve la frecuencia total de todos los intervalos.
```typescript
console.log('Rango:', tabla.rango)
console.log('Amplitud:', tabla.amplitud)
console.log('N:', tabla.N)
```

## Medidas de centralización
- Media: Calcula el valor promedio de los intervalos.
- Moda: Determina el valor más frecuente en los intervalos.
- Mediana: Encuentra el valor medio de los intervalos.
```typescript
console.log('Media:', tabla.media)
console.log('Moda:', tabla.moda)
console.log('Mediana:', tabla.mediana)
```
## Medidas de dispersión
- Varianza: Calcula la varianza de los intervalos.
- DesviacionEstandar: Calcula la desviación estándar de los intervalos.
- CoeficienteVariacion: Calcula el coeficiente de variación de los intervalos.
- DesviacionMedia: Calcula la desviación media de los intervalos.
```typescript
console.log('Varianza:', tabla.varianza)
console.log('Desviación estándar:', tabla.desviacionEstandar)
console.log('Coeficiente de variación:', tabla.coeficienteVariacion)
console.log('Desviación media:', tabla.desviacionMedia)
```
## Cuartiles, deciles y percentiles
- Cuartil: Devuelve el cuartil en una posición determinada.
- Decil: Devuelve el decil en una posición determinada.
- Percentil: Devuelve el percentil en una posición determinada.
```typescript
console.log('Cuartil 1:', tabla.cuartil(1))
console.log('Cuartil 2:', tabla.cuartil(2))
console.log('Cuartil 3:', tabla.cuartil(3))
console.log('Decil 1:', tabla.decil(1))
console.log('Decil 2:', tabla.decil(2))
// ...
console.log('Percentil 1:', tabla.percentil(1))
console.log('Percentil 2:', tabla.percentil(2))
// ...
```


## Run Locally

Clona el proyecto

```bash
  git clone https://github.com/Ipambe/Probabilidad-y-Estadistica
```

Muevete a la carpeta del script .js

```bash
  cd compilado
```

Ejecutar el script

```bash
  node Probabilidad_y_estadistica.js
```

