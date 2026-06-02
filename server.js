const express = require("express");
const fs = require("fs/promises");
const path = require("path");
const bcrypt = require("bcryptjs");

const app = express();
const START_PORT = Number(process.env.PORT) || 3000;
const MAX_PORT_TRIES = 20;
const DB_PATH = path.join(__dirname, "data", "users.json");

function repeatRow(pattern, count) {
  return pattern.repeat(count);
}

function createParkRows() {
  const width = 40;
  const rows = Array.from({ length: 24 }, () => Array.from({ length: width }, () => "G"));

  for (let x = 0; x < width; x += 1) {
    rows[0][x] = "H";
    rows[1][x] = "H";
    rows[22][x] = "W";
    rows[23][x] = "W";
  }

  for (let y = 0; y < rows.length; y += 1) {
    rows[y][0] = y >= 20 ? "W" : "H";
    rows[y][width - 1] = y >= 20 ? "W" : "H";
  }

  for (let x = 4; x <= 35; x += 1) {
    rows[11][x] = "P";
  }

  for (let y = 4; y <= 19; y += 1) {
    rows[y][19] = "P";
    rows[y][20] = "P";
  }

  for (let x = 2; x <= 37; x += 1) {
    rows[20][x] = "D";
    rows[21][x] = "D";
  }

  for (let y = 5; y <= 9; y += 1) {
    rows[y][6] = "P";
    rows[y][7] = "P";
    rows[y][8] = "P";
    rows[y][30] = "P";
    rows[y][31] = "P";
    rows[y][32] = "P";
  }

  for (let x = 12; x <= 15; x += 1) {
    rows[6][x] = "S";
    rows[7][x] = "S";
  }

  for (let x = 24; x <= 28; x += 1) {
    rows[14][x] = "S";
    rows[15][x] = "S";
  }

  rows[10][19] = "S";
  rows[10][20] = "S";
  rows[11][18] = "S";
  rows[11][19] = "S";
  rows[11][20] = "S";
  rows[11][21] = "S";
  rows[12][18] = "S";
  rows[12][19] = "S";
  rows[12][20] = "S";
  rows[12][21] = "S";
  rows[13][19] = "S";
  rows[13][20] = "S";

  for (let y = 2; y <= 18; y += 1) {
    rows[y][2] = "H";
    rows[y][37] = "H";
  }

  return rows.map((row) => row.join(""));
}

function createParkFeatures() {
  return [
    // Trees scattered naturally across the four quadrants
    { type: "tree", x: 4, y: 2, size: "l" },
    { type: "tree", x: 10, y: 3, size: "m" },
    { type: "tree", x: 16, y: 2, size: "m" },
    { type: "tree", x: 22, y: 2, size: "l" },
    { type: "tree", x: 30, y: 3, size: "m" },
    { type: "tree", x: 36, y: 4, size: "l" },
    { type: "tree", x: 3, y: 16, size: "m" },
    { type: "tree", x: 14, y: 17, size: "m" },
    { type: "tree", x: 27, y: 17, size: "l" },
    { type: "tree", x: 36, y: 15, size: "m" },
    { type: "tree", x: 3, y: 9, size: "m" },
    { type: "tree", x: 37, y: 9, size: "m" },
    // Benches flanking the path intersection
    { type: "bench", x: 14, y: 10, facing: "south" },
    { type: "bench", x: 22, y: 10, facing: "south" },
    { type: "bench", x: 7, y: 12, facing: "north" },
    { type: "bench", x: 31, y: 12, facing: "north" },
    // Street lamps
    { type: "lamp", x: 8, y: 10 },
    { type: "lamp", x: 18, y: 6 },
    { type: "lamp", x: 30, y: 10 },
    { type: "lamp", x: 18, y: 18 },
    // Compact flowerbeds (4×3 tiles)
    { type: "flowerbed", x: 11, y: 5, w: 4, h: 3, palette: "pink" },
    { type: "flowerbed", x: 23, y: 14, w: 4, h: 3, palette: "sun" },
    // Fountain positioned above the horizontal path
    { type: "fountain", x: 17, y: 8, w: 4, h: 3 },
    // Gazebo in NW corner
    { type: "gazebo", x: 4, y: 5, w: 5, h: 5 },
    // Buildings — well-spaced in each quadrant
    { type: "building", x: 26, y: 4, w: 8, h: 6, style: "cafe", label: "Petal Cafe" },
    { type: "building", x: 4, y: 13, w: 7, h: 5, style: "arcade", label: "Code Shop" },
    { type: "building", x: 28, y: 13, w: 7, h: 5, style: "house", label: "Lake House" },
    { type: "dock", x: 12, y: 20, w: 16, h: 2 },
    { type: "banner", x: 18, y: 3, text: "Spring Event" },
    { type: "portal-sign", x: 33, y: 11, text: "Snow Market" }
  ];
}

function createParkBlockedAreas() {
  return [
    { x: 5, y: 6, w: 3, h: 3 },   // Gazebo interior
    { x: 27, y: 5, w: 6, h: 4 },  // Petal Cafe
    { x: 5, y: 14, w: 5, h: 3 },  // Code Shop
    { x: 29, y: 14, w: 5, h: 3 }, // Lake House
    { x: 17, y: 8, w: 4, h: 3 },  // Fountain basin
    { x: 12, y: 5, w: 3, h: 2 },  // Pink flowerbed
    { x: 24, y: 14, w: 3, h: 2 }  // Sun flowerbed
  ];
}

