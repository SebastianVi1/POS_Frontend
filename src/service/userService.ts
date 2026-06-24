import type User from '../models/User.ts'

import axios, { type AxiosResponse } from 'axios';

const baseUrl = import.meta.env.BACKEND_URL + '/user';

async function getUserByUsernamr(username: string, signal: AbortSignal): Promise<AxiosResponse<User>> {

  return axios.get(`${baseUrl}/${username}`);

}
async function getUsers(signal: AbortSignal): Promise<AxiosResponse<User[]>> {
  return axios.get(`${baseUrl}`, { signal });
}
async function createUser<User>(user: User): Promise<void> {
  axios.post(`${baseUrl}/create`);
}

async function deleteUser<User>(user: User): Promise<void> {
  axios.delete(`${baseUrl}/delete`)
}



