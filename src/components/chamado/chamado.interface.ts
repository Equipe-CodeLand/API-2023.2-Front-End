import Mensagem from "./mensagem.interface"

export default interface Chamado {
    id: number,
    nome: string,
    tema: string,
    status: {
        id: string,
        texto: string
    },
    prioridade: {
        id: number,
        value: string
    }
    hora: string,
    email: string,
    descricao: string
}