const GAME_WORLD = {
  harbor: {
    id: "harbor",
    name: "Bloom Park",
    theme: "Festival Garden",
    visitorsToday: 63,
    spawn: { x: 8, y: 11 },
    tiles: createParkRows(),
    features: createParkFeatures(),
    blockedAreas: createParkBlockedAreas(),
    portals: [
      { x: 35, y: 11, targetZoneId: "market", targetX: 2, targetY: 9, label: "Snow Market" }
    ]
  },
  market: {
    id: "market",
    name: "Snow Market",
    theme: "Winter Trade Route",
    visitorsToday: 27,
    spawn: { x: 2, y: 9 },
    tiles: [
      "SSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSS",
      "SSSSPPPPPPPPSSSS",
      "SSSPPPPPPPPPPSSS",
      "SSSPPSSSSSSPPSSS",
      "SSSPPSSSSSSPPSSS",
      "SSSPPPPPPPPPPSSS",
      "PPPPPPPPPPPPPPPP",
      "WWWWWWWWWWWWWWWW",
      "WWWWWWWWWWWWWWWW"
    ],
    features: [],
    blockedAreas: [],
    portals: [
      { x: 0, y: 9, targetZoneId: "harbor", targetX: 34, targetY: 11, label: "Bloom Park" },
      { x: 15, y: 5, targetZoneId: "garden", targetX: 1, targetY: 5, label: "Garden Lane" }
    ]
  },
  garden: {
    id: "garden",
    name: "Garden Lane",
    theme: "Classic Meadow",
    visitorsToday: 11,
    spawn: { x: 1, y: 5 },
    tiles: [
      "GGGGGGGGGGGGGGGG",
      "GGGGGGGGGGGGGGGG",
      "GGGGGGGGGGGGGGGG",
      "GGGPPPGGGGGPPPGG",
      "GGPPPPPGGGPPPPGG",
      "PPPPPPPPPPPPPPPP",
      "GGPPPPPGGGPPPPGG",
      "GGGPPPGGGGGPPPGG",
      "GGGGGGGGGGGGGGGG",
      "GGGGGGGGGGGGGGGG",
      "GGGGGGGGGGGGGGGG",
      "GGGGGGGGGGGGGGGG"
    ],
    features: [],
    blockedAreas: [],
    portals: [
      { x: 0, y: 5, targetZoneId: "market", targetX: 14, targetY: 5, label: "Snow Market" },
      { x: 15, y: 5, targetZoneId: "cat_house", targetX: 2, targetY: 9, label: "Midnight House" }
    ]
  },
  cat_house: {
    id: "cat_house",
    name: "Midnight House",
    theme: "Moon Cat Salon",
    visitorsToday: 6,
    spawn: { x: 2, y: 9 },
    tiles: [
      "WWWWWWWWWWWWWWWW",
      "WFFFFFFFFFFFFFFW",
      "WFFFFFFFFFFFFFFW",
      "WFFRRRRRRRRRRFFW",
      "WFFRRRRRRRRRRFFW",
      "WFFRRRRRRRRRRFFW",
      "WFFRRRRRRRRRRFFW",
      "WFFFFFFFFFFFFFFW",
      "WFFFFFFFFFFFFFFW",
      "PPFFFFFFFFFFFFFW",
      "WFFFFFFFFFFFFFFW",
      "WWWWWWWWWWWWWWWW"
    ],
    features: [],
    blockedAreas: [],
    portals: [
      { x: 0, y: 9, targetZoneId: "garden", targetX: 14, targetY: 5, label: "Garden Lane" }
    ]
  }
};

const PASSABLE_TILES = new Set(["G", "P", "D", "S", "F", "R"]);
const DIRECTION_VECTORS = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 }
};

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

function nowIso() {
  return new Date().toISOString();
}

function createDefaultDesktopData(userName) {
  const gameState = createDefaultGameState();

  return {
    friends: [],
    notifications: [],
    conversations: [],
    feed: [],
    config: {
      wallpaperColor: "#3f76bf",
      windowBgColor: "#f2f4f8",
      borderColor: "#0f2b4a",
      themeColor: "#2f6eb1",
      textColor: "#16202b",
      gameBackdropColor: "#b7dced",
      soundEnabled: true,
      language: "en"
    },
    gamePreview: {
      zone: "Harbor Docks",
      lastParkVisit: "Now",
      houseTheme: "Emerald Harbor",
      visitorsToday: 18
    },
    gameState
  };
}

function createDefaultGameState() {
  const zone = GAME_WORLD.harbor;

  return {
    zoneId: zone.id,
    x: zone.spawn.x,
    y: zone.spawn.y,
    direction: "down",
    running: false,
    sessionStartedAt: "",
    lastSeenAt: nowIso(),
    lastSavedAt: nowIso()
  };
}

function createDefaultProfile(userName) {
  return {
    displayName: userName,
    avatarDataUrl: "",
    coins: 0
  };
}

function normalizeAvatarDataUrl(value) {
  const candidate = (value || "").trim();
  if (!candidate) {
    return "";
  }

  return /^data:image\/(png|jpeg);base64,[a-z0-9+/=]+$/i.test(candidate) ? candidate : "";
}

function getZoneById(zoneId) {
  return GAME_WORLD[zoneId] || GAME_WORLD.harbor;
}

function getTileAt(zone, x, y) {
  if (!zone || y < 0 || y >= zone.tiles.length) {
    return "";
  }

  const row = zone.tiles[y] || "";
  if (x < 0 || x >= row.length) {
    return "";
  }

  return row[x];
}

function isBlockedByArea(zone, x, y) {
  return (zone?.blockedAreas || []).some((area) => {
    return x >= area.x && x < area.x + area.w && y >= area.y && y < area.y + area.h;
  });
}

function isWalkableTile(zone, x, y) {
  return PASSABLE_TILES.has(getTileAt(zone, x, y)) && !isBlockedByArea(zone, x, y);
}

