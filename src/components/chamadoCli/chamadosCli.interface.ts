export interface ChamadoCli {
    nome: string,
    tema: string,
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