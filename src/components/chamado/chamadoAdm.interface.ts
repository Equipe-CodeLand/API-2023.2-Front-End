export interface ChamadoAdm {
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
    conversa: ChamadoAdmDetalhes[]
}

export interface ChamadoAdmDetalhes {
    email: string,
    msg: string,
    nome: string,
}