function buildGamePreview(gameState) {
  const zone = getZoneById(gameState?.zoneId);
  const lastSavedAt = gameState?.lastSavedAt ? new Date(gameState.lastSavedAt) : null;

  return {
    zone: zone.name,
    lastParkVisit: lastSavedAt && Number.isFinite(lastSavedAt.getTime()) ? lastSavedAt.toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }) : "Now",
    houseTheme: zone.theme,
    visitorsToday: zone.visitorsToday
  };
}

function normalizeGameState(gameState) {
  const fallback = createDefaultGameState();
  const nextState = gameState && typeof gameState === "object" ? { ...fallback, ...gameState } : fallback;
  const zone = getZoneById(nextState.zoneId);

  nextState.zoneId = zone.id;
  nextState.direction = DIRECTION_VECTORS[nextState.direction] ? nextState.direction : fallback.direction;
  nextState.running = Boolean(nextState.running);
  nextState.sessionStartedAt = typeof nextState.sessionStartedAt === "string" ? nextState.sessionStartedAt : "";
  nextState.lastSeenAt = typeof nextState.lastSeenAt === "string" && nextState.lastSeenAt ? nextState.lastSeenAt : nowIso();
  nextState.lastSavedAt = typeof nextState.lastSavedAt === "string" && nextState.lastSavedAt ? nextState.lastSavedAt : nowIso();

  nextState.x = Number.isInteger(nextState.x) ? nextState.x : zone.spawn.x;
  nextState.y = Number.isInteger(nextState.y) ? nextState.y : zone.spawn.y;

  if (!isWalkableTile(zone, nextState.x, nextState.y)) {
    nextState.x = zone.spawn.x;
    nextState.y = zone.spawn.y;
  }

  return nextState;
}

function touchGameSession(user, { running = user.desktopData.gameState?.running ?? false } = {}) {
  const nextState = normalizeGameState(user.desktopData.gameState);
  const timestamp = nowIso();

  nextState.running = running;
  nextState.lastSeenAt = timestamp;

  if (running && !nextState.sessionStartedAt) {
    nextState.sessionStartedAt = timestamp;
  }

  if (!running) {
    nextState.sessionStartedAt = "";
  }

  user.desktopData.gameState = nextState;
  user.desktopData.gamePreview = buildGamePreview(nextState);
}

function serializeGameSession(user, db) {
  const gameState = normalizeGameState(user.desktopData.gameState);
  const zone = getZoneById(gameState.zoneId);

  user.desktopData.gameState = gameState;
  user.desktopData.gamePreview = buildGamePreview(gameState);

  // Count users actively in the same zone, seen within the last 5 minutes
  const ONLINE_THRESHOLD_MS = 5 * 60 * 1000;
  const nowMs = Date.now();
  const onlineInZone = db
    ? (db.users || []).filter((u) => {
        const gs = u.desktopData?.gameState;
        if (!gs?.running || gs.zoneId !== zone.id) return false;
        const lastSeen = gs.lastSeenAt ? new Date(gs.lastSeenAt).getTime() : 0;
        return (nowMs - lastSeen) <= ONLINE_THRESHOLD_MS;
      }).length
    : 1;

  return {
    player: {
      name: user.profile?.displayName || user.name,
      avatarDataUrl: user.profile?.avatarDataUrl || "",
      position: {
        zoneId: gameState.zoneId,
        x: gameState.x,
        y: gameState.y,
        direction: gameState.direction
      },
      running: gameState.running,
      sessionStartedAt: gameState.sessionStartedAt,
      lastSeenAt: gameState.lastSeenAt,
      lastSavedAt: gameState.lastSavedAt
    },
    zone: {
      id: zone.id,
      name: zone.name,
      theme: zone.theme,
      visitorsToday: onlineInZone,
      width: zone.tiles[0].length,
      height: zone.tiles.length,
      tiles: zone.tiles,
      features: zone.features || [],
      portals: zone.portals
    },
    gamePreview: user.desktopData.gamePreview
  };
}

function movePlayer(user, direction) {
  const vector = DIRECTION_VECTORS[direction];
  const nextState = normalizeGameState(user.desktopData.gameState);

  if (!vector) {
    return nextState;
  }

  const zone = getZoneById(nextState.zoneId);
  const nextX = nextState.x + vector.x;
  const nextY = nextState.y + vector.y;

  nextState.direction = direction;

  if (!isWalkableTile(zone, nextX, nextY)) {
    nextState.lastSeenAt = nowIso();
    return nextState;
  }

  nextState.x = nextX;
  nextState.y = nextY;

  const portal = zone.portals.find((item) => item.x === nextX && item.y === nextY);
  if (portal) {
    const targetZone = getZoneById(portal.targetZoneId);
    nextState.zoneId = targetZone.id;
    nextState.x = portal.targetX;
    nextState.y = portal.targetY;
  }

  nextState.running = true;
  nextState.lastSeenAt = nowIso();
  nextState.lastSavedAt = nextState.lastSeenAt;

  return normalizeGameState(nextState);
}

function renameUserAcrossDb(db, oldName, nextName) {
  const oldLower = oldName.toLowerCase();
  const nextLower = nextName.toLowerCase();

  db.users.forEach((user) => {
    if (user.name.toLowerCase() === oldLower) {
      user.name = nextName;
    }

    if (user.profile?.displayName && user.profile.displayName.toLowerCase() === oldLower) {
      user.profile.displayName = nextName;
    }

    if (!user.desktopData) {
      return;
    }

    user.desktopData.friends.forEach((friend) => {
      if (friend.name.toLowerCase() === oldLower) {
        friend.name = nextName;
      }
    });

    user.desktopData.conversations.forEach((conversation) => {
      if (conversation.with.toLowerCase() === oldLower) {
        conversation.with = nextName;
      }

      conversation.messages.forEach((message) => {
        if (message.from.toLowerCase() === oldLower) {
          message.from = nextName;
        }
      });
    });
  });
}

