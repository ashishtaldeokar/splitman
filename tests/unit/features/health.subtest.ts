import axios from "axios";

export const healthCheck = async (host: string, port: number) => {
  const response = await axios.get(`http://${host}:${port}/health`);
  expect(response.status).toBe(200);
  expect(response.data).toEqual({ status: 'ok' });
}; 