export interface JwtPayloadType {
  id: string;
  role: "admin" | "employer" | "user";
}