export interface DecodedToken {
  userfullname: string;
  username: string;
  sub: number; // ID del usuario
  role: string;
  permissions: string[];
  exp: number; // Tiempo de expiración
  iat: number; // Tiempo de emisión
}
