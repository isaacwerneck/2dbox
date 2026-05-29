const express = require("express");
const fs = require("fs/promises");
const path = require("path");
const bcrypt = require("bcryptjs");

const app = express();
const START_PORT = Number(process.env.PORT) || 3000;
const MAX_PORT_TRIES = 20;
const DB_PATH = path.join(__dirname, "data", "users.json");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

function nowIso() {
  return new Date().toISOString();
}

function createDefaultDesktopData(userName) {
  return {
    friends: [],
    notifications: [],
    conversations: [],
    feed: [],
    config: {
      wallpaperColor: "#3f76bf",
      borderColor: "#0f2b4a",
      themeColor: "#2f6eb1",
      soundEnabled: true,
      language: "en"
    },
    gamePreview: {
      zone: "Starter House",
      lastParkVisit: "Today",
      houseTheme: "Blue Classic",
      visitorsToday: 3
    }
  };
}

function ensureUserState(user) {
  let changed = false;

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
    desktopData.config = { wallpaperColor: "#3f76bf", borderColor: "#0f2b4a", themeColor: "#2f6eb1", soundEnabled: true, language: "en" };
    changed = true;
  } else {
    if (!desktopData.config.borderColor) {
      desktopData.config.borderColor = "#0f2b4a";
      changed = true;
    }

    if (!desktopData.config.themeColor) {
      desktopData.config.themeColor = "#2f6eb1";
      changed = true;
    }

    const normalizedLanguage = normalizeLanguageValue(desktopData.config.language);
    if (desktopData.config.language !== normalizedLanguage) {
      desktopData.config.language = normalizedLanguage;
      changed = true;
    }
  }

  if (!desktopData.gamePreview) {
    desktopData.gamePreview = { zone: "Starter House", lastParkVisit: "Today", houseTheme: "Blue Classic", visitorsToday: 0 };
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
      user: { name: user.name, createdAt: user.createdAt },
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
      borderColor: req.body?.borderColor || user.desktopData.config.borderColor || "#0f2b4a",
      themeColor:
        typeof req.body?.themeColor === "string" && /^#[0-9a-fA-F]{6}$/.test(req.body.themeColor)
          ? req.body.themeColor
          : user.desktopData.config.themeColor || "#2f6eb1",
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

    return res.json({ gamePreview: user.desktopData.gamePreview });
  } catch (_error) {
    return res.status(500).json({ error: "Unexpected error loading game preview." });
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

    db.users.push({
      id: Date.now().toString(),
      name,
      passwordHash,
      createdAt: nowIso(),
      desktopData: createDefaultDesktopData(name)
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








