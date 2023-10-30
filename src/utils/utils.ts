import { jwtDecode } from "jwt-decode";

export function decodeJWT(data: string) {
    const decodedToken = jwtDecode(data);
    return decodedToken
  }