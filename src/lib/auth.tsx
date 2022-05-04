import * as React from 'react';
import { initReactQueryAuth } from 'react-query-auth';
import { Spinner } from "../components/Elements";

import {
getUserProfile,
  loginWithEmailAndPassword,
  UserResponse,
  LoginCredentialsDTO,
  AuthUser,
} from '../features/auth';
import storage from '../utils/storage';

async function handleUserResponse(data: UserResponse) {
	const { access_token } = data;
	storage.setToken(access_token);
	return getUserProfile(access_token);
}

async function loadUser() {
	if (storage.getToken()) {
	  return getUserProfile(storage.getToken());
	}
	return null;
  }

async function loginFn(data: LoginCredentialsDTO) {
	const response = await loginWithEmailAndPassword(data);
	const user = await handleUserResponse(response);
	return user;
}

async function registerFn(data: LoginCredentialsDTO) {
	const response = await loginWithEmailAndPassword(data);
	const user = await handleUserResponse(response);
	return user;
  }

async function logoutFn() {
	storage.clearToken();
	window.location.assign(window.location.origin as unknown as string);
}

const authConfig = {
	loadUser,
	loginFn,
	registerFn,
	logoutFn,
	LoaderComponent() {
	  return (
		  <Spinner />
	  );
	},
};

export const { AuthProvider, useAuth } = initReactQueryAuth<
	AuthUser,
	unknown,
	LoginCredentialsDTO,
	LoginCredentialsDTO
>(authConfig);