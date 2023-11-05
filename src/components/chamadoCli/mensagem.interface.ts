export interface Mensagem {
    id: number,
    usuario: string,
    texto: string,
    tipoUsuario: string,
    horaEnvio: string
}

export interface EnvioMsg {
    idUsuario: number,
    idChamado: number,
    texto: string,
    tipoUsuario: string
}