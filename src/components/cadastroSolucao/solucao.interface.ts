export interface Problema {
    tema: {
        id: number;
        nome: string;
    },
    desc: string,
    solucao: Solucao[],
    id: number
}

export interface Solucao {
    id: number,
    desc: string
}

export interface NovaSolucao {
    desc: string
}

export interface Problemas {
    problemas: Problema[]
}

export interface EdicaoProblema {
    desc: string,
    id: number,
    tema: {
        id: number;
        nome: string;
    }
}