import { Map, MapItem } from "./game-types";

interface MapWithValidation {
  map: Map;
  fixedMap: Map;
  warnings: string[];
  errors: string[];
}

const IMPASSABLE_ITEMS: MapItem["type"][] = ["pit"];

const toMapWithValidation = (map: Map): MapWithValidation => ({
  map,
  fixedMap: map,
  warnings: [],
  errors: [],
});

const getInboundsItems = (
  items: MapItem[],
  width: number,
  height: number
): MapItem[] =>
  items.filter((mi) => mi.x >= 0 && mi.x < width && mi.y >= 0 && mi.y < height);

const getInboundsItemsOfType = (
  itemType: MapItem["type"],
  items: MapItem[],
  width: number,
  height: number
): MapItem[] =>
  getInboundsItems(items, width, height).filter((mi) => mi.type === itemType);

const itemsOnImpassable = (
  itemsToCheck: MapItem[],
  items: MapItem[]
): boolean => {
  return itemsToCheck.some((i) => {
    const itemsOnSameGrid = items.filter(
      (ii) => IMPASSABLE_ITEMS.includes(ii.type) && ii.x === i.x && ii.y === i.y
    );

    return itemsOnSameGrid.length > 0;
  });
};

const checkDockBays = ({
  map,
  fixedMap,
  warnings,
  errors,
}: MapWithValidation): MapWithValidation => {
  const { items, width, height } = map;
  const newErrors: string[] = [];

  const inBoundsDockBays = getInboundsItemsOfType("dock", items, width, height);
  if (inBoundsDockBays.length !== 8) {
    newErrors.push("Map must have exactly 8 Dock Bays");
  }

  if (itemsOnImpassable(inBoundsDockBays, items)) {
    newErrors.push(
      `Dock can't be on impassable tiles (${IMPASSABLE_ITEMS.map(
        (a) => `${a}s`
      ).join(", ")})`
    );
  }

  return {
    map,
    fixedMap,
    warnings,
    errors: errors.concat(newErrors),
  };
};

const checkFlags = ({
  map,
  fixedMap,
  warnings,
  errors,
}: MapWithValidation): MapWithValidation => {
  const { items, width, height } = map;
  const newErrors: string[] = [];

  const inBoundsFlags = getInboundsItemsOfType("flag", items, width, height);

  if (inBoundsFlags.length === 0) {
    newErrors.push("Map must have at least 1 Flag");
  }

  if (itemsOnImpassable(inBoundsFlags, items)) {
    newErrors.push(
      `Flags can't be on impassable tiles (${IMPASSABLE_ITEMS.map(
        (a) => `${a}s`
      ).join(", ")})`
    );
  }

  return {
    map,
    fixedMap,
    warnings,
    errors: errors.concat(newErrors),
  };
};

const checkOutOfBoundsItems = ({
  map,
  fixedMap,
  warnings,
  errors,
}: MapWithValidation): MapWithValidation => {
  const { items, width, height } = map;
  const newWarnings: string[] = [];

  const allInBoundsItems = getInboundsItems(items, width, height);
  if (allInBoundsItems.length !== items.length) {
    newWarnings.push("Some items are ouside the map area.");
  }

  const newFixedItems = getInboundsItems(
    fixedMap.items,
    fixedMap.width,
    fixedMap.height
  );

  return {
    map,
    fixedMap: { ...fixedMap, items: newFixedItems },
    warnings: warnings.concat(newWarnings),
    errors,
  };
};

const reindexMapItems = ({
  map,
  fixedMap,
  warnings,
  errors,
}: MapWithValidation): MapWithValidation => {
  let flagCounter = 1;
  let dockCounter = 1;
  const itemsWithIds = fixedMap.items.map((item, id) => {
    const fullItem = { ...item, id };

    if (item.type === "flag") {
      return {
        ...fullItem,
        number: flagCounter++,
      };
    }

    if (item.type === "dock") {
      return {
        ...fullItem,
        number: dockCounter++,
      };
    }

    return fullItem;
  });

  return {
    map,
    fixedMap: { ...fixedMap, items: itemsWithIds },
    warnings,
    errors,
  };
};

export const mapValidator = (map: Map) => {
  return [
    checkDockBays,
    checkFlags,
    checkOutOfBoundsItems,
    reindexMapItems,
  ].reduce((prev, curr) => {
    return curr(prev);
  }, toMapWithValidation(map));
};
