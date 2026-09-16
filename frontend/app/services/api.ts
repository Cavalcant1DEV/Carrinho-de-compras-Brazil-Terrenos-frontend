import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080/api/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const message =
        error.response?.data?.message ?? "Ocorreu um erro inesperado.";

      switch (status) {
        case 400:
          console.error("Requisição inválida:", message);
          break;

        case 404:
          console.error("Recurso não encontrado:", message);
          break;

        case 500:
          console.error("Erro interno do servidor.");
          break;

        default:
          console.error("Erro na requisição:", message);
      }
    }

    return Promise.reject(error);
  },
);
