import type { Map } from "../game-types";

const riskyExchange: Map = {
  name: "Risky Exchange",
  height: 16,
  width: 12,
  items: [
    { id: 0, type: "dock", number: 1, x: 5, y: 15 },
    { id: 1, type: "dock", number: 2, x: 6, y: 15 },
    { id: 2, type: "dock", number: 3, x: 3, y: 14 },
    { id: 3, type: "dock", number: 4, x: 8, y: 14 },
    { id: 4, type: "dock", number: 5, x: 1, y: 13 },
    { id: 5, type: "dock", number: 6, x: 10, y: 13 },
    { id: 6, type: "dock", number: 7, x: 0, y: 12 },
    { id: 7, type: "dock", number: 8, x: 11, y: 12 },
    { id: 8, type: "flag", number: 1, x: 7, y: 1 },
    { id: 9, type: "flag", number: 2, x: 9, y: 7 },
    { id: 10, type: "flag", number: 3, x: 1, y: 4 },
    { id: 11, type: "wall", x: 0, y: 2, x1: -1, y1: 2 },
    { id: 12, type: "wall", x: 0, y: 4, x1: -1, y1: 4 },
    { id: 13, type: "wall", x: 0, y: 7, x1: -1, y1: 7 },
    { id: 14, type: "wall", x: 0, y: 9, x1: -1, y1: 9 },
    { id: 15, type: "wall", x: 1, y: 10, x1: 1, y1: 11 },
    { id: 16, type: "wall", x: 2, y: 10, x1: 3, y1: 10 },
    { id: 17, type: "wall", x: 2, y: 11, x1: 2, y1: 12 },
    { id: 18, type: "wall", x: 4, y: 11, x1: 4, y1: 12 },
    { id: 19, type: "wall", x: 7, y: 11, x1: 7, y1: 12 },
    { id: 20, type: "wall", x: 9, y: 11, x1: 9, y1: 12 },
    { id: 21, type: "wall", x: 11, y: 9, x1: 12, y1: 9 },
    { id: 22, type: "wall", x: 10, y: 9, x1: 10, y1: 8 },
    { id: 23, type: "wall", x: 11, y: 7, x1: 12, y1: 7 },
    { id: 24, type: "wall", x: 11, y: 4, x1: 12, y1: 4 },
    { id: 25, type: "wall", x: 11, y: 2, x1: 12, y1: 2 },
    { id: 26, type: "wall", x: 9, y: 0, x1: 9, y1: -1 },
    { id: 27, type: "wall", x: 7, y: 0, x1: 7, y1: -1 },
    { id: 28, type: "wall", x: 4, y: 0, x1: 4, y1: -1 },
    { id: 29, type: "wall", x: 2, y: 0, x1: 2, y1: -1 },
    { id: 30, type: "wall", x: 9, y: 2, x1: 8, y1: 2 },
    { id: 31, type: "wall", x: 7, y: 4, x1: 6, y1: 4 },
    { id: 32, type: "wall", x: 7, y: 4, x1: 7, y1: 5 },
    { id: 33, type: "wall", x: 4, y: 4, x1: 5, y1: 4 },
    { id: 34, type: "wall", x: 4, y: 4, x1: 4, y1: 5 },
    { id: 35, type: "wall", x: 4, y: 7, x1: 4, y1: 6 },
    { id: 36, type: "wall", x: 4, y: 7, x1: 5, y1: 7 },
    { id: 37, type: "wall", x: 7, y: 7, x1: 6, y1: 7 },
    { id: 38, type: "wall", x: 7, y: 7, x1: 7, y1: 6 },
    { id: 39, type: "wall", x: 2, y: 12, x1: 2, y1: 11 },
    { id: 40, type: "wall", x: 4, y: 12, x1: 4, y1: 11 },
    { id: 41, type: "wall", x: 4, y: 12, x1: 3, y1: 12 },
    { id: 42, type: "wall", x: 7, y: 12, x1: 7, y1: 11 },
    { id: 43, type: "wall", x: 7, y: 12, x1: 8, y1: 12 },
    { id: 44, type: "wall", x: 9, y: 12, x1: 9, y1: 11 },
    { id: 45, type: "wall", x: 1, y: 13, x1: 0, y1: 13 },
    { id: 46, type: "wall", x: 1, y: 13, x1: 2, y1: 13 },
    { id: 47, type: "wall", x: 10, y: 13, x1: 9, y1: 13 },
    { id: 48, type: "wall", x: 10, y: 13, x1: 11, y1: 13 },
    { id: 49, type: "wall", x: 5, y: 14, x1: 6, y1: 14 },
    { id: 50, type: "wall", x: 5, y: 15, x1: 6, y1: 15 },
    { id: 51, type: "pit", x: 0, y: 10 },
    { id: 52, type: "pit", x: 2, y: 1 },
    {
      type: "straight-conveyor",
      direction: "up",
      speed: 1,
      x: 6,
      y: 10,
      id: 53,
    },
    {
      type: "straight-conveyor",
      direction: "up",
      speed: 1,
      x: 6,
      y: 9,
      id: 54,
    },
    {
      type: "straight-conveyor",
      direction: "up",
      speed: 1,
      x: 6,
      y: 8,
      id: 55,
    },
    {
      type: "straight-conveyor",
      direction: "up",
      speed: 1,
      x: 6,
      y: 7,
      id: 56,
    },
    {
      type: "straight-conveyor",
      direction: "up",
      speed: 1,
      x: 6,
      y: 4,
      id: 57,
    },
    {
      type: "straight-conveyor",
      direction: "up",
      speed: 1,
      x: 6,
      y: 3,
      id: 58,
    },
    {
      type: "straight-conveyor",
      direction: "up",
      speed: 1,
      x: 6,
      y: 2,
      id: 59,
    },
    {
      type: "straight-conveyor",
      direction: "up",
      speed: 1,
      x: 6,
      y: 1,
      id: 60,
    },
    {
      type: "straight-conveyor",
      direction: "up",
      speed: 1,
      x: 6,
      y: 0,
      id: 61,
    },
    {
      type: "straight-conveyor",
      direction: "up",
      speed: 1,
      x: 3,
      y: 11,
      id: 62,
    },
    {
      type: "straight-conveyor",
      direction: "up",
      speed: 1,
      x: 3,
      y: 10,
      id: 63,
    },
    {
      type: "straight-conveyor",
      direction: "up",
      speed: 1,
      x: 3,
      y: 9,
      id: 64,
    },
    {
      type: "straight-conveyor",
      direction: "up",
      speed: 1,
      x: 10,
      y: 11,
      id: 65,
    },
    {
      type: "straight-conveyor",
      direction: "left",
      speed: 1,
      x: 11,
      y: 8,
      id: 66,
    },
    {
      type: "straight-conveyor",
      direction: "left",
      speed: 1,
      x: 10,
      y: 8,
      id: 67,
    },
    {
      type: "straight-conveyor",
      direction: "left",
      speed: 1,
      x: 9,
      y: 8,
      id: 68,
    },
    {
      type: "straight-conveyor",
      direction: "left",
      speed: 1,
      x: 11,
      y: 5,
      id: 69,
    },
    {
      type: "straight-conveyor",
      direction: "left",
      speed: 1,
      x: 10,
      y: 5,
      id: 70,
    },
    {
      type: "straight-conveyor",
      direction: "left",
      speed: 1,
      x: 9,
      y: 5,
      id: 71,
    },
    {
      type: "straight-conveyor",
      direction: "left",
      speed: 1,
      x: 8,
      y: 5,
      id: 72,
    },
    {
      type: "straight-conveyor",
      direction: "left",
      speed: 1,
      x: 7,
      y: 5,
      id: 73,
    },
    {
      type: "straight-conveyor",
      direction: "left",
      speed: 1,
      x: 4,
      y: 5,
      id: 74,
    },
    {
      type: "straight-conveyor",
      direction: "left",
      speed: 1,
      x: 3,
      y: 5,
      id: 75,
    },
    {
      type: "straight-conveyor",
      direction: "left",
      speed: 1,
      x: 2,
      y: 5,
      id: 76,
    },
    {
      type: "straight-conveyor",
      direction: "left",
      speed: 1,
      x: 1,
      y: 5,
      id: 77,
    },
    {
      type: "straight-conveyor",
      direction: "left",
      speed: 1,
      x: 0,
      y: 5,
      id: 78,
    },
    {
      type: "straight-conveyor",
      direction: "left",
      speed: 1,
      x: 11,
      y: 1,
      id: 79,
    },
    {
      type: "straight-conveyor",
      direction: "left",
      speed: 1,
      x: 0,
      y: 1,
      id: 80,
    },
    {
      type: "straight-conveyor",
      direction: "up",
      speed: 1,
      x: 3,
      y: 2,
      id: 81,
    },
    {
      type: "straight-conveyor",
      direction: "up",
      speed: 1,
      x: 3,
      y: 1,
      id: 82,
    },
    {
      type: "straight-conveyor",
      direction: "up",
      speed: 1,
      x: 3,
      y: 0,
      id: 83,
    },
    {
      type: "straight-conveyor",
      direction: "right",
      speed: 1,
      x: 0,
      y: 3,
      id: 84,
    },
    {
      type: "straight-conveyor",
      direction: "right",
      speed: 1,
      x: 1,
      y: 3,
      id: 85,
    },
    {
      type: "straight-conveyor",
      direction: "right",
      speed: 1,
      x: 2,
      y: 3,
      id: 86,
    },
    {
      type: "straight-conveyor",
      direction: "right",
      speed: 1,
      x: 1,
      y: 6,
      id: 87,
    },
    {
      type: "straight-conveyor",
      direction: "right",
      speed: 1,
      x: 2,
      y: 6,
      id: 88,
    },
    {
      type: "straight-conveyor",
      direction: "right",
      speed: 1,
      x: 3,
      y: 6,
      id: 89,
    },
    {
      type: "straight-conveyor",
      direction: "right",
      speed: 1,
      x: 4,
      y: 6,
      id: 90,
    },
    {
      type: "straight-conveyor",
      direction: "right",
      speed: 1,
      x: 11,
      y: 10,
      id: 91,
    },
    {
      type: "straight-conveyor",
      direction: "left",
      speed: 1,
      x: 2,
      y: 8,
      id: 92,
    },
    {
      type: "straight-conveyor",
      direction: "left",
      speed: 1,
      x: 1,
      y: 8,
      id: 93,
    },
    {
      type: "straight-conveyor",
      direction: "left",
      speed: 1,
      x: 0,
      y: 8,
      id: 94,
    },
    {
      type: "straight-conveyor",
      direction: "down",
      speed: 1,
      x: 8,
      y: 0,
      id: 95,
    },
    {
      type: "straight-conveyor",
      direction: "down",
      speed: 1,
      x: 8,
      y: 1,
      id: 96,
    },
    {
      type: "straight-conveyor",
      direction: "down",
      speed: 1,
      x: 8,
      y: 2,
      id: 97,
    },
    {
      type: "straight-conveyor",
      direction: "down",
      speed: 1,
      x: 8,
      y: 3,
      id: 98,
    },
    {
      type: "straight-conveyor",
      direction: "up",
      speed: 1,
      x: 10,
      y: 0,
      id: 99,
    },
    {
      type: "straight-conveyor",
      direction: "down",
      speed: 1,
      x: 8,
      y: 9,
      id: 100,
    },
    {
      type: "straight-conveyor",
      direction: "down",
      speed: 1,
      x: 8,
      y: 10,
      id: 101,
    },
    {
      type: "straight-conveyor",
      direction: "down",
      speed: 1,
      x: 8,
      y: 11,
      id: 102,
    },
    {
      type: "straight-conveyor",
      direction: "down",
      speed: 1,
      x: 5,
      y: 0,
      id: 103,
    },
    {
      type: "straight-conveyor",
      direction: "down",
      speed: 1,
      x: 5,
      y: 1,
      id: 104,
    },
    {
      type: "straight-conveyor",
      direction: "down",
      speed: 1,
      x: 5,
      y: 2,
      id: 105,
    },
    {
      type: "straight-conveyor",
      direction: "down",
      speed: 1,
      x: 5,
      y: 3,
      id: 106,
    },
    {
      type: "straight-conveyor",
      direction: "down",
      speed: 1,
      x: 5,
      y: 4,
      id: 107,
    },
    {
      type: "straight-conveyor",
      direction: "down",
      speed: 2,
      x: 5,
      y: 7,
      id: 108,
    },
    {
      type: "straight-conveyor",
      direction: "down",
      speed: 2,
      x: 5,
      y: 8,
      id: 109,
    },
    {
      type: "straight-conveyor",
      direction: "down",
      speed: 2,
      x: 5,
      y: 9,
      id: 110,
    },
    {
      type: "straight-conveyor",
      direction: "down",
      speed: 2,
      x: 5,
      y: 10,
      id: 111,
    },
    {
      type: "straight-conveyor",
      direction: "down",
      speed: 2,
      x: 5,
      y: 11,
      id: 112,
    },
    {
      type: "straight-conveyor",
      direction: "right",
      speed: 2,
      x: 7,
      y: 6,
      id: 113,
    },
    {
      type: "straight-conveyor",
      direction: "right",
      speed: 2,
      x: 8,
      y: 6,
      id: 114,
    },
    {
      type: "straight-conveyor",
      direction: "right",
      speed: 2,
      x: 9,
      y: 6,
      id: 115,
    },
    {
      type: "straight-conveyor",
      direction: "right",
      speed: 2,
      x: 10,
      y: 6,
      id: 116,
    },
    {
      type: "straight-conveyor",
      direction: "right",
      speed: 2,
      x: 11,
      y: 6,
      id: 117,
    },
    {
      type: "straight-conveyor",
      direction: "right",
      speed: 2,
      x: 9,
      y: 3,
      id: 118,
    },
    {
      type: "straight-conveyor",
      direction: "right",
      speed: 2,
      x: 10,
      y: 3,
      id: 119,
    },
    {
      type: "straight-conveyor",
      direction: "right",
      speed: 2,
      x: 11,
      y: 3,
      id: 120,
    },
    {
      type: "straight-conveyor",
      direction: "right",
      speed: 1,
      x: 0,
      y: 14,
      id: 121,
    },
    {
      type: "straight-conveyor",
      direction: "right",
      speed: 1,
      x: 1,
      y: 14,
      id: 122,
    },
    {
      type: "straight-conveyor",
      direction: "right",
      speed: 1,
      x: 3,
      y: 15,
      id: 123,
    },
    {
      type: "straight-conveyor",
      direction: "right",
      speed: 1,
      x: 4,
      y: 15,
      id: 124,
    },
    {
      type: "straight-conveyor",
      direction: "left",
      speed: 1,
      x: 7,
      y: 15,
      id: 125,
    },
    {
      type: "straight-conveyor",
      direction: "left",
      speed: 1,
      x: 8,
      y: 15,
      id: 126,
    },
    {
      type: "straight-conveyor",
      direction: "left",
      speed: 1,
      x: 10,
      y: 14,
      id: 127,
    },
    {
      type: "straight-conveyor",
      direction: "left",
      speed: 1,
      x: 11,
      y: 14,
      id: 128,
    },
    { type: "repair", x: 0, y: 0, id: 129 },
    { type: "repair", x: 11, y: 11, id: 130 },
    { type: "repair", x: 7, y: 7, id: 131 },
    {
      type: "curved-conveyor",
      direction: "down",
      fromDirection: ["left"],
      showStraignt: false,
      speed: 1,
      x: 2,
      y: 14,
      id: 132,
    },
    {
      type: "curved-conveyor",
      direction: "right",
      fromDirection: ["up"],
      showStraignt: false,
      speed: 1,
      x: 2,
      y: 15,
      id: 133,
    },
    {
      type: "curved-conveyor",
      direction: "down",
      fromDirection: ["right"],
      showStraignt: false,
      speed: 1,
      x: 9,
      y: 14,
      id: 134,
    },
    {
      type: "curved-conveyor",
      direction: "left",
      fromDirection: ["up"],
      showStraignt: false,
      speed: 1,
      x: 9,
      y: 15,
      id: 135,
    },
    { type: "gear", direction: "clockwise", x: 10, y: 1, id: 136 },
    { type: "gear", direction: "clockwise", x: 10, y: 10, id: 137 },
    { type: "gear", direction: "counter-clockwise", x: 3, y: 3, id: 138 },
    { type: "gear", direction: "counter-clockwise", x: 3, y: 8, id: 139 },
    { type: "gear", direction: "counter-clockwise", x: 8, y: 8, id: 140 },
    { type: "laser", direction: "left", count: 1, x: 11, y: 2, id: 141 },
  ],
};

export default riskyExchange;
