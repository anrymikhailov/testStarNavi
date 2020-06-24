export class GameApi {
  static winnersUrl =
    "https://starnavi-frontend-test-task.herokuapp.com/winners";
  static presetsUrl =
    "https://starnavi-frontend-test-task.herokuapp.com/game-settings";

  static get = async endpoint => {
    try {
      let response = await fetch(endpoint);
      return await response.json();
    } catch (error) {
      GameApi.showError(error);
    }
  };

  static post = async (endpoint, data) => {
    try {
      await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      GameApi.showError(error);
    }
  };

  static getGamePresets = async () => GameApi.get(GameApi.presetsUrl);
  static getGameWinners = async () => GameApi.get(GameApi.winnersUrl);
  static saveWinner = async data => GameApi.post(GameApi.winnersUrl, data);
  static showError(error) {
    console.log("error", error);
    throw new Error("Network Error");
  }
}
