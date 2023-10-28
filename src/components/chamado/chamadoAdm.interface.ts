export interface ChamadoAdm {
    id: number
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
    }
    hora: string,
    conversa: ChamadoAdmDetalhes[]
}

export interface ChamadoAdmDetalhes {
    id:number
    email: string,
    msg: string,
    nome: string,
}