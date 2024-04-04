"use strict";
class Intervalo {
    constructor(li, ls, fi) {
        if (li >= ls) {
            throw new Error('El límite inferior debe ser menor que el límite superior');
        }
        if (fi < 0) {
            throw new Error('La frecuencia no puede ser negativa');
        }
        this._limite_inferior = li;
        this._limite_superior = ls;
        this._marca_de_clase = (li + ls) / 2;
        this._frecuencia = fi;
        this._frecuencia_acumulada = 0;
        this._frecuencia_POR_marca_de_clase = fi * this._marca_de_clase;
    }
    get limite_inferior() {
        return this._limite_inferior;
    }
    get limite_superior() {
        return this._limite_superior;
    }
    get marca_de_clase() {
        return this._marca_de_clase;
    }
    get frecuencia() {
        return this._frecuencia;
    }
    get frecuencia_acumulada() {
        return this._frecuencia_acumulada;
    }
    setFrecuenciaAcumulada(fa) {
        this._frecuencia_acumulada = fa;
    }
    get frecuencia_POR_marca_de_clase() {
        return this._frecuencia_POR_marca_de_clase;
    }
}
class TablaFrecuencias {
    constructor(intervalos) {
        this.intervalos = intervalos;
        this.configurarFrecuenciaAcumulada();
    }
    configurarFrecuenciaAcumulada() {
        this.intervalos.reduce((acc, i) => (i.setFrecuenciaAcumulada(acc + i.frecuencia), i.frecuencia_acumulada), 0);
    }
    get rango() {
        const max = Math.max(...this.intervalos.map((i) => i.limite_superior));
        const min = Math.min(...this.intervalos.map((i) => i.limite_inferior));
        return max - min;
    }
    get amplitud() {
        return (this.intervalos[0].limite_superior - this.intervalos[0].limite_inferior);
    }
    get N() {
        return this.intervalos.reduce((acc, i) => acc + i.frecuencia, 0);
    }
    get media() {
        const sumatoria = this.intervalos.reduce((acc, i) => acc + i.frecuencia_POR_marca_de_clase, 0);
        const n = this.intervalos.reduce((acc, i) => acc + i.frecuencia, 0);
        return sumatoria / n;
    }
    get moda() {
        const maxFrecuencia = Math.max(...this.intervalos.map((i) => i.frecuencia)); // --> encuentra la frecuencia máxima
        const intervaloModa = this.intervalos.find((i) => i.frecuencia === maxFrecuencia); // --> encuentra el intervalo con la frecuencia máxima
        if (!intervaloModa)
            throw new Error('No se ha encontrado la moda');
        const i = this.intervalos.indexOf(intervaloModa); // --> encuentra la posición del intervalo con la frecuencia máxima
        const f0 = i === 0 ? 0 : this.intervalos[i - 1].frecuencia;
        const f1 = intervaloModa.frecuencia;
        const f2 = i === this.intervalos.length - 1 ? 0 : this.intervalos[i + 1].frecuencia;
        const h = this.amplitud;
        const moda = intervaloModa.limite_inferior + (h * (f1 - f0)) / (f1 - f0 + (f1 - f2));
        return moda;
    }
    get mediana() {
        const posicionMediana = this.N / 2;
        const intervaloMediana = this.intervalos.find((i) => i.frecuencia_acumulada >= posicionMediana);
        if (!intervaloMediana)
            throw new Error('No se ha encontrado la mediana');
        const i = this.intervalos.indexOf(intervaloMediana);
        const li = intervaloMediana.limite_inferior;
        const N2 = this.N / 2;
        const i_ant = i === 0 ? 0 : this.intervalos[i - 1].frecuencia_acumulada;
        const fi = intervaloMediana.frecuencia;
        const amplitud = this.amplitud;
        const mediana = li + ((N2 - i_ant) / fi) * amplitud;
        return mediana;
    }
    get varianza() {
        const sumatoria = this.intervalos.reduce((acc, i) => acc + i.frecuencia_POR_marca_de_clase, 0);
        const n = this.intervalos.reduce((acc, i) => acc + i.frecuencia, 0);
        const media = sumatoria / n;
        const sumatoriaVarianza = this.intervalos.reduce((acc, i) => acc + i.frecuencia * Math.pow(i.marca_de_clase - media, 2), 0);
        return sumatoriaVarianza / n;
    }
    get desviacionEstandar() {
        return Math.sqrt(this.varianza);
    }
    get coeficienteVariacion() {
        return (this.desviacionEstandar / this.media) * 100;
    }
    get desviacionMedia() {
        const sumatoria = this.intervalos.reduce((acc, i) => acc + i.frecuencia_POR_marca_de_clase, 0);
        const n = this.intervalos.reduce((acc, i) => acc + i.frecuencia, 0);
        const media = sumatoria / n;
        const sumatoriaDesviacionMedia = this.intervalos.reduce((acc, i) => acc + i.frecuencia * Math.abs(i.marca_de_clase - media), 0);
        return sumatoriaDesviacionMedia / n;
    }
    cuartil(pos) {
        const Nq = (this.N * pos) / 4;
        const intervaloCuartil = this.intervalos.find((i) => i.frecuencia_acumulada >= Nq);
        if (!intervaloCuartil)
            throw new Error('No se ha encontrado el cuartil');
        const i = this.intervalos.indexOf(intervaloCuartil);
        const li = intervaloCuartil.limite_inferior;
        const i_ant = i === 0 ? 0 : this.intervalos[i - 1].frecuencia_acumulada;
        const fi = intervaloCuartil.frecuencia;
        const amplitud = this.amplitud;
        return li + ((Nq - i_ant) / fi) * amplitud;
    }
    decil(pos) {
        const Nd = (this.N * pos) / 10;
        const intervaloCuartil = this.intervalos.find((i) => i.frecuencia_acumulada >= Nd);
        if (!intervaloCuartil)
            throw new Error('No se ha encontrado el cuartil');
        const i = this.intervalos.indexOf(intervaloCuartil);
        const li = intervaloCuartil.limite_inferior;
        const i_ant = i === 0 ? 0 : this.intervalos[i - 1].frecuencia_acumulada;
        const fi = intervaloCuartil.frecuencia;
        const amplitud = this.amplitud;
        return li + ((Nd - i_ant) / fi) * amplitud;
    }
    percentil(pos) {
        const Np = (this.N * pos) / 100;
        const intervaloCuartil = this.intervalos.find((i) => i.frecuencia_acumulada >= Np);
        if (!intervaloCuartil)
            throw new Error('No se ha encontrado el cuartil');
        const i = this.intervalos.indexOf(intervaloCuartil);
        const li = intervaloCuartil.limite_inferior;
        const i_ant = i === 0 ? 0 : this.intervalos[i - 1].frecuencia_acumulada;
        const fi = intervaloCuartil.frecuencia;
        const amplitud = this.amplitud;
        return li + ((Np - i_ant) / fi) * amplitud;
    }
}
const intervalos = [
    // dato1 = Limite inferior
    // dato2 = Limite superior
    // dato3 = Frecuencia
    new Intervalo(20, 30, 20),
    new Intervalo(30, 40, 35),
    new Intervalo(40, 50, 50),
    new Intervalo(50, 60, 45),
    new Intervalo(60, 70, 25),
    new Intervalo(70, 80, 15),
    new Intervalo(80, 90, 6)
];
const tabla = new TablaFrecuencias(intervalos);
// Medidas de posición
console.log('Rango:', tabla.rango);
console.log('Amplitud:', tabla.amplitud);
console.log('N:', tabla.N);
// Medidas de centralización
console.log('Media:', tabla.media);
console.log('Moda:', tabla.moda);
console.log('Mediana:', tabla.mediana);
// Medidas de dispersión
console.log('Varianza:', tabla.varianza);
console.log('Desviación estándar:', tabla.desviacionEstandar);
console.log('Coeficiente de variación:', tabla.coeficienteVariacion);
console.log('Desviación media:', tabla.desviacionMedia);
// Cuartiles, deciles y percentiles
console.log('Cuartil 1:', tabla.cuartil(1));
console.log('Cuartil 2:', tabla.cuartil(2));
console.log('Cuartil 3:', tabla.cuartil(3));
console.log('Decil 1:', tabla.decil(1));
console.log('Decil 2:', tabla.decil(2));
// ...
console.log('Percentil 1:', tabla.percentil(1));
console.log('Percentil 2:', tabla.percentil(2));
// ...