function ensureUserState(user) {
  let changed = false;

  if (!user.profile) {
    user.profile = createDefaultProfile(user.name);
    changed = true;
  } else {
    if (!user.profile.displayName) {
      user.profile.displayName = user.name;
      changed = true;
    }

    const normalizedAvatar = normalizeAvatarDataUrl(user.profile.avatarDataUrl);
    if (user.profile.avatarDataUrl !== normalizedAvatar) {
      user.profile.avatarDataUrl = normalizedAvatar;
      changed = true;
    }

    if (!Number.isFinite(user.profile.coins)) {
      user.profile.coins = 0;
      changed = true;
    }
  }

  if (!user.desktopData) {
    user.desktopData = createDefaultDesktopData(user.name);
    changed = true;
  }

  const desktopData = user.desktopData;

  if (!Array.isArray(desktopData.friends)) {
    desktopData.friends = [];
    changed = true;
  }

  if (!Array.isArray(desktopData.notifications)) {
    desktopData.notifications = [];
    changed = true;
  }

  if (!Array.isArray(desktopData.conversations)) {
    desktopData.conversations = [];
    changed = true;
  }

  if (!Array.isArray(desktopData.feed)) {
    desktopData.feed = [];
    changed = true;
  }

  if (!desktopData.config) {
    desktopData.config = {
      wallpaperColor: "#3f76bf",
      windowBgColor: "#f2f4f8",
      borderColor: "#0f2b4a",
      themeColor: "#2f6eb1",
      textColor: "#16202b",
      gameBackdropColor: "#b7dced",
      soundEnabled: true,
      language: "en"
    };
    changed = true;
  } else {
    if (!desktopData.config.borderColor) {
      desktopData.config.borderColor = "#0f2b4a";
      changed = true;
    }

    if (!desktopData.config.windowBgColor || !/^#[0-9a-fA-F]{6}$/.test(desktopData.config.windowBgColor)) {
      desktopData.config.windowBgColor = "#f2f4f8";
      changed = true;
    }

    if (!desktopData.config.themeColor) {
      desktopData.config.themeColor = "#2f6eb1";
      changed = true;
    }

    if (!desktopData.config.textColor || !/^#[0-9a-fA-F]{6}$/.test(desktopData.config.textColor)) {
      desktopData.config.textColor = "#16202b";
      changed = true;
    }

    if (!desktopData.config.gameBackdropColor || !/^#[0-9a-fA-F]{6}$/.test(desktopData.config.gameBackdropColor)) {
      desktopData.config.gameBackdropColor = "#b7dced";
      changed = true;
    }

    const normalizedLanguage = normalizeLanguageValue(desktopData.config.language);
    if (desktopData.config.language !== normalizedLanguage) {
      desktopData.config.language = normalizedLanguage;
      changed = true;
    }
  }

  if (!desktopData.gamePreview) {
    desktopData.gamePreview = { zone: "Harbor Docks", lastParkVisit: "Now", houseTheme: "Emerald Harbor", visitorsToday: 18 };
    changed = true;
  }

  const normalizedGameState = normalizeGameState(desktopData.gameState);
  if (JSON.stringify(desktopData.gameState) !== JSON.stringify(normalizedGameState)) {
    desktopData.gameState = normalizedGameState;
    changed = true;
  }

  const preview = buildGamePreview(desktopData.gameState);
  if (JSON.stringify(desktopData.gamePreview) !== JSON.stringify(preview)) {
    desktopData.gamePreview = preview;
    changed = true;
  }

  return changed;
}

function normalizeDb(parsed) {
  const db = parsed && typeof parsed === "object" ? parsed : {};
  let changed = false;

  if (!Array.isArray(db.users)) {
    db.users = [];
    changed = true;
  }

  db.users.forEach((user) => {
    if (!user.createdAt) {
      user.createdAt = nowIso();
      changed = true;
    }

    if (ensureUserState(user)) {
      changed = true;
    }
  });

  return { db, changed };
}

async function readUsersDb() {
  const content = await fs.readFile(DB_PATH, "utf-8");
  const parsed = JSON.parse(content);
  const { db, changed } = normalizeDb(parsed);

  if (changed) {
    await writeUsersDb(db);
  }

  return db;
}

async function writeUsersDb(db) {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), "utf-8");
}

function getQueryName(req) {
  return (req.query?.name || "").trim();
}

function findUserByName(db, name) {
  return db.users.find((user) => user.name.toLowerCase() === name.toLowerCase());
}

function normalizeLanguageValue(value) {
  const normalized = (value || "").trim().toLowerCase();
  if (normalized === "pt-br" || normalized === "ptbr" || normalized === "portuguese" || normalized === "portugues") {
    return "pt-BR";
  }

  return "en";
}

function makeId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

function pushNotification(user, text, read = false) {
  user.desktopData.notifications.unshift({
    id: makeId("n"),
    text,
    read,
    createdAt: nowIso()
  });
}

function pushFeedEvent(user, type, text) {
  user.desktopData.feed.unshift({
    id: makeId("e"),
    type,
    text,
    createdAt: nowIso()
  });
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/session", async (req, res) => {
  try {
    const name = getQueryName(req);
    if (!name) {
      return res.status(400).json({ error: "Name is required." });
    }

    const db = await readUsersDb();
    const user = findUserByName(db, name);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const unreadNotifications = user.desktopData.notifications.filter((item) => !item.read).length;

    return res.json({
      user: { id: user.id, name: user.name, createdAt: user.createdAt },
      profile: user.profile,
      summary: {
        friendCount: user.desktopData.friends.filter((item) => item.status === "accepted").length,
        unreadNotifications,
        conversations: user.desktopData.conversations.length
      },
      config: user.desktopData.config
    });
  } catch (_error) {
    return res.status(500).json({ error: "Unexpected error loading session." });
  }
});

