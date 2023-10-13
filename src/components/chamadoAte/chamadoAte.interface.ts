export interface ChamadoAte{
    nome: string,
    tema: string,
    status: {
        id: string,
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