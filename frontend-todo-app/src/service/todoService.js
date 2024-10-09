import axios from "axios";

const API_URL = "http://localhost:3000/api/todos";

export const getTodos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
export const addTodo = async (todo) => {
  const response = await axios.post(API_URL, todo);
  return response.data;
};
export const deleteTodo = async (id) => {
  await axios.delete(`${API_URL}/$(id)`);
};
export const updateTodo = async (todo) => {
  const response = await axios.put(`${API_URL}/${todo.id}`, todo);
  return response.data;
};