app.get("/api/profile", async (req, res) => {
  try {
    const name = getQueryName(req);
    if (!name) {
      return res.status(400).json({ error: "Name is required." });
    }

    const db = await readUsersDb();
    const user = findUserByName(db, name);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    return res.json({
      user: { id: user.id, name: user.name, createdAt: user.createdAt },
      profile: user.profile
    });
  } catch (_error) {
    return res.status(500).json({ error: "Unexpected error loading profile." });
  }
});

app.get("/api/friends", async (req, res) => {
  try {
    const name = getQueryName(req);
    if (!name) {
      return res.status(400).json({ error: "Name is required." });
    }

    const db = await readUsersDb();
    const user = findUserByName(db, name);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    return res.json({ friends: user.desktopData.friends });
  } catch (_error) {
    return res.status(500).json({ error: "Unexpected error loading friends." });
  }
});

app.get("/api/users/search", async (req, res) => {
  try {
    const name = getQueryName(req);
    const query = (req.query?.q || "").trim().toLowerCase();

    if (!name) {
      return res.status(400).json({ error: "Name is required." });
    }

    const db = await readUsersDb();
    const user = findUserByName(db, name);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const existingNames = new Set(user.desktopData.friends.map((item) => item.name.toLowerCase()));

    const users = db.users
      .filter((candidate) => {
        const candidateName = candidate.name.toLowerCase();
        if (candidateName === name.toLowerCase()) {
          return false;
        }

        if (existingNames.has(candidateName)) {
          return false;
        }

        const alreadyRelated = candidate.desktopData.friends.some((item) => item.name.toLowerCase() === name.toLowerCase());
        if (alreadyRelated) {
          return false;
        }

        return !query || candidateName.includes(query);
      })
      .slice(0, 20)
      .map((candidate) => ({ name: candidate.name }));

    return res.json({ users });
  } catch (_error) {
    return res.status(500).json({ error: "Unexpected error searching users." });
  }
});

app.post("/api/friends/add", async (req, res) => {
  try {
    const name = (req.body?.name || "").trim();
    const targetName = (req.body?.targetName || "").trim();

    if (!name || !targetName) {
      return res.status(400).json({ error: "Name and targetName are required." });
    }

    if (name.toLowerCase() === targetName.toLowerCase()) {
      return res.status(400).json({ error: "You cannot add yourself." });
    }

    const db = await readUsersDb();
    const user = findUserByName(db, name);
    const targetUser = findUserByName(db, targetName);

    if (!user || !targetUser) {
      return res.status(404).json({ error: "User not found." });
    }

    const requesterName = user.name.toLowerCase();
    const targetNameLower = targetUser.name.toLowerCase();

    const alreadyFriend = user.desktopData.friends.some(
      (item) => item.status === "accepted" && item.name.toLowerCase() === targetNameLower
    );
    if (alreadyFriend) {
      return res.status(409).json({ error: "This user is already in your friend list." });
    }

    const alreadyInvited = targetUser.desktopData.friends.some(
      (item) => item.status === "pending" && item.name.toLowerCase() === requesterName
    );
    if (alreadyInvited) {
      return res.status(409).json({ error: "Invite already sent to this user." });
    }

    const hasIncomingPending = user.desktopData.friends.some(
      (item) => item.status === "pending" && item.name.toLowerCase() === targetNameLower
    );
    if (hasIncomingPending) {
      return res.status(409).json({ error: "This user already sent you a friend request." });
    }

    targetUser.desktopData.friends.unshift({
      id: makeId("f"),
      name: user.name,
      status: "pending",
      presence: "offline"
    });

    pushNotification(targetUser, `${user.name} sent you a friend request.`, false);
    pushFeedEvent(targetUser, "friend", `${user.name} sent you a friend request.`);

    await writeUsersDb(db);
    return res.status(201).json({ message: "Invite sent." });
  } catch (_error) {
    return res.status(500).json({ error: "Unexpected error adding friend." });
  }
});

app.post("/api/friends/accept", async (req, res) => {
  try {
    const name = (req.body?.name || "").trim();
    const friendId = (req.body?.friendId || "").trim();

    if (!name || !friendId) {
      return res.status(400).json({ error: "Name and friendId are required." });
    }

    const db = await readUsersDb();
    const user = findUserByName(db, name);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const friend = user.desktopData.friends.find((item) => item.id === friendId);
    if (!friend) {
      return res.status(404).json({ error: "Friend entry not found." });
    }

    if (friend.status !== "pending") {
      return res.status(409).json({ error: "Only pending requests can be accepted." });
    }

    const requester = findUserByName(db, friend.name);
    if (!requester) {
      return res.status(404).json({ error: "Request sender not found." });
    }

    friend.status = "accepted";

    const requesterFriendEntry = requester.desktopData.friends.find(
      (item) => item.name.toLowerCase() === user.name.toLowerCase()
    );

    if (requesterFriendEntry) {
      requesterFriendEntry.status = "accepted";
      requesterFriendEntry.presence = requesterFriendEntry.presence || "offline";
    } else {
      requester.desktopData.friends.unshift({
        id: makeId("f"),
        name: user.name,
        status: "accepted",
        presence: "offline"
      });
    }

    pushNotification(user, `${friend.name} is now your friend.`, false);
    pushNotification(requester, `${user.name} accepted your friend request.`, false);
    pushFeedEvent(user, "friend", `You accepted ${friend.name}'s friend request.`);

    await writeUsersDb(db);
    return res.json({ message: "Friend request accepted." });
  } catch (_error) {
    return res.status(500).json({ error: "Unexpected error accepting friend request." });
  }
});

