export class ApiService {
  #base;

  constructor(baseUrl = "http://localhost:3000") {
    this.#base = baseUrl;
  }

  async get(endpoint: string) {
    try {
      const res = await fetch(`${this.#base}${endpoint}`);
      if (res.status === 200) {
        const data = res.json();
        return data;
      } else {
        throw "Ошибка загрузки плейлиста";
      }
    } catch (error) {
      let message;
      if (error instanceof Error) {
        message = error.message;
      } else {
        message = String(error);
      }
      throw new Error(message);
    }
  }
}
