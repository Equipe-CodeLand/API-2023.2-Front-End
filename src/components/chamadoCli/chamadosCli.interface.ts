export interface ChamadoCli {
    id: number,
    nome: string,
    tema: {
        id:number,
        texto: string
    },
    status: {
        id: string,
        texto: string
    }
    hora: string,
    descricao: ChamadoCliDetalhes[]
}

export interface ChamadoCliDetalhes {
    remetente: string,
    texto: string,
    role: string
}