app.post("/api/friends/decline", async (req, res) => {
  try {
    const name = (req.body?.name || "").trim();
    const friendId = (req.body?.friendId || "").trim();

    if (!name || !friendId) {
      return res.status(400).json({ error: "Name and friendId are required." });
    }

    const db = await readUsersDb();
    const user = findUserByName(db, name);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const index = user.desktopData.friends.findIndex((item) => item.id === friendId);
    if (index === -1) {
      return res.status(404).json({ error: "Friend entry not found." });
    }

    const friend = user.desktopData.friends[index];
    if (friend.status !== "pending") {
      return res.status(409).json({ error: "Only pending requests can be declined." });
    }

    user.desktopData.friends.splice(index, 1);
    pushFeedEvent(user, "friend", `You declined ${friend.name}'s friend request.`);

    await writeUsersDb(db);
    return res.json({ message: "Friend request declined." });
  } catch (_error) {
    return res.status(500).json({ error: "Unexpected error declining friend request." });
  }
});

app.post("/api/friends/remove", async (req, res) => {
  try {
    const name = (req.body?.name || "").trim();
    const friendId = (req.body?.friendId || "").trim();

    if (!name || !friendId) {
      return res.status(400).json({ error: "Name and friendId are required." });
    }

    const db = await readUsersDb();
    const user = findUserByName(db, name);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const index = user.desktopData.friends.findIndex((item) => item.id === friendId);
    if (index === -1) {
      return res.status(404).json({ error: "Friend entry not found." });
    }

    const friend = user.desktopData.friends[index];
    user.desktopData.friends.splice(index, 1);

    const reciprocalUser = findUserByName(db, friend.name);
    if (reciprocalUser) {
      reciprocalUser.desktopData.friends = reciprocalUser.desktopData.friends.filter(
        (item) => item.name.toLowerCase() !== user.name.toLowerCase()
      );
    }

    pushFeedEvent(user, "friend", `You removed ${friend.name} from your friends.`);

    await writeUsersDb(db);
    return res.json({ message: "Friend removed." });
  } catch (_error) {
    return res.status(500).json({ error: "Unexpected error removing friend." });
  }
});

app.get("/api/notifications", async (req, res) => {
  try {
    const name = getQueryName(req);
    if (!name) {
      return res.status(400).json({ error: "Name is required." });
    }

    const db = await readUsersDb();
    const user = findUserByName(db, name);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const notifications = [...user.desktopData.notifications].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    return res.json({ notifications });
  } catch (_error) {
    return res.status(500).json({ error: "Unexpected error loading notifications." });
  }
});

app.post("/api/notifications/mark-read", async (req, res) => {
  try {
    const name = (req.body?.name || "").trim();
    if (!name) {
      return res.status(400).json({ error: "Name is required." });
    }

    const db = await readUsersDb();
    const user = findUserByName(db, name);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    user.desktopData.notifications = user.desktopData.notifications.map((item) => ({ ...item, read: true }));
    await writeUsersDb(db);

    return res.json({ message: "All notifications marked as read." });
  } catch (_error) {
    return res.status(500).json({ error: "Unexpected error updating notifications." });
  }
});

app.post("/api/notifications/clear", async (req, res) => {
  try {
    const name = (req.body?.name || "").trim();
    if (!name) {
      return res.status(400).json({ error: "Name is required." });
    }

    const db = await readUsersDb();
    const user = findUserByName(db, name);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    user.desktopData.notifications = [];
    await writeUsersDb(db);

    return res.json({ message: "All notifications cleared." });
  } catch (_error) {
    return res.status(500).json({ error: "Unexpected error clearing notifications." });
  }
});

app.get("/api/messages", async (req, res) => {
  try {
    const name = getQueryName(req);
    if (!name) {
      return res.status(400).json({ error: "Name is required." });
    }

    const db = await readUsersDb();
    const user = findUserByName(db, name);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    return res.json({ conversations: user.desktopData.conversations });
  } catch (_error) {
    return res.status(500).json({ error: "Unexpected error loading messages." });
  }
});

app.post("/api/messages", async (req, res) => {
  try {
    const name = (req.body?.name || "").trim();
    const withUser = (req.body?.with || "").trim();
    const text = (req.body?.text || "").trim();

    if (!name || !withUser || !text) {
      return res.status(400).json({ error: "Name, recipient, and text are required." });
    }

    const db = await readUsersDb();
    const user = findUserByName(db, name);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const targetUser = findUserByName(db, withUser);
    if (!targetUser) {
      return res.status(404).json({ error: "Recipient not found." });
    }

    const isFriend = user.desktopData.friends.some(
      (item) => item.status === "accepted" && item.name.toLowerCase() === targetUser.name.toLowerCase()
    );

    const recipientAcceptsSender = targetUser.desktopData.friends.some(
      (item) => item.status === "accepted" && item.name.toLowerCase() === user.name.toLowerCase()
    );

    if (!isFriend || !recipientAcceptsSender) {
      return res.status(403).json({ error: "You can only send messages to friends." });
    }

    let senderConversation = user.desktopData.conversations.find(
      (item) => item.with.toLowerCase() === targetUser.name.toLowerCase()
    );
    if (!senderConversation) {
      senderConversation = {
        id: makeId("c"),
        with: targetUser.name,
        messages: []
      };
      user.desktopData.conversations.push(senderConversation);
    }

    let recipientConversation = targetUser.desktopData.conversations.find(
      (item) => item.with.toLowerCase() === user.name.toLowerCase()
    );
    if (!recipientConversation) {
      recipientConversation = {
        id: makeId("c"),
        with: user.name,
        messages: []
      };
      targetUser.desktopData.conversations.push(recipientConversation);
    }

    const message = {
      id: makeId("m"),
      from: user.name,
      text,
      createdAt: nowIso()
    };

    senderConversation.messages.push(message);
    recipientConversation.messages.push({ ...message });

    await writeUsersDb(db);
    return res.status(201).json({ message: "Message sent." });
  } catch (_error) {
    return res.status(500).json({ error: "Unexpected error sending message." });
  }
});

