import type { User, UserLogin } from '../../../models/User'
import { z } from 'zod'

import axios, { type AxiosResponse } from 'axios';
import type { AuthResponse } from '../../../models';

const baseUrl = import.meta.env.BACKEND_URL + '/user';

export async function getUserByUsernamr(username: string, signal: AbortSignal): Promise<AxiosResponse<User>> {

  return axios.get(`${baseUrl}/${username}`);

}
export async function getUsers(signal: AbortSignal): Promise<AxiosResponse<User[]>> {
  return axios.get(`${baseUrl}`, { signal });
}
export async function createUser<User>(user: User): Promise<void> {
  axios.post(`${baseUrl}/create`);
}

export async function deleteUser<User>(user: User): Promise<void> {
  axios.delete(`${baseUrl}/delete`)
}

export async function loginUser<AuthResponse, UserLogin>(user: UserLogin): Promise<AxiosResponse<AuthResponse>> {
  return axios.post(`${baseUrl}/login`);
}

export async function logoutUser(): Promise<void> {

}
