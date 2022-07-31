import type { Map } from "../game-types";

const map: Map = {
  name: "Bloodbath Chess",
  height: 16,
  width: 12,
  items: [
    {
      type: "curved-conveyor",
      direction: "up",
      fromDirection: ["right"],
      showStraignt: false,
      speed: 2,
      x: 1,
      y: 10,
      id: 0,
    },
    {
      type: "curved-conveyor",
      direction: "right",
      fromDirection: ["down"],
      showStraignt: false,
      speed: 2,
      x: 1,
      y: 1,
      id: 1,
    },
    {
      type: "curved-conveyor",
      direction: "down",
      fromDirection: ["left"],
      showStraignt: false,
      speed: 2,
      x: 10,
      y: 1,
      id: 2,
    },
    {
      type: "curved-conveyor",
      direction: "left",
      fromDirection: ["up"],
      showStraignt: false,
      speed: 2,
      x: 10,
      y: 10,
      id: 3,
    },
    {
      type: "straight-conveyor",
      direction: "up",
      speed: 2,
      x: 1,
      y: 9,
      id: 4,
    },
    {
      type: "straight-conveyor",
      direction: "up",
      speed: 2,
      x: 1,
      y: 8,
      id: 5,
    },
    {
      type: "straight-conveyor",
      direction: "up",
      speed: 2,
      x: 1,
      y: 7,
      id: 6,
    },
    {
      type: "straight-conveyor",
      direction: "up",
      speed: 2,
      x: 1,
      y: 6,
      id: 7,
    },
    {
      type: "straight-conveyor",
      direction: "up",
      speed: 2,
      x: 1,
      y: 5,
      id: 8,
    },
    {
      type: "straight-conveyor",
      direction: "up",
      speed: 2,
      x: 1,
      y: 4,
      id: 9,
    },
    {
      type: "straight-conveyor",
      direction: "up",
      speed: 2,
      x: 1,
      y: 3,
      id: 10,
    },
    {
      type: "straight-conveyor",
      direction: "up",
      speed: 2,
      x: 1,
      y: 2,
      id: 11,
    },
    {
      type: "straight-conveyor",
      direction: "left",
      speed: 2,
      x: 9,
      y: 10,
      id: 12,
    },
    {
      type: "straight-conveyor",
      direction: "left",
      speed: 2,
      x: 8,
      y: 10,
      id: 13,
    },
    {
      type: "straight-conveyor",
      direction: "left",
      speed: 2,
      x: 7,
      y: 10,
      id: 14,
    },
    {
      type: "straight-conveyor",
      direction: "left",
      speed: 2,
      x: 6,
      y: 10,
      id: 15,
    },
    {
      type: "straight-conveyor",
      direction: "left",
      speed: 2,
      x: 5,
      y: 10,
      id: 16,
    },
    {
      type: "straight-conveyor",
      direction: "left",
      speed: 2,
      x: 4,
      y: 10,
      id: 17,
    },
    {
      type: "straight-conveyor",
      direction: "left",
      speed: 2,
      x: 3,
      y: 10,
      id: 18,
    },
    {
      type: "straight-conveyor",
      direction: "left",
      speed: 2,
      x: 2,
      y: 10,
      id: 19,
    },
    {
      type: "straight-conveyor",
      direction: "down",
      speed: 2,
      x: 10,
      y: 2,
      id: 20,
    },
    {
      type: "straight-conveyor",
      direction: "down",
      speed: 2,
      x: 10,
      y: 3,
      id: 21,
    },
    {
      type: "straight-conveyor",
      direction: "down",
      speed: 2,
      x: 10,
      y: 4,
      id: 22,
    },
    {
      type: "straight-conveyor",
      direction: "down",
      speed: 2,
      x: 10,
      y: 5,
      id: 23,
    },
    {
      type: "straight-conveyor",
      direction: "down",
      speed: 2,
      x: 10,
      y: 6,
      id: 24,
    },
    {
      type: "straight-conveyor",
      direction: "down",
      speed: 2,
      x: 10,
      y: 7,
      id: 25,
    },
    {
      type: "straight-conveyor",
      direction: "down",
      speed: 2,
      x: 10,
      y: 8,
      id: 26,
    },
    {
      type: "straight-conveyor",
      direction: "down",
      speed: 2,
      x: 10,
      y: 9,
      id: 27,
    },
    {
      type: "straight-conveyor",
      direction: "right",
      speed: 2,
      x: 2,
      y: 1,
      id: 28,
    },
    {
      type: "straight-conveyor",
      direction: "right",
      speed: 2,
      x: 3,
      y: 1,
      id: 29,
    },
    {
      type: "straight-conveyor",
      direction: "right",
      speed: 2,
      x: 4,
      y: 1,
      id: 30,
    },
    {
      type: "straight-conveyor",
      direction: "right",
      speed: 2,
      x: 5,
      y: 1,
      id: 31,
    },
    {
      type: "straight-conveyor",
      direction: "right",
      speed: 2,
      x: 6,
      y: 1,
      id: 32,
    },
    {
      type: "straight-conveyor",
      direction: "right",
      speed: 2,
      x: 7,
      y: 1,
      id: 33,
    },
    {
      type: "straight-conveyor",
      direction: "right",
      speed: 2,
      x: 8,
      y: 1,
      id: 34,
    },
    {
      type: "straight-conveyor",
      direction: "right",
      speed: 2,
      x: 9,
      y: 1,
      id: 35,
    },
    {
      type: "straight-conveyor",
      direction: "right",
      speed: 1,
      x: 2,
      y: 2,
      id: 36,
    },
    {
      type: "straight-conveyor",
      direction: "right",
      speed: 1,
      x: 2,
      y: 4,
      id: 37,
    },
    {
      type: "straight-conveyor",
      direction: "right",
      speed: 1,
      x: 2,
      y: 6,
      id: 38,
    },
    {
      type: "straight-conveyor",
      direction: "right",
      speed: 1,
      x: 2,
      y: 8,
      id: 39,
    },
    {
      type: "straight-conveyor",
      direction: "right",
      speed: 1,
      x: 3,
      y: 9,
      id: 40,
    },
    {
      type: "straight-conveyor",
      direction: "right",
      speed: 1,
      x: 3,
      y: 7,
      id: 41,
    },
    {
      type: "straight-conveyor",
      direction: "right",
      speed: 1,
      x: 3,
      y: 5,
      id: 42,
    },
    {
      type: "straight-conveyor",
      direction: "right",
      speed: 1,
      x: 4,
      y: 2,
      id: 43,
    },
    {
      type: "straight-conveyor",
      direction: "right",
      speed: 1,
      x: 4,
      y: 4,
      id: 44,
    },
    {
      type: "straight-conveyor",
      direction: "right",
      speed: 1,
      x: 4,
      y: 6,
      id: 45,
    },
    {
      type: "straight-conveyor",
      direction: "right",
      speed: 1,
      x: 4,
      y: 8,
      id: 46,
    },
    {
      type: "straight-conveyor",
      direction: "right",
      speed: 1,
      x: 5,
      y: 9,
      id: 47,
    },
    {
      type: "straight-conveyor",
      direction: "right",
      speed: 1,
      x: 5,
      y: 3,
      id: 48,
    },
    {
      type: "straight-conveyor",
      direction: "left",
      speed: 1,
      x: 6,
      y: 2,
      id: 49,
    },
    {
      type: "straight-conveyor",
      direction: "left",
      speed: 1,
      x: 8,
      y: 2,
      id: 50,
    },
    {
      type: "straight-conveyor",
      direction: "left",
      speed: 1,
      x: 7,
      y: 3,
      id: 51,
    },
    {
      type: "straight-conveyor",
      direction: "left",
      speed: 1,
      x: 9,
      y: 3,
      id: 52,
    },
    {
      type: "straight-conveyor",
      direction: "left",
      speed: 1,
      x: 8,
      y: 4,
      id: 53,
    },
    {
      type: "straight-conveyor",
      direction: "left",
      speed: 1,
      x: 7,
      y: 5,
      id: 54,
    },
    {
      type: "straight-conveyor",
      direction: "left",
      speed: 1,
      x: 9,
      y: 5,
      id: 55,
    },
    {
      type: "straight-conveyor",
      direction: "left",
      speed: 1,
      x: 7,
      y: 7,
      id: 56,
    },
    {
      type: "straight-conveyor",
      direction: "left",
      speed: 1,
      x: 9,
      y: 7,
      id: 57,
    },
    {
      type: "straight-conveyor",
      direction: "left",
      speed: 1,
      x: 6,
      y: 8,
      id: 58,
    },
    {
      type: "straight-conveyor",
      direction: "left",
      speed: 1,
      x: 8,
      y: 8,
      id: 59,
    },
    {
      type: "straight-conveyor",
      direction: "left",
      speed: 1,
      x: 7,
      y: 9,
      id: 60,
    },
    {
      type: "straight-conveyor",
      direction: "left",
      speed: 1,
      x: 9,
      y: 9,
      id: 61,
    },
    { type: "pit", x: 3, y: 3, id: 62 },
    { type: "pit", x: 6, y: 4, id: 63 },
    { type: "pit", x: 8, y: 6, id: 64 },
    { type: "pit", x: 5, y: 7, id: 65 },
    { type: "repair", x: 5, y: 5, id: 66 },
    { type: "repair", x: 6, y: 6, id: 67 },
    { type: "repair", x: 0, y: 11, id: 68 },
    { type: "repair", x: 11, y: 0, id: 69 },
    { type: "wall", x: 2, y: 0, x1: 2, y1: -1, id: 70 },
    { type: "wall", x: 4, y: 0, x1: 4, y1: -1, id: 71 },
    { type: "wall", x: 7, y: 0, x1: 7, y1: -1, id: 72 },
    { type: "wall", x: 9, y: 0, x1: 9, y1: -1, id: 73 },
    { type: "wall", x: 2, y: 12, x1: 2, y1: 11, id: 74 },
    { type: "wall", x: 4, y: 12, x1: 4, y1: 11, id: 75 },
    { type: "wall", x: 7, y: 12, x1: 7, y1: 11, id: 76 },
    { type: "wall", x: 9, y: 12, x1: 9, y1: 11, id: 77 },
    { type: "wall", x: 2, y: 15, x1: 2, y1: 16, id: 78 },
    { type: "wall", x: 4, y: 15, x1: 4, y1: 16, id: 79 },
    { type: "wall", x: 7, y: 15, x1: 7, y1: 16, id: 80 },
    { type: "wall", x: 9, y: 15, x1: 9, y1: 16, id: 81 },
    { type: "wall", x: 3, y: 2, x1: 3, y1: 1, id: 82 },
    { type: "wall", x: 5, y: 2, x1: 5, y1: 1, id: 83 },
    { type: "wall", x: 6, y: 2, x1: 6, y1: 1, id: 84 },
    { type: "wall", x: 8, y: 2, x1: 8, y1: 1, id: 85 },
    { type: "wall", x: 3, y: 10, x1: 3, y1: 9, id: 86 },
    { type: "wall", x: 5, y: 10, x1: 5, y1: 9, id: 87 },
    { type: "wall", x: 6, y: 10, x1: 6, y1: 9, id: 88 },
    { type: "wall", x: 8, y: 10, x1: 8, y1: 9, id: 89 },
    { type: "wall", x: 0, y: 2, x1: -1, y1: 2, id: 90 },
    { type: "wall", x: 0, y: 4, x1: -1, y1: 4, id: 91 },
    { type: "wall", x: 0, y: 7, x1: -1, y1: 7, id: 92 },
    { type: "wall", x: 0, y: 9, x1: -1, y1: 9, id: 93 },
    { type: "wall", x: 2, y: 3, x1: 1, y1: 3, id: 94 },
    { type: "wall", x: 2, y: 5, x1: 1, y1: 5, id: 95 },
    { type: "wall", x: 2, y: 6, x1: 1, y1: 6, id: 96 },
    { type: "wall", x: 2, y: 8, x1: 1, y1: 8, id: 97 },
    { type: "wall", x: 10, y: 3, x1: 9, y1: 3, id: 98 },
    { type: "wall", x: 10, y: 5, x1: 9, y1: 5, id: 99 },
    { type: "wall", x: 10, y: 6, x1: 9, y1: 6, id: 100 },
    { type: "wall", x: 10, y: 8, x1: 9, y1: 8, id: 101 },
    { type: "wall", x: 11, y: 2, x1: 12, y1: 2, id: 102 },
    { type: "wall", x: 11, y: 4, x1: 12, y1: 4, id: 103 },
    { type: "wall", x: 11, y: 7, x1: 12, y1: 7, id: 104 },
    { type: "wall", x: 11, y: 9, x1: 12, y1: 9, id: 105 },
    { type: "wall", x: 0, y: 14, x1: 1, y1: 14, id: 106 },
    { type: "wall", x: 2, y: 14, x1: 3, y1: 14, id: 107 },
    { type: "wall", x: 4, y: 14, x1: 5, y1: 14, id: 108 },
    { type: "wall", x: 5, y: 14, x1: 6, y1: 14, id: 109 },
    { type: "wall", x: 6, y: 14, x1: 7, y1: 14, id: 110 },
    { type: "wall", x: 8, y: 14, x1: 9, y1: 14, id: 111 },
    { type: "wall", x: 10, y: 14, x1: 11, y1: 14, id: 112 },
    { type: "dock", number: 1, x: 5, y: 14, id: 113 },
    { type: "dock", number: 2, x: 6, y: 14, id: 114 },
    { type: "dock", number: 3, x: 3, y: 14, id: 115 },
    { type: "dock", number: 4, x: 8, y: 14, id: 116 },
    { type: "dock", number: 5, x: 1, y: 14, id: 117 },
    { type: "dock", number: 6, x: 10, y: 14, id: 118 },
    { type: "dock", number: 7, x: 0, y: 14, id: 119 },
    { type: "dock", number: 8, x: 11, y: 14, id: 120 },
    { type: "flag", number: 1, x: 6, y: 5, id: 121 },
    { type: "flag", number: 2, x: 2, y: 9, id: 122 },
    { type: "flag", number: 3, x: 8, y: 7, id: 123 },
    { type: "flag", number: 4, x: 3, y: 4, id: 124 },
  ],
};

export default map;