app.post("/api/messages/delete", async (req, res) => {
  try {
    const name = (req.body?.name || "").trim();
    const conversationId = (req.body?.conversationId || "").trim();

    if (!name || !conversationId) {
      return res.status(400).json({ error: "Name and conversationId are required." });
    }

    const db = await readUsersDb();
    const user = findUserByName(db, name);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const index = user.desktopData.conversations.findIndex((item) => item.id === conversationId);
    if (index === -1) {
      return res.status(404).json({ error: "Conversation not found." });
    }

    user.desktopData.conversations.splice(index, 1);

    await writeUsersDb(db);
    return res.json({ message: "Conversation deleted." });
  } catch (_error) {
    return res.status(500).json({ error: "Unexpected error deleting conversation." });
  }
});

app.put("/api/profile", async (req, res) => {
  try {
    const name = (req.body?.name || "").trim();
    const nextName = (req.body?.nextName || req.body?.displayName || "").trim();
    const avatarDataUrl = normalizeAvatarDataUrl(req.body?.avatarDataUrl);

    if (!name) {
      return res.status(400).json({ error: "Name is required." });
    }

    const db = await readUsersDb();
    const user = findUserByName(db, name);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const wantRename = Boolean(nextName) && nextName.toLowerCase() !== name.toLowerCase();

    if (wantRename) {
      if (nextName.length < 3) {
        return res.status(400).json({ error: "Name must have at least 3 characters." });
      }

      const duplicate = db.users.find((candidate) => candidate.name.toLowerCase() === nextName.toLowerCase());
      if (duplicate) {
        return res.status(409).json({ error: "Name already exists." });
      }

      renameUserAcrossDb(db, user.name, nextName);
    }

    const updatedUser = findUserByName(db, wantRename ? nextName : name);
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found." });
    }

    updatedUser.profile.displayName = wantRename ? nextName : (updatedUser.profile.displayName || updatedUser.name);

    if (Object.prototype.hasOwnProperty.call(req.body || {}, "avatarDataUrl")) {
      updatedUser.profile.avatarDataUrl = avatarDataUrl;
    }

    await writeUsersDb(db);

    return res.json({
      message: "Profile saved.",
      user: { id: updatedUser.id, name: updatedUser.name, createdAt: updatedUser.createdAt },
      profile: updatedUser.profile
    });
  } catch (_error) {
    return res.status(500).json({ error: "Unexpected error saving profile." });
  }
});

app.put("/api/security/password", async (req, res) => {
  try {
    const name = (req.body?.name || "").trim();
    const currentPassword = (req.body?.currentPassword || "").trim();
    const nextPassword = (req.body?.nextPassword || "").trim();

    if (!name || !currentPassword || !nextPassword) {
      return res.status(400).json({ error: "Name, currentPassword, and nextPassword are required." });
    }

    if (nextPassword.length < 4) {
      return res.status(400).json({ error: "New password must have at least 4 characters." });
    }

    if (currentPassword === nextPassword) {
      return res.status(409).json({ error: "New password must be different from the current password." });
    }

    const db = await readUsersDb();
    const user = findUserByName(db, name);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const isValidPassword = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Current password is incorrect." });
    }

    user.passwordHash = await bcrypt.hash(nextPassword, 10);
    await writeUsersDb(db);

    return res.json({ message: "Password updated." });
  } catch (_error) {
    return res.status(500).json({ error: "Unexpected error updating password." });
  }
});

app.get("/api/feed", async (req, res) => {
  try {
    const name = getQueryName(req);
    if (!name) {
      return res.status(400).json({ error: "Name is required." });
    }

    const db = await readUsersDb();
    const user = findUserByName(db, name);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const feed = [...user.desktopData.feed].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    return res.json({ feed });
  } catch (_error) {
    return res.status(500).json({ error: "Unexpected error loading feed." });
  }
});

app.get("/api/config", async (req, res) => {
  try {
    const name = getQueryName(req);
    if (!name) {
      return res.status(400).json({ error: "Name is required." });
    }

    const db = await readUsersDb();
    const user = findUserByName(db, name);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    return res.json({ config: user.desktopData.config });
  } catch (_error) {
    return res.status(500).json({ error: "Unexpected error loading config." });
  }
});

app.put("/api/config", async (req, res) => {
  try {
    const name = (req.body?.name || "").trim();
    if (!name) {
      return res.status(400).json({ error: "Name is required." });
    }

    const db = await readUsersDb();
    const user = findUserByName(db, name);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const nextConfig = {
      wallpaperColor: req.body?.wallpaperColor || user.desktopData.config.wallpaperColor,
      windowBgColor:
        typeof req.body?.windowBgColor === "string" && /^#[0-9a-fA-F]{6}$/.test(req.body.windowBgColor)
          ? req.body.windowBgColor
          : user.desktopData.config.windowBgColor || "#f2f4f8",
      borderColor: req.body?.borderColor || user.desktopData.config.borderColor || "#0f2b4a",
      themeColor:
        typeof req.body?.themeColor === "string" && /^#[0-9a-fA-F]{6}$/.test(req.body.themeColor)
          ? req.body.themeColor
          : user.desktopData.config.themeColor || "#2f6eb1",
      textColor:
        typeof req.body?.textColor === "string" && /^#[0-9a-fA-F]{6}$/.test(req.body.textColor)
          ? req.body.textColor
          : user.desktopData.config.textColor || "#16202b",
      gameBackdropColor:
        typeof req.body?.gameBackdropColor === "string" && /^#[0-9a-fA-F]{6}$/.test(req.body.gameBackdropColor)
          ? req.body.gameBackdropColor
          : user.desktopData.config.gameBackdropColor || "#b7dced",
      soundEnabled: typeof req.body?.soundEnabled === "boolean" ? req.body.soundEnabled : user.desktopData.config.soundEnabled,
      language: normalizeLanguageValue(req.body?.language || user.desktopData.config.language)
    };

    user.desktopData.config = nextConfig;
    await writeUsersDb(db);

    return res.json({ message: "Configurations saved.", config: nextConfig });
  } catch (_error) {
    return res.status(500).json({ error: "Unexpected error saving config." });
  }
});

