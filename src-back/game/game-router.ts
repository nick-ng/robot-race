import { Router } from "express";

import { getFullId } from "./game-redis";
import { newGame, joinGame, getGame, startGame } from "./game-service";

const router = Router();

// Get game state
router.get("/:gameId", async (req, res) => {
  const { gameId } = req.params;
  const { "x-player-id": playerId, "x-player-password": playerPassword } =
    req.headers;

  if (typeof playerId !== "string" || typeof playerPassword !== "string") {
    res.status(400).json({ message: "No id or password in header." });
    return;
  }

  try {
    const { code, gameData } = await getGame(gameId, playerId, playerPassword);

    switch (code) {
      case 200:
        res.json({
          message: "OK",
          gameData,
          refreshDelayMS: 500,
        });
        return;
      default:
        res.sendStatus(code);
        return;
    }
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

router.get("/short-id/:shortGameId", async (req, res) => {
  const { shortGameId } = req.params;

  const fullId = await getFullId(shortGameId);

  if (typeof fullId !== "string") {
    res.sendStatus(404);
    return;
  }

  res.send(fullId);
});

// New game
router.post("/", async (req, res, _next) => {
  const { playerName } = req.body;
  const { "x-player-id": playerId, "x-player-password": playerPassword } =
    req.headers;

  if (typeof playerId !== "string" || typeof playerPassword !== "string") {
    res.status(400).json({ message: "No id or password in header." });
    return;
  }

  try {
    const { code, gameData } = await newGame(
      playerId,
      playerName,
      playerPassword
    );

    switch (code) {
      case code:
        res.json({
          message: "OK",
          gameData,
        });
        return;
      default:
        res.sendStatus(code);
        return;
    }
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

// Game actions - including join
router.post("/:gameId", async (req, res, _next) => {
  const { gameId } = req.params;
  const { action, playerName } = req.body;
  const { "x-player-id": playerId, "x-player-password": playerPassword } =
    req.headers;

  if (typeof playerId !== "string" || typeof playerPassword !== "string") {
    res.status(400).json({ message: "No id or password in header." });
    return;
  }

  switch (action) {
    case "join":
      try {
        const { code, gameData, message } = await joinGame(
          gameId,
          playerId,
          playerName,
          playerPassword
        );

        switch (code) {
          case 200:
            res.json({
              message: "OK",
              gameData,
            });
            return;
          case 400:
            res.status(400).json({ message });
            return;
          default:
            res.sendStatus(code);
            return;
        }
      } catch (e) {
        console.error(e);
        res.sendStatus(500);
      }
    case "start":
      try {
        const { code, message, gameData } = await startGame(
          gameId,
          playerId,
          playerPassword
        );

        res.status(code).json({ message, gameData });
        return;
      } catch (e) {
        console.error(e);
        res.sendStatus(500);
      }
    default:
      res.sendStatus(400);
  }
});

export default router;
