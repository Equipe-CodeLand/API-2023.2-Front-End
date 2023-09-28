import Mensagem from "./mensagem.interface"

export default interface Chamado {
    nome: string,
    tema: string,
    status: {
        id: string,
        texto: string
    },
    hora: string,
    conversa: Mensagem[]
}