app.get("/api/game-preview", async (req, res) => {
  try {
    const name = getQueryName(req);
    if (!name) {
      return res.status(400).json({ error: "Name is required." });
    }

    const db = await readUsersDb();
    const user = findUserByName(db, name);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const session = serializeGameSession(user, db);
    await writeUsersDb(db);

    return res.json({ gamePreview: session.gamePreview });
  } catch (_error) {
    return res.status(500).json({ error: "Unexpected error loading game preview." });
  }
});

app.get("/api/game-session", async (req, res) => {
  try {
    const name = getQueryName(req);
    if (!name) {
      return res.status(400).json({ error: "Name is required." });
    }

    const db = await readUsersDb();
    const user = findUserByName(db, name);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const session = serializeGameSession(user, db);
    await writeUsersDb(db);

    return res.json({ game: session });
  } catch (_error) {
    return res.status(500).json({ error: "Unexpected error loading game session." });
  }
});

app.post("/api/game-move", async (req, res) => {
  try {
    const name = (req.body?.name || "").trim();
    const direction = (req.body?.direction || "").trim().toLowerCase();

    if (!name || !direction) {
      return res.status(400).json({ error: "Name and direction are required." });
    }

    const db = await readUsersDb();
    const user = findUserByName(db, name);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    user.desktopData.gameState = movePlayer(user, direction);
    touchGameSession(user, { running: true });
    user.desktopData.gameState.lastSavedAt = nowIso();

    await writeUsersDb(db);
    return res.json({ game: serializeGameSession(user, db) });
  } catch (_error) {
    return res.status(500).json({ error: "Unexpected error moving player." });
  }
});

app.post("/api/game-session/stop", async (req, res) => {
  try {
    const name = (req.body?.name || "").trim();
    if (!name) {
      return res.status(400).json({ error: "Name is required." });
    }

    const db = await readUsersDb();
    const user = findUserByName(db, name);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    touchGameSession(user, { running: false });
    await writeUsersDb(db);

    return res.json({ message: "Game session stopped." });
  } catch (_error) {
    return res.status(500).json({ error: "Unexpected error stopping game session." });
  }
});

app.post("/api/register", async (req, res) => {
  try {
    const name = (req.body?.name || "").trim();
    const password = (req.body?.password || "").trim();

    if (!name || !password) {
      return res.status(400).json({ error: "Name and password are required." });
    }

    if (name.length < 3) {
      return res.status(400).json({ error: "Name must have at least 3 characters." });
    }

    if (password.length < 4) {
      return res.status(400).json({ error: "Password must have at least 4 characters." });
    }

    const db = await readUsersDb();
    const existingUser = db.users.find((user) => user.name.toLowerCase() === name.toLowerCase());

    if (existingUser) {
      return res.status(409).json({ error: "Name already exists." });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const desktopData = createDefaultDesktopData(name);
    desktopData.gameState.running = true;
    desktopData.gameState.sessionStartedAt = nowIso();
    desktopData.gameState.lastSeenAt = desktopData.gameState.sessionStartedAt;
    desktopData.gameState.lastSavedAt = desktopData.gameState.sessionStartedAt;
    desktopData.gamePreview = buildGamePreview(desktopData.gameState);

    db.users.push({
      id: Date.now().toString(),
      name,
      passwordHash,
      createdAt: nowIso(),
      profile: createDefaultProfile(name),
      desktopData
    });

    await writeUsersDb(db);

    return res.status(201).json({
      message: "Account created successfully.",
      user: { name }
    });
  } catch (_error) {
    return res.status(500).json({ error: "Unexpected error during registration." });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const name = (req.body?.name || "").trim();
    const password = (req.body?.password || "").trim();

    if (!name || !password) {
      return res.status(400).json({ error: "Name and password are required." });
    }

    const db = await readUsersDb();
    const user = findUserByName(db, name);

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);

    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    touchGameSession(user, { running: true });
    await writeUsersDb(db);

    return res.json({
      message: "Login successful.",
      user: { name: user.name }
    });
  } catch (_error) {
    return res.status(500).json({ error: "Unexpected error during login." });
  }
});

function startServer(port, attempt = 0) {
  const server = app.listen(port, "127.0.0.1", () => {
    console.log(`2DBox server running on http://127.0.0.1:${port}`);
  });

  server.on("error", (error) => {
    const shouldRetry = (error.code === "EADDRINUSE" || error.code === "EACCES") && !process.env.PORT;

    if (shouldRetry && attempt < MAX_PORT_TRIES) {
      const nextPort = port + 1;
      console.warn(`Port ${port} is busy. Trying ${nextPort}...`);
      startServer(nextPort, attempt + 1);
      return;
    }

    console.error("Failed to start server:", error.message);
    process.exit(1);
  });
}

startServer(START_PORT);








