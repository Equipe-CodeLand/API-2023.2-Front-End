import MensagemCli from "./mensagemCli.interface"

export default interface ChamadoCli {
    nome: string,
    tema: string,
    status: {
        id: string,
        texto: string
    },
    hora: string,
    conversa: MensagemCli[]
}