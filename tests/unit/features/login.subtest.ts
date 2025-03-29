import axios from "axios";

export const loginFlow = async (host: string, port: number) => {
  const response = await axios.post(`http://${host}:${port}/login`, {
    email: 'test@test.com',
    password: 'password'
  });
  expect(response.status).toBe(200);
  expect(response.data).toEqual({ token: '1234567890' });
}; 

export const getUsersFlow = async (host: string, port: number) => {
  const response = await axios.get(`http://${host}:${port}/users`);
  expect(response.status).toBe(200);
  expect(response.data).toEqual([]);
};