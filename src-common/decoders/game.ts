import { GameData } from "../game-types";

export const decodeGameData = (data: any): GameData | null => {
  if (
    typeof data !== "object" ||
    typeof data.id !== "string" ||
    typeof data.host !== "string" ||
    typeof data.maxPlayers !== "number" ||
    !Array.isArray(data.players) ||
    typeof data.gameSettings !== "object" ||
    typeof data.gameSecrets !== "object" ||
    typeof data.gameState !== "object"
  ) {
    return null;
  }

  return data;
};
