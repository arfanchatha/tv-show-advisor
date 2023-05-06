import axios from "axios";
import { FAKE_POPULARS, FAKE_RECOMENDATIONS } from "./fake_data";
import { Base_URL, API_Key_Param } from "../config";

export class TVShowAPI {
  static async fetchPopulars() {
    const response = await axios.get(`${Base_URL}tv/popular${API_Key_Param}`);
    console.log(response.data.results);
    return response.data.results;
    // return FAKE_POPULARS;
  }

  static async fetchRecomendations(tvShowId) {
    const response = await axios.get(
      `${Base_URL}tv/${tvShowId}/recommendations${API_Key_Param}`
    );
    return response.data.results;

    // return FAKE_RECOMENDATIONS;
  }
}
