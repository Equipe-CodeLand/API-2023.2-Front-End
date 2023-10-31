export interface ChamadoAte{
    id: number,
    nome: string,
    tema: {
        id: number,
        texto: string
    },
    status: {
        id: number,
        texto: string
    }
    prioridade: {
        id: number,
        value: string
    }
    hora: string,
    descricao: ChamadoAteDetalhes[]

}

export interface ChamadoAteDetalhes {
    open: any
    email: string,
    desc: string,
    nome: string
}