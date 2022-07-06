import { ApiService } from "./api";

class PlayerService {
  #api = new ApiService("https://aerostatbg.ru/api");

  async getTrackList(endpoint: string) {
    try {
      const res = await this.#api.get(endpoint);
      const data = res.rows.map((item: Record<string, unknown>) => {
        return {
          title: item.title,
          audiofile_url: item.audiofile_url,
          date: item.date,
        };
      });
      return data;
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

export const playerService = new PlayerService();
