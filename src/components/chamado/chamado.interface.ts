import Mensagem from "./mensagem.interface"

export default interface Chamado {
    id: number,
    nome: string,
    tema: string,
    status: {
        id: string,
        texto: string
    },
    hora: string,
    email: string,
    conversa: Mensagem[],
    descricao: string
}