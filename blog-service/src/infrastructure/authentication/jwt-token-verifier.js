import jwt from 'jsonwebtoken';
export class JwtTokenVerifier { constructor({ secret }) { this.secret = secret; } verify(token) { return jwt.verify(token, this.secret); } }
