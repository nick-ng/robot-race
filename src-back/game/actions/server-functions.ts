import {
  Robot,
  MapItem,
  MainGameState,
  FlagMapItem,
} from "../../../dist-common/game-types";

export const touchCheckpoints = (
  robots: Robot[],
  map: MapItem[][][],
  flagsTouched: MainGameState["flagsTouched"],
  archiveMarkers: MainGameState["archiveMarkers"]
): { playerId: string; mapItems: MapItem[] }[] => {
  const touched: { playerId: string; mapItems: MapItem[] }[] = [];

  for (const robot of robots) {
    const { position, playerId } = robot;

    const mapItems = map[position.y][position.x];

    try {
      if (mapItems.length > 0) {
        touched.push({
          playerId,
          mapItems,
        });

        const flag = mapItems.find((a) => a.type === "flag") as
          | FlagMapItem
          | undefined;
        const currentFlag = flagsTouched[playerId];
        if (flag && flag.number === currentFlag + 1) {
          flagsTouched[playerId] = flag.number;
          archiveMarkers[playerId] = { x: position.x, y: position.y };
        }
      }
    } catch (e) {
      console.error("error in touchCheckpoints", e);
    }
  }

  return touched;
};
