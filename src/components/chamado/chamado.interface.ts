import { Mensagem } from "./mensagem.interface"

export default interface Chamado {
    id: number,
    nome: string,
    tema: {
        id: number,
        texto: string
    },
    status: {
        id: number,
        texto: string
    },
    prioridade: {
        id: number,
        value: string
    },
    hora: string,
    email: string,
    descricao: string
}