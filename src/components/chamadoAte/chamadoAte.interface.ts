export interface ChamadoAte{
    id: number,
    nome: string,
    tema: string,
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
    email: string,
    desc: string,
    nome: string
}