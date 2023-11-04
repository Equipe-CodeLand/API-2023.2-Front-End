export default interface Token {
    userId: number,
    email: string,
    cargo: string,
    iat: number,
    exp: number
}