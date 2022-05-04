import { axios } from '../../../lib/axios';
import jwt_decode from "jwt-decode";

import { UserResponse } from '../types';

export type LoginCredentialsDTO = {
  email: string;
  password: string;
};

export type AuthUser = {
  id: number;
  email: string;
  name: string;
  roles: string[];
};

export const loginWithEmailAndPassword = async (data: LoginCredentialsDTO): Promise<UserResponse> => {
  const response = await axios.post('/login', data);
  const usr : UserResponse = {
    access_token: response.data.access_token,
    refresh_token: response.data.refresh_token
  }

  return usr;
};

export const getUserProfile = (token: string) : AuthUser => {
  console.log("Token...", token);
  const t = token.split(" ")
  console.log("Token 2...", t);

  const dToken : any = jwt_decode(t[1]);
  const userProfile : AuthUser = {
      id : dToken.sub,
      email: dToken.email,
      name: dToken.name,
      roles: dToken.roles
    }

  return userProfile;
}