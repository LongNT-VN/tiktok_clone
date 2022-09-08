import { CredentialResponse } from "@react-oauth/google";
import axios from "axios";
import jwt_decode from "jwt-decode";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const createOrGetUser = async (
  response: CredentialResponse,
  addUser: Function
) => {
  const decoded: { name: string; picture: string; sub: string } = jwt_decode(
    String(response.credential)
  );
  const { name, picture, sub } = decoded;
  const user = {
    _id: sub,
    _type: "user",
    userName: name,
    image: picture,
  };
  addUser(user);
  await axios.post(`http://localhost:3000/api/auth`, user);
};
