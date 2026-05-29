import { apiRequest, buildQuery } from "./services.js";

const userName = localStorage.getItem("authUser");

if (!userName) {
  window.location.href = "/";
}

const i18n = {
  en: {
    "window.friends": "Friend List",
    "window.game": "Game Preview",
    "window.notifications": "Notifications",
    "window.messages": "Message Box",
    "window.feed": "Social Feed",
    "window.config": "Configurations",
    "task.friends": "Friend List",
    "task.game": "Game Preview",
    "task.notifications": "Notifications",
    "task.messages": "Message Box",
    "task.feed": "Social Feed",
    "task.config": "Configurations",
    "auth.logout": "Logout",
    "friend.search": "Search friend",
    "friend.searchUser": "Search user",
    "friend.mode.add": "Add",
    "friend.mode.back": "Back",
    "friend.filter.all": "All",
    "friend.filter.accepted": "Friends",
    "friend.filter.pending": "Pending",
    "friend.status.pending": "Pending",
    "friend.status.accepted": "Friend",
    "friend.status.other": "Other",
    "friend.action.accept": "Accept",
    "friend.action.decline": "Decline",
    "friend.action.remove": "Remove",
    "friend.action.add": "Add",
    "friends.searchEmpty": "No users found.",
    "friends.added": "Friend added.",
    "friends.inviteSent": "Invite sent.",
    "friends.empty": "No matching friends.",
    "notifications.markAll": "Mark all as read",
    "notifications.clear": "Clear",
    "notifications.empty": "No notifications.",
    "dynamic.notification.houseVisits": "Your house got 3 new visits.",
    "dynamic.notification.friendAcceptedBy": "{name} accepted your friend request.",
    "dynamic.notification.friendRequestFrom": "{name} sent you a friend request.",
    "dynamic.notification.guestbookMessage": "{name} left a message on your guestbook.",
    "dynamic.notification.nowFriend": "{name} is now your friend.",
    "dynamic.notification.sentMessage": "You sent a message to {name}.",
    "messages.conversation": "Conversation",
    "messages.placeholder": "Type a message",
    "messages.send": "Send",
    "messages.delete": "Delete",
    "messages.emptyConversation": "No conversations",
    "messages.empty": "Start your first conversation.",
    "messages.notFound": "Conversation not found.",
    "messages.noMessages": "No messages yet.",
    "messages.friendsOnly": "You can only send messages to friends.",
    "messages.deleted": "Conversation deleted.",
    "feed.empty": "No feed events yet.",
    "dynamic.feed.acceptedFriend": "You accepted {name}'s friend request.",
    "dynamic.feed.declinedFriend": "You declined {name}'s friend request.",
    "dynamic.feed.removedFriend": "You removed {name} from your friends.",
    "dynamic.feed.friendRequest": "{name} sent you a friend request.",
    "dynamic.feed.houseWallpaper": "{name} changed house wallpaper.",
    "dynamic.feed.parkInvite": "{name} invited friends to the park.",
    "dynamic.feed.sentMessage": "{from} sent a message to {to}.",
    "dynamic.message.parkSoon": "Park in 5 min?",
    "dynamic.message.joinSoon": "Yes, I will join.",
    "dynamic.message.updatedLayout": "I updated my room layout.",
    "game.loadingZone": "Loading zone...",
    "game.loadingMeta": "Loading game preview...",
    "game.meta": "{theme} - Last park visit: {visit} - Visitors today: {visitors}",
    "config.section.personalize": "Personalize",
    "config.section.language": "Language",
    "config.section.sound": "Sound Options",
    "config.wallpaper": "Wallpaper Color",
    "config.border": "Window Border Color",
    "config.theme": "Theme Color",
    "config.language": "Language",
    "config.soundEnabled": "Sound enabled",
    "config.save": "Save",
    "config.saving": "Saving...",
    "config.saved": "Configurations saved.",
    "language.english": "English",
    "language.ptbr": "Portuguese (Brazil)",
    "welcome.summary": "Logged as {name} - Friends: {friends} - Unread: {unread}"
  },
  "pt-BR": {
    "window.friends": "Lista de Amigos",
    "window.game": "Previa do Jogo",
    "window.notifications": "Notificacoes",
    "window.messages": "Caixa de Mensagens",
    "window.feed": "Feed Social",
    "window.config": "Configuracoes",
    "task.friends": "Lista de Amigos",
    "task.game": "Previa do Jogo",
    "task.notifications": "Notificacoes",
    "task.messages": "Mensagens",
    "task.feed": "Feed Social",
    "task.config": "Configuracoes",
    "auth.logout": "Sair",
    "friend.search": "Buscar amigo",
    "friend.searchUser": "Buscar usuario",
    "friend.mode.add": "Adicionar",
    "friend.mode.back": "Voltar",
    "friend.filter.all": "Todos",
    "friend.filter.accepted": "Amigos",
    "friend.filter.pending": "Pendentes",
    "friend.status.pending": "Pendente",
    "friend.status.accepted": "Amigo",
    "friend.status.other": "Outro",
    "friend.action.accept": "Aceitar",
    "friend.action.decline": "Recusar",
    "friend.action.remove": "Remover",
    "friend.action.add": "Adicionar",
    "friends.searchEmpty": "Nenhum usuario encontrado.",
    "friends.added": "Amigo adicionado.",
    "friends.inviteSent": "Convite enviado.",
    "friends.empty": "Nenhum amigo encontrado.",
    "notifications.markAll": "Marcar todas como lidas",
    "notifications.clear": "Limpar",
    "notifications.empty": "Sem notificacoes.",
    "dynamic.notification.houseVisits": "Seu quarto recebeu 3 novas visitas.",
    "dynamic.notification.friendAcceptedBy": "{name} aceitou seu pedido de amizade.",
    "dynamic.notification.friendRequestFrom": "{name} enviou um pedido de amizade para voce.",
    "dynamic.notification.guestbookMessage": "{name} deixou uma mensagem no seu mural.",
    "dynamic.notification.nowFriend": "{name} agora e seu amigo.",
    "dynamic.notification.sentMessage": "Voce enviou uma mensagem para {name}.",
    "messages.conversation": "Conversa",
    "messages.placeholder": "Digite uma mensagem",
    "messages.send": "Enviar",
    "messages.delete": "Excluir",
    "messages.emptyConversation": "Sem conversas",
    "messages.empty": "Comece sua primeira conversa.",
    "messages.notFound": "Conversa nao encontrada.",
    "messages.noMessages": "Sem mensagens ainda.",
    "messages.friendsOnly": "Voce so pode enviar mensagens para amigos.",
    "messages.deleted": "Conversa excluida.",
    "feed.empty": "Sem eventos no feed.",
    "dynamic.feed.acceptedFriend": "Voce aceitou o pedido de amizade de {name}.",
    "dynamic.feed.declinedFriend": "Voce recusou o pedido de amizade de {name}.",
    "dynamic.feed.removedFriend": "Voce removeu {name} dos seus amigos.",
    "dynamic.feed.friendRequest": "{name} enviou um pedido de amizade para voce.",
    "dynamic.feed.houseWallpaper": "{name} mudou o papel de parede da casa.",
    "dynamic.feed.parkInvite": "{name} convidou amigos para o parque.",
    "dynamic.feed.sentMessage": "{from} enviou uma mensagem para {to}.",
    "dynamic.message.parkSoon": "Parque em 5 min?",
    "dynamic.message.joinSoon": "Sim, eu vou entrar.",
    "dynamic.message.updatedLayout": "Atualizei o layout do meu quarto.",
    "game.loadingZone": "Carregando area...",
    "game.loadingMeta": "Carregando previa do jogo...",
    "game.meta": "{theme} - Ultima visita ao parque: {visit} - Visitantes hoje: {visitors}",
    "config.section.personalize": "Personalizar",
    "config.section.language": "Idioma",
    "config.section.sound": "Opcoes de Som",
    "config.wallpaper": "Cor do Papel de Parede",
    "config.border": "Cor da Borda da Janela",
    "config.theme": "Cor do Tema",
    "config.language": "Idioma",
    "config.soundEnabled": "Som ativado",
    "config.save": "Salvar",
    "config.saving": "Salvando...",
    "config.saved": "Configuracoes salvas.",
    "language.english": "Ingles",
    "language.ptbr": "Portugues (Brasil)",
    "welcome.summary": "Logado como {name} - Amigos: {friends} - Nao lidas: {unread}"
  }
};

const windows = Array.from(document.querySelectorAll(".desktop-window"));
const taskButtons = Array.from(document.querySelectorAll("[data-open]"));
const closeButtons = Array.from(document.querySelectorAll("[data-close]"));
const minimizeButtons = Array.from(document.querySelectorAll("[data-minimize]"));
const maximizeButtons = Array.from(document.querySelectorAll("[data-maximize]"));
const welcomeText = document.getElementById("welcome-text");
const clock = document.getElementById("clock");

const friendsList = document.getElementById("friends-list");
const friendSearchInput = document.getElementById("friend-search");
const friendFilterSelect = document.getElementById("friend-filter");
const friendModeToggleBtn = document.getElementById("friend-mode-toggle");
const notificationsList = document.getElementById("notifications-list");
const markAllReadBtn = document.getElementById("mark-all-read");
const clearNotificationsBtn = document.getElementById("clear-notifications");
const notificationBadge = document.getElementById("notification-badge");
const conversationSelect = document.getElementById("message-conversation");
const deleteConversationBtn = document.getElementById("delete-conversation");
const messagesList = document.getElementById("messages-list");
const messageForm = document.getElementById("message-form");
const messageInput = document.getElementById("message-input");
const feedList = document.getElementById("social-feed-list");
const gameZone = document.getElementById("game-zone");
const gameMeta = document.getElementById("game-meta");
const configForm = document.getElementById("config-form");
const wallpaperColorInput = document.getElementById("wallpaper-color");
const borderColorInput = document.getElementById("border-color");
const themeColorInput = document.getElementById("theme-color");
const soundEnabledInput = document.getElementById("sound-enabled");
const languageSelect = document.getElementById("language-select");
const configStatus = document.getElementById("config-status");
const configTabs = Array.from(document.querySelectorAll("[data-config-section]"));
const configPanels = Array.from(document.querySelectorAll("[data-config-panel]"));

const state = {
  conversations: [],
  friends: [],
  userSearchResults: [],
  friendMode: "friends",
  notifications: [],
  feed: [],
  gamePreview: null,
  themeColor: "#2f6eb1",
  soundEnabled: true,
  lastUnreadNotificationCount: 0,
  hasLoadedNotifications: false,
  summary: {
    friendCount: 0,
    unreadNotifications: 0
  },
  language: "en"
};

let highestZ = 20;
let audioContext = null;
const layoutStorageKey = `desktopLayout:${userName}`;
const FRIEND_OPTION_PREFIX = "friend:";

function getWorkspaceHeight() {
  return Math.max(180, window.innerHeight - 56);
}

function isWindowMaximized(win) {
  return win.classList.contains("maximized");
}

function getWindowFromName(windowName) {
  return document.querySelector(`[data-window="${windowName}"]`);
}

function getMaximizeButton(win) {
  return win ? win.querySelector(`[data-maximize="${win.dataset.window}"]`) : null;
}

function setMaximizeButtonState(win) {
  const button = getMaximizeButton(win);
  if (!button) {
    return;
  }

  button.textContent = isWindowMaximized(win) ? "❐" : "□";
}

function maximizeWindow(win) {
  if (!win || isWindowMaximized(win)) {
    return;
  }

  const rect = win.getBoundingClientRect();
  win.dataset.restoreLeft = `${rect.left}px`;
  win.dataset.restoreTop = `${rect.top}px`;
  win.dataset.restoreWidth = `${rect.width}px`;
  win.dataset.restoreHeight = `${rect.height}px`;

  win.classList.add("maximized");
  win.style.left = "0px";
  win.style.top = "0px";
  win.style.width = `${window.innerWidth}px`;
  win.style.height = `${getWorkspaceHeight()}px`;
  setMaximizeButtonState(win);
}

function restoreWindow(win) {
  if (!win || !isWindowMaximized(win)) {
    return;
  }

  win.classList.remove("maximized");

  if (win.dataset.restoreLeft) {
    win.style.left = win.dataset.restoreLeft;
  }

  if (win.dataset.restoreTop) {
    win.style.top = win.dataset.restoreTop;
  }

  if (win.dataset.restoreWidth) {
    win.style.width = win.dataset.restoreWidth;
  }

  if (win.dataset.restoreHeight) {
    win.style.height = win.dataset.restoreHeight;
  }

  keepInViewport(win);
  setMaximizeButtonState(win);
}

function toggleMaximizeWindow(win) {
  if (!win) {
    return;
  }

  if (isWindowMaximized(win)) {
    restoreWindow(win);
  } else {
    maximizeWindow(win);
  }
}

function serializeWindowLayout() {
  const layout = {};

  windows.forEach((win) => {
    const rect = win.getBoundingClientRect();
    layout[win.dataset.window] = {
      left: win.style.left || `${rect.left}px`,
      top: win.style.top || `${rect.top}px`,
      width: win.style.width || `${rect.width}px`,
      height: win.style.height || `${rect.height}px`,
      hidden: win.classList.contains("hidden"),
      maximized: win.classList.contains("maximized"),
      zIndex: Number(win.style.zIndex || 20),
      restoreLeft: win.dataset.restoreLeft || null,
      restoreTop: win.dataset.restoreTop || null,
      restoreWidth: win.dataset.restoreWidth || null,
      restoreHeight: win.dataset.restoreHeight || null
    };
  });

  return layout;
}

function saveWindowLayout() {
  try {
    localStorage.setItem(layoutStorageKey, JSON.stringify(serializeWindowLayout()));
  } catch (_error) {
    // Ignore storage failures and keep runtime interaction working.
  }
}

function restoreWindowLayout() {
  try {
    const raw = localStorage.getItem(layoutStorageKey);
    if (!raw) {
      windows.forEach((win) => setMaximizeButtonState(win));
      return;
    }

    const layout = JSON.parse(raw);
    let maxZ = highestZ;

    windows.forEach((win) => {
      const saved = layout[win.dataset.window];
      if (!saved) {
        setMaximizeButtonState(win);
        return;
      }

      if (saved.left) {
        win.style.left = saved.left;
      }

      if (saved.top) {
        win.style.top = saved.top;
      }

      if (saved.width) {
        win.style.width = saved.width;
      }

      if (saved.height) {
        win.style.height = saved.height;
      }

      if (typeof saved.zIndex === "number") {
        win.style.zIndex = String(saved.zIndex);
        maxZ = Math.max(maxZ, saved.zIndex);
      }

      win.dataset.restoreLeft = saved.restoreLeft || "";
      win.dataset.restoreTop = saved.restoreTop || "";
      win.dataset.restoreWidth = saved.restoreWidth || "";
      win.dataset.restoreHeight = saved.restoreHeight || "";

      win.classList.toggle("hidden", Boolean(saved.hidden));
      win.classList.toggle("maximized", Boolean(saved.maximized));

      if (saved.maximized) {
        win.style.left = "0px";
        win.style.top = "0px";
        win.style.width = `${window.innerWidth}px`;
        win.style.height = `${getWorkspaceHeight()}px`;
      } else {
        keepInViewport(win);
      }

      setMaximizeButtonState(win);
    });

    highestZ = maxZ;
  } catch (_error) {
    windows.forEach((win) => setMaximizeButtonState(win));
  }
}

function ensureAudioContext() {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) {
    return null;
  }

  if (!audioContext) {
    audioContext = new AudioCtx();
  }

  if (audioContext.state === "suspended") {
    audioContext.resume().catch(() => {});
  }

  return audioContext;
}

function playTone({ frequency, duration, gain = 0.04, type = "sine" }) {
  if (!state.soundEnabled) {
    return;
  }

  const ctx = ensureAudioContext();
  if (!ctx) {
    return;
  }

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const amp = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(frequency, now);

  amp.gain.setValueAtTime(0.0001, now);
  amp.gain.exponentialRampToValueAtTime(gain, now + 0.01);
  amp.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  osc.connect(amp);
  amp.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + duration + 0.02);
}

function playUiClickSound() {
  playTone({ frequency: 660, duration: 0.06, gain: 0.025, type: "triangle" });
}

function playNotificationSound() {
  playTone({ frequency: 720, duration: 0.08, gain: 0.04, type: "triangle" });
  setTimeout(() => {
    playTone({ frequency: 920, duration: 0.09, gain: 0.05, type: "triangle" });
  }, 70);
}

function normalizeLanguage(value) {
  const normalized = (value || "").trim().toLowerCase();
  if (normalized === "pt-br" || normalized === "ptbr" || normalized === "portuguese" || normalized === "portugues") {
    return "pt-BR";
  }

  return "en";
}

function normalizeHexColor(value, fallback = "#2f6eb1") {
  const candidate = String(value || "").trim();
  return /^#[0-9a-fA-F]{6}$/.test(candidate) ? candidate.toLowerCase() : fallback;
}

function mixColors(colorA, colorB, amount) {
  const a = normalizeHexColor(colorA, "#2f6eb1");
  const b = normalizeHexColor(colorB, "#000000");
  const t = Math.min(1, Math.max(0, amount));

  const ar = parseInt(a.slice(1, 3), 16);
  const ag = parseInt(a.slice(3, 5), 16);
  const ab = parseInt(a.slice(5, 7), 16);
  const br = parseInt(b.slice(1, 3), 16);
  const bg = parseInt(b.slice(3, 5), 16);
  const bb = parseInt(b.slice(5, 7), 16);

  const rr = Math.round(ar + (br - ar) * t);
  const rg = Math.round(ag + (bg - ag) * t);
  const rb = Math.round(ab + (bb - ab) * t);

  return `#${rr.toString(16).padStart(2, "0")}${rg.toString(16).padStart(2, "0")}${rb.toString(16).padStart(2, "0")}`;
}

function applyThemeColor(themeColor) {
  const base = normalizeHexColor(themeColor, "#2f6eb1");
  const root = document.documentElement;

  root.style.setProperty("--theme-primary", base);
  root.style.setProperty("--theme-primary-dark", mixColors(base, "#000000", 0.28));
  root.style.setProperty("--theme-primary-darker", mixColors(base, "#000000", 0.45));
  root.style.setProperty("--theme-primary-hover", mixColors(base, "#000000", 0.3));
  root.style.setProperty("--theme-primary-border", mixColors(base, "#000000", 0.52));
  root.style.setProperty("--theme-primary-soft", mixColors(base, "#ffffff", 0.75));
  root.style.setProperty("--theme-primary-soft-hover", mixColors(base, "#ffffff", 0.68));
  root.style.setProperty("--theme-input-border", mixColors(base, "#ffffff", 0.58));
  root.style.setProperty("--theme-surface", mixColors(base, "#ffffff", 0.78));
  root.style.setProperty("--theme-surface-border", mixColors(base, "#ffffff", 0.64));
  root.style.setProperty("--theme-chip-text", mixColors(base, "#000000", 0.48));
  root.style.setProperty("--theme-chip-bg", mixColors(base, "#ffffff", 0.72));
  root.style.setProperty("--theme-taskbar-bg", mixColors(base, "#000000", 0.76));
  root.style.setProperty("--theme-taskbar-border", mixColors(base, "#000000", 0.58));
  root.style.setProperty("--theme-unread-border", mixColors(base, "#ffffff", 0.4));
  root.style.setProperty("--theme-unread-bg", mixColors(base, "#ffffff", 0.67));
  root.style.setProperty("--theme-dashed", mixColors(base, "#000000", 0.18));
  root.style.setProperty("--theme-board-a", mixColors(base, "#ffffff", 0.68));
  root.style.setProperty("--theme-board-b", mixColors(base, "#ffffff", 0.74));
  root.style.setProperty("--theme-board-text", mixColors(base, "#000000", 0.48));

  state.themeColor = base;
  themeColorInput.value = base;
}

function t(key) {
  const lang = i18n[state.language] || i18n.en;
  return lang[key] || i18n.en[key] || key;
}

function tf(key, vars = {}) {
  return Object.entries(vars).reduce((acc, [name, value]) => acc.replaceAll(`{${name}}`, String(value)), t(key));
}

function localizeByPattern(text, patterns) {
  if (!text) {
    return text;
  }

  for (const pattern of patterns) {
    const match = text.match(pattern.regex);
    if (match) {
      return tf(pattern.key, pattern.vars ? pattern.vars(match) : {});
    }
  }

  return text;
}

function localizeNotificationText(text) {
  const patterns = [
    { regex: /^Your house got 3 new visits\.$/i, key: "dynamic.notification.houseVisits" },
    { regex: /^Seu quarto recebeu 3 novas visitas\.$/i, key: "dynamic.notification.houseVisits" },
    {
      regex: /^(.+?) accepted your friend request\.$/i,
      key: "dynamic.notification.friendAcceptedBy",
      vars: (m) => ({ name: m[1] })
    },
    {
      regex: /^(.+?) aceitou seu pedido de amizade\.$/i,
      key: "dynamic.notification.friendAcceptedBy",
      vars: (m) => ({ name: m[1] })
    },
    {
      regex: /^(.+?) sent you a friend request\.$/i,
      key: "dynamic.notification.friendRequestFrom",
      vars: (m) => ({ name: m[1] })
    },
    {
      regex: /^(.+?) enviou um pedido de amizade para voce\.$/i,
      key: "dynamic.notification.friendRequestFrom",
      vars: (m) => ({ name: m[1] })
    },
    {
      regex: /^(.+?) left a message on your guestbook\.$/i,
      key: "dynamic.notification.guestbookMessage",
      vars: (m) => ({ name: m[1] })
    },
    {
      regex: /^(.+?) deixou uma mensagem no seu mural\.$/i,
      key: "dynamic.notification.guestbookMessage",
      vars: (m) => ({ name: m[1] })
    },
    {
      regex: /^(.+?) is now your friend\.$/i,
      key: "dynamic.notification.nowFriend",
      vars: (m) => ({ name: m[1] })
    },
    {
      regex: /^(.+?) agora e seu amigo\.$/i,
      key: "dynamic.notification.nowFriend",
      vars: (m) => ({ name: m[1] })
    },
    {
      regex: /^You sent a message to (.+?)\.$/i,
      key: "dynamic.notification.sentMessage",
      vars: (m) => ({ name: m[1] })
    },
    {
      regex: /^Voce enviou uma mensagem para (.+?)\.$/i,
      key: "dynamic.notification.sentMessage",
      vars: (m) => ({ name: m[1] })
    }
  ];

  return localizeByPattern(text, patterns);
}

function localizeFeedText(text) {
  const patterns = [
    {
      regex: /^You accepted (.+?)'s friend request\.$/i,
      key: "dynamic.feed.acceptedFriend",
      vars: (m) => ({ name: m[1] })
    },
    {
      regex: /^Voce aceitou o pedido de amizade de (.+?)\.$/i,
      key: "dynamic.feed.acceptedFriend",
      vars: (m) => ({ name: m[1] })
    },
    {
      regex: /^You declined (.+?)'s friend request\.$/i,
      key: "dynamic.feed.declinedFriend",
      vars: (m) => ({ name: m[1] })
    },
    {
      regex: /^Voce recusou o pedido de amizade de (.+?)\.$/i,
      key: "dynamic.feed.declinedFriend",
      vars: (m) => ({ name: m[1] })
    },
    {
      regex: /^You removed (.+?) from your friends\.$/i,
      key: "dynamic.feed.removedFriend",
      vars: (m) => ({ name: m[1] })
    },
    {
      regex: /^Voce removeu (.+?) dos seus amigos\.$/i,
      key: "dynamic.feed.removedFriend",
      vars: (m) => ({ name: m[1] })
    },
    {
      regex: /^(.+?) sent you a friend request\.$/i,
      key: "dynamic.feed.friendRequest",
      vars: (m) => ({ name: m[1] })
    },
    {
      regex: /^(.+?) enviou um pedido de amizade para voce\.$/i,
      key: "dynamic.feed.friendRequest",
      vars: (m) => ({ name: m[1] })
    },
    {
      regex: /^(.+?) changed house wallpaper\.$/i,
      key: "dynamic.feed.houseWallpaper",
      vars: (m) => ({ name: m[1] })
    },
    {
      regex: /^(.+?) mudou o papel de parede da casa\.$/i,
      key: "dynamic.feed.houseWallpaper",
      vars: (m) => ({ name: m[1] })
    },
    {
      regex: /^(.+?) invited friends to the park\.$/i,
      key: "dynamic.feed.parkInvite",
      vars: (m) => ({ name: m[1] })
    },
    {
      regex: /^(.+?) convidou amigos para o parque\.$/i,
      key: "dynamic.feed.parkInvite",
      vars: (m) => ({ name: m[1] })
    },
    {
      regex: /^(.+?) sent a message to (.+?)\.$/i,
      key: "dynamic.feed.sentMessage",
      vars: (m) => ({ from: m[1], to: m[2] })
    },
    {
      regex: /^(.+?) enviou uma mensagem para (.+?)\.$/i,
      key: "dynamic.feed.sentMessage",
      vars: (m) => ({ from: m[1], to: m[2] })
    }
  ];

  return localizeByPattern(text, patterns);
}

function localizeMessageText(text) {
  const patterns = [
    { regex: /^Park in 5 min\?$/i, key: "dynamic.message.parkSoon" },
    { regex: /^Parque em 5 min\?$/i, key: "dynamic.message.parkSoon" },
    { regex: /^Yes, I will join\.$/i, key: "dynamic.message.joinSoon" },
    { regex: /^Sim, eu vou entrar\.$/i, key: "dynamic.message.joinSoon" },
    { regex: /^I updated my room layout\.$/i, key: "dynamic.message.updatedLayout" },
    { regex: /^Atualizei o layout do meu quarto\.$/i, key: "dynamic.message.updatedLayout" }
  ];

  return localizeByPattern(text, patterns);
}

function applyLanguage(language) {
  state.language = normalizeLanguage(language);
  document.documentElement.lang = state.language;

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    node.placeholder = t(node.dataset.i18nPlaceholder);
  });

  friendModeToggleBtn.textContent = state.friendMode === "add" ? t("friend.mode.back") : t("friend.mode.add");
  friendSearchInput.placeholder = state.friendMode === "add" ? t("friend.searchUser") : t("friend.search");

  languageSelect.value = state.language;
  updateWelcome();
  renderFriends();
  renderNotifications(state.notifications);
  renderFeed(state.feed);
  if (conversationSelect.options.length) {
    renderThread(conversationSelect.value);
  }

  if (state.gamePreview) {
    renderGamePreview(state.gamePreview);
  }
}

function openConfigSection(section) {
  configTabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.configSection === section);
  });

  configPanels.forEach((panel) => {
    panel.classList.toggle("hidden", panel.dataset.configPanel !== section);
  });
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function bringToFront(win) {
  highestZ += 1;
  win.style.zIndex = String(highestZ);
}

function keepInViewport(win) {
  if (isWindowMaximized(win)) {
    return;
  }

  const rect = win.getBoundingClientRect();
  const maxLeft = Math.max(0, window.innerWidth - rect.width);
  const maxTop = Math.max(0, window.innerHeight - rect.height - 56);

  const left = clamp(rect.left, 0, maxLeft);
  const top = clamp(rect.top, 0, maxTop);

  win.style.left = `${left}px`;
  win.style.top = `${top}px`;
}

function makeDraggable(win) {
  const bar = win.querySelector(".window-titlebar");
  if (!bar) {
    return;
  }

  let dragState = null;

  bar.addEventListener("pointerdown", (event) => {
    if (event.target.closest("button")) {
      return;
    }

    if (isWindowMaximized(win)) {
      return;
    }

    const rect = win.getBoundingClientRect();
    dragState = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      left: rect.left,
      top: rect.top
    };

    bringToFront(win);
    bar.setPointerCapture(event.pointerId);
    event.preventDefault();
  });

  bar.addEventListener("pointermove", (event) => {
    if (!dragState || event.pointerId !== dragState.pointerId) {
      return;
    }

    const dx = event.clientX - dragState.startX;
    const dy = event.clientY - dragState.startY;

    const maxLeft = Math.max(0, window.innerWidth - win.offsetWidth);
    const maxTop = Math.max(0, window.innerHeight - win.offsetHeight - 56);

    const nextLeft = clamp(dragState.left + dx, 0, maxLeft);
    const nextTop = clamp(dragState.top + dy, 0, maxTop);

    win.style.left = `${nextLeft}px`;
    win.style.top = `${nextTop}px`;
  });

  bar.addEventListener("pointerup", (event) => {
    if (!dragState || event.pointerId !== dragState.pointerId) {
      return;
    }

    dragState = null;
    bar.releasePointerCapture(event.pointerId);
    saveWindowLayout();
  });

  bar.addEventListener("pointercancel", () => {
    dragState = null;
  });

  bar.addEventListener("dblclick", (event) => {
    if (event.target.closest("button")) {
      return;
    }

    toggleMaximizeWindow(win);
    saveWindowLayout();
  });
}

function makeResizable(win) {
  const RESIZE_MARGIN = 8;
  const MIN_WIDTH = 240;
  const MIN_HEIGHT = 180;

  const directionCursor = {
    n: "n-resize",
    s: "s-resize",
    e: "e-resize",
    w: "w-resize",
    ne: "ne-resize",
    nw: "nw-resize",
    se: "se-resize",
    sw: "sw-resize"
  };

  function getResizeDirection(event) {
    if (isWindowMaximized(win)) {
      return "";
    }

    const rect = win.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    const nearLeft = offsetX >= 0 && offsetX <= RESIZE_MARGIN;
    const nearRight = offsetX >= rect.width - RESIZE_MARGIN && offsetX <= rect.width;
    const nearTop = offsetY >= 0 && offsetY <= RESIZE_MARGIN;
    const nearBottom = offsetY >= rect.height - RESIZE_MARGIN && offsetY <= rect.height;

    if (nearTop && nearLeft) {
      return "nw";
    }

    if (nearTop && nearRight) {
      return "ne";
    }

    if (nearBottom && nearLeft) {
      return "sw";
    }

    if (nearBottom && nearRight) {
      return "se";
    }

    if (nearTop) {
      return "n";
    }

    if (nearBottom) {
      return "s";
    }

    if (nearLeft) {
      return "w";
    }

    if (nearRight) {
      return "e";
    }

    return "";
  }

  function updateHoverCursor(event) {
    const direction = getResizeDirection(event);
    win.style.cursor = directionCursor[direction] || "";
  }

  let resizeState = null;

  win.addEventListener("pointermove", (event) => {
    if (resizeState && event.pointerId === resizeState.pointerId) {
      return;
    }

    updateHoverCursor(event);
  });

  win.addEventListener("pointerleave", () => {
    if (!resizeState) {
      win.style.cursor = "";
    }
  });

  win.addEventListener("pointerdown", (event) => {
    if (isWindowMaximized(win)) {
      return;
    }

    if (event.target.closest("button") || event.target.closest("input, select, textarea")) {
      return;
    }

    const direction = getResizeDirection(event);
    if (!direction) {
      return;
    }

    const rect = win.getBoundingClientRect();
    resizeState = {
      direction,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      width: rect.width,
      height: rect.height,
      left: rect.left,
      top: rect.top
    };

    bringToFront(win);
    win.setPointerCapture(event.pointerId);
    win.style.cursor = directionCursor[direction] || "";
    event.preventDefault();
  });

  win.addEventListener("pointermove", (event) => {
    if (!resizeState || event.pointerId !== resizeState.pointerId) {
      return;
    }

    const dx = event.clientX - resizeState.startX;
    const dy = event.clientY - resizeState.startY;

    const minLeftForWidth = resizeState.left + resizeState.width - MIN_WIDTH;
    const minTopForHeight = resizeState.top + resizeState.height - MIN_HEIGHT;

    let nextLeft = resizeState.left;
    let nextTop = resizeState.top;
    let nextWidth = resizeState.width;
    let nextHeight = resizeState.height;

    if (resizeState.direction.includes("e")) {
      const maxWidth = window.innerWidth - resizeState.left;
      nextWidth = clamp(resizeState.width + dx, MIN_WIDTH, maxWidth);
    }

    if (resizeState.direction.includes("s")) {
      const maxHeight = getWorkspaceHeight() - resizeState.top;
      nextHeight = clamp(resizeState.height + dy, MIN_HEIGHT, maxHeight);
    }

    if (resizeState.direction.includes("w")) {
      nextLeft = clamp(resizeState.left + dx, 0, minLeftForWidth);
      nextWidth = resizeState.width - (nextLeft - resizeState.left);
    }

    if (resizeState.direction.includes("n")) {
      nextTop = clamp(resizeState.top + dy, 0, minTopForHeight);
      nextHeight = resizeState.height - (nextTop - resizeState.top);
    }

    win.style.left = `${nextLeft}px`;
    win.style.top = `${nextTop}px`;
    win.style.width = `${nextWidth}px`;
    win.style.height = `${nextHeight}px`;
  });

  win.addEventListener("pointerup", (event) => {
    if (!resizeState || event.pointerId !== resizeState.pointerId) {
      return;
    }

    resizeState = null;
    win.releasePointerCapture(event.pointerId);
    win.style.cursor = "";
    saveWindowLayout();
  });

  win.addEventListener("pointercancel", () => {
    resizeState = null;
    win.style.cursor = "";
  });
}

function updateWelcome() {
  welcomeText.textContent = tf("welcome.summary", {
    name: userName,
    friends: state.summary.friendCount,
    unread: state.summary.unreadNotifications
  });
}

function updateNotificationBadge(items) {
  const unread = items.filter((item) => !item.read).length;
  state.summary.unreadNotifications = unread;

  if (unread > 0) {
    notificationBadge.textContent = unread > 99 ? "99+" : String(unread);
    notificationBadge.classList.remove("hidden");
  } else {
    notificationBadge.classList.add("hidden");
  }
}

function currentFriendFilters() {
  return {
    search: friendSearchInput.value.trim().toLowerCase(),
    status: friendFilterSelect.value
  };
}

function filteredFriends() {
  const { search, status } = currentFriendFilters();
  return state.friends.filter((friend) => {
    const matchStatus = status === "all" || friend.status === status;
    const matchSearch = !search || friend.name.toLowerCase().includes(search);
    return matchStatus && matchSearch;
  });
}

function filteredUsersToAdd() {
  const search = friendSearchInput.value.trim().toLowerCase();
  return state.userSearchResults.filter((user) => !search || user.name.toLowerCase().includes(search));
}

function friendActionButtons(friend) {
  if (friend.status === "pending") {
    return `<button class=\"tiny-btn\" data-friend-action=\"accept\" data-friend-id=\"${friend.id}\">${t("friend.action.accept")}</button>
      <button class=\"tiny-btn warn\" data-friend-action=\"decline\" data-friend-id=\"${friend.id}\">${t("friend.action.decline")}</button>`;
  }

  if (friend.status === "accepted") {
    return `<button class=\"tiny-btn warn\" data-friend-action=\"remove\" data-friend-id=\"${friend.id}\">${t("friend.action.remove")}</button>`;
  }

  return "";
}

function renderFriends() {
  if (state.friendMode === "add") {
    renderUserSearchResults();
    return;
  }

  const items = filteredFriends();

  if (!items.length) {
    friendsList.innerHTML = `<li>${t("friends.empty")}</li>`;
    return;
  }

  friendsList.innerHTML = items
    .map((friend) => {
      const presenceClass = friend.presence === "online" ? "online" : friend.presence === "away" ? "away" : "offline";
      const statusText =
        friend.status === "pending"
          ? t("friend.status.pending")
          : friend.status === "accepted"
            ? t("friend.status.accepted")
            : t("friend.status.other");

      return `<li>
        <div class=\"friend-row\">
          <div class=\"friend-main\">
            <strong><span class=\"dot ${presenceClass}\"></span>${friend.name}</strong>
            <span class=\"status-chip\">${statusText}</span>
          </div>
          <div class=\"friend-actions\">${friendActionButtons(friend)}</div>
        </div>
      </li>`;
    })
    .join("");
}

function renderUserSearchResults() {
  const items = filteredUsersToAdd();

  if (!items.length) {
    friendsList.innerHTML = `<li>${t("friends.searchEmpty")}</li>`;
    return;
  }

  friendsList.innerHTML = items
    .map(
      (user) => `<li>
        <div class=\"friend-row\">
          <div class=\"friend-main\">
            <strong>${user.name}</strong>
          </div>
          <div class=\"friend-actions\">
            <button class=\"tiny-btn\" data-user-add=\"${user.name}\">${t("friend.action.add")}</button>
          </div>
        </div>
      </li>`
    )
    .join("");
}

function setFriendMode(mode) {
  state.friendMode = mode;
  const isAddMode = mode === "add";

  friendModeToggleBtn.classList.toggle("mode-add-active", isAddMode);
  friendModeToggleBtn.textContent = isAddMode ? t("friend.mode.back") : t("friend.mode.add");
  friendSearchInput.placeholder = isAddMode ? t("friend.searchUser") : t("friend.search");
  friendFilterSelect.disabled = isAddMode;

  if (!isAddMode) {
    state.userSearchResults = [];
  }

  renderFriends();
}

async function searchUsersToAdd() {
  const response = await apiRequest(buildQuery("/api/users/search", { name: userName, q: friendSearchInput.value.trim() }));
  state.userSearchResults = response.users || [];
  renderFriends();
}

async function addFriendByName(targetName) {
  await apiRequest("/api/friends/add", {
    method: "POST",
    body: JSON.stringify({ name: userName, targetName })
  });

  const [friends, notifications, feed] = await Promise.all([
    apiRequest(buildQuery("/api/friends", { name: userName })),
    apiRequest(buildQuery("/api/notifications", { name: userName })),
    apiRequest(buildQuery("/api/feed", { name: userName }))
  ]);

  state.friends = friends.friends || [];
  renderConversations(state.conversations, conversationSelect.value);
  renderNotifications(notifications.notifications || []);
  renderFeed(feed.feed || []);
  configStatus.textContent = t("friends.inviteSent");

  await searchUsersToAdd();
  await refreshSessionSummary();
}

function renderNotifications(items) {
  state.notifications = items;
  const unread = items.filter((item) => !item.read).length;

  if (state.hasLoadedNotifications && unread > state.lastUnreadNotificationCount) {
    playNotificationSound();
  }

  state.lastUnreadNotificationCount = unread;
  state.hasLoadedNotifications = true;

  updateNotificationBadge(items);

  if (!items.length) {
    notificationsList.innerHTML = `<li>${t("notifications.empty")}</li>`;
    return;
  }

  notificationsList.innerHTML = items
    .map((item) => `<li class=\"${item.read ? "" : "notif-unread"}\">${localizeNotificationText(item.text)}</li>`)
    .join("");
}

function isFriendConversationOption(value) {
  return value.startsWith(FRIEND_OPTION_PREFIX);
}

function getFriendNameFromOption(value) {
  return isFriendConversationOption(value) ? value.slice(FRIEND_OPTION_PREFIX.length) : "";
}

function updateDeleteConversationButton() {
  const selectedValue = conversationSelect.value || "";
  const canDelete = selectedValue && !isFriendConversationOption(selectedValue);
  deleteConversationBtn.disabled = !canDelete;
}

function getConversationOptions(items) {
  const options = items.map((item) => ({
    value: item.id,
    label: item.with,
    withUser: item.with
  }));

  const existingWithSet = new Set(items.map((item) => item.with.toLowerCase()));
  state.friends
    .filter((friend) => friend.status === "accepted" && !existingWithSet.has(friend.name.toLowerCase()))
    .forEach((friend) => {
      options.push({
        value: `${FRIEND_OPTION_PREFIX}${friend.name}`,
        label: friend.name,
        withUser: friend.name
      });
    });

  return options;
}

function renderConversations(items, preferredConversationId = "") {
  state.conversations = items;

  const options = getConversationOptions(items);

  if (!options.length) {
    conversationSelect.innerHTML = `<option value=\"\">${t("messages.emptyConversation")}</option>`;
    messagesList.innerHTML = `<li class=\"muted\">${t("messages.empty")}</li>`;
    updateDeleteConversationButton();
    return;
  }

  const currentSelection = preferredConversationId || conversationSelect.value;

  conversationSelect.innerHTML = options.map((item) => `<option value=\"${item.value}\">${item.label}</option>`).join("");

  const hasCurrentSelection = currentSelection && options.some((item) => item.value === currentSelection);
  const selectedConversationId = hasCurrentSelection ? currentSelection : options[0].value;

  conversationSelect.value = selectedConversationId;
  updateDeleteConversationButton();
  renderThread(selectedConversationId);
}

function renderThread(conversationId) {
  if (isFriendConversationOption(conversationId)) {
    messagesList.innerHTML = `<li class=\"muted\">${t("messages.noMessages")}</li>`;
    return;
  }

  const conversation = state.conversations.find((item) => item.id === conversationId);
  if (!conversation) {
    messagesList.innerHTML = `<li class=\"muted\">${t("messages.notFound")}</li>`;
    return;
  }

  if (!conversation.messages.length) {
    messagesList.innerHTML = `<li class=\"muted\">${t("messages.noMessages")}</li>`;
    return;
  }

  messagesList.innerHTML = conversation.messages
    .map((message) => `<li><strong>${message.from}:</strong> ${localizeMessageText(message.text)}</li>`)
    .join("");
  messagesList.scrollTop = messagesList.scrollHeight;
}

function renderFeed(items) {
  state.feed = items;

  if (!items.length) {
    feedList.innerHTML = `<li>${t("feed.empty")}</li>`;
    return;
  }

  feedList.innerHTML = items
    .map((event) => `<li><span class=\"status-chip\">${event.type}</span> ${localizeFeedText(event.text)}</li>`)
    .join("");
}

function renderGamePreview(gamePreview) {
  state.gamePreview = gamePreview;
  gameZone.textContent = gamePreview.zone || t("game.loadingZone");
  gameMeta.textContent = tf("game.meta", {
    theme: gamePreview.houseTheme || "-",
    visit: gamePreview.lastParkVisit || "-",
    visitors: gamePreview.visitorsToday ?? 0
  });
}

function applyConfig(config) {
  const wallpaperColor = config.wallpaperColor || "#3f76bf";
  const borderColor = config.borderColor || "#0f2b4a";
  const themeColor = config.themeColor || "#2f6eb1";
  const soundEnabled = Boolean(config.soundEnabled);
  const language = normalizeLanguage(config.language);

  document.documentElement.style.setProperty("--desktop-wallpaper", wallpaperColor);
  document.documentElement.style.setProperty("--window-border", borderColor);

  wallpaperColorInput.value = wallpaperColor;
  borderColorInput.value = borderColor;
  applyThemeColor(themeColor);
  soundEnabledInput.checked = soundEnabled;
  state.soundEnabled = soundEnabled;

  applyLanguage(language);
}

async function refreshSessionSummary() {
  const session = await apiRequest(buildQuery("/api/session", { name: userName }));
  state.summary.friendCount = session.summary.friendCount;
  state.summary.unreadNotifications = session.summary.unreadNotifications;
  updateWelcome();
}

async function loadWindowData() {
  const query = { name: userName };

  const [session, friends, notifications, messages, feed, config, gamePreview] = await Promise.all([
    apiRequest(buildQuery("/api/session", query)),
    apiRequest(buildQuery("/api/friends", query)),
    apiRequest(buildQuery("/api/notifications", query)),
    apiRequest(buildQuery("/api/messages", query)),
    apiRequest(buildQuery("/api/feed", query)),
    apiRequest(buildQuery("/api/config", query)),
    apiRequest(buildQuery("/api/game-preview", query))
  ]);

  state.summary.friendCount = session.summary.friendCount;
  state.summary.unreadNotifications = session.summary.unreadNotifications;
  state.friends = friends.friends || [];

  applyConfig(config.config || {});
  updateWelcome();
  renderFriends();
  renderNotifications(notifications.notifications || []);
  renderConversations(messages.conversations || []);
  renderFeed(feed.feed || []);
  renderGamePreview(gamePreview.gamePreview || {});
}

async function runFriendAction(action, friendId) {
  await apiRequest(`/api/friends/${action}`, {
    method: "POST",
    body: JSON.stringify({ name: userName, friendId })
  });

  const [friends, notifications, feed] = await Promise.all([
    apiRequest(buildQuery("/api/friends", { name: userName })),
    apiRequest(buildQuery("/api/notifications", { name: userName })),
    apiRequest(buildQuery("/api/feed", { name: userName }))
  ]);

  state.friends = friends.friends || [];
  renderFriends();
  renderConversations(state.conversations, conversationSelect.value);
  renderNotifications(notifications.notifications || []);
  renderFeed(feed.feed || []);
  await refreshSessionSummary();
}

async function markAllNotificationsRead() {
  await apiRequest("/api/notifications/mark-read", {
    method: "POST",
    body: JSON.stringify({ name: userName })
  });

  const notifications = await apiRequest(buildQuery("/api/notifications", { name: userName }));
  renderNotifications(notifications.notifications || []);
  await refreshSessionSummary();
}

async function clearNotifications() {
  await apiRequest("/api/notifications/clear", {
    method: "POST",
    body: JSON.stringify({ name: userName })
  });

  renderNotifications([]);
  await refreshSessionSummary();
}

async function sendMessage(event) {
  event.preventDefault();

  const selectedValue = conversationSelect.value;
  if (!selectedValue) {
    return;
  }

  const isFriendOption = isFriendConversationOption(selectedValue);
  const selectedConversation = isFriendOption
    ? null
    : state.conversations.find((item) => item.id === selectedValue) || state.conversations[0];

  const withUser = isFriendOption ? getFriendNameFromOption(selectedValue) : selectedConversation?.with;
  const selectedConversationId = isFriendOption ? "" : selectedConversation?.id || "";

  if (!withUser) {
    return;
  }

  const text = messageInput.value.trim();
  if (!text) {
    return;
  }

  await apiRequest("/api/messages", {
    method: "POST",
    body: JSON.stringify({ name: userName, with: withUser, text })
  });

  messageInput.value = "";

  const [messages, notifications, feed] = await Promise.all([
    apiRequest(buildQuery("/api/messages", { name: userName })),
    apiRequest(buildQuery("/api/notifications", { name: userName })),
    apiRequest(buildQuery("/api/feed", { name: userName }))
  ]);

  let preferredConversationId = selectedConversationId;
  if (!preferredConversationId) {
    const createdConversation = (messages.conversations || []).find(
      (item) => item.with.toLowerCase() === withUser.toLowerCase()
    );
    preferredConversationId = createdConversation?.id || "";
  }

  renderConversations(messages.conversations || [], preferredConversationId);
  renderNotifications(notifications.notifications || []);
  renderFeed(feed.feed || []);
  await refreshSessionSummary();
}

async function deleteConversation() {
  const conversationId = conversationSelect.value;
  if (!conversationId || isFriendConversationOption(conversationId)) {
    return;
  }

  await apiRequest("/api/messages/delete", {
    method: "POST",
    body: JSON.stringify({ name: userName, conversationId })
  });

  const [messages, notifications, feed] = await Promise.all([
    apiRequest(buildQuery("/api/messages", { name: userName })),
    apiRequest(buildQuery("/api/notifications", { name: userName })),
    apiRequest(buildQuery("/api/feed", { name: userName }))
  ]);

  renderConversations(messages.conversations || []);
  renderNotifications(notifications.notifications || []);
  renderFeed(feed.feed || []);
  configStatus.textContent = t("messages.deleted");
  await refreshSessionSummary();
}

async function saveConfig(event) {
  event.preventDefault();

  configStatus.textContent = t("config.saving");

  const payload = {
    name: userName,
    wallpaperColor: wallpaperColorInput.value,
    borderColor: borderColorInput.value,
    themeColor: themeColorInput.value,
    soundEnabled: soundEnabledInput.checked,
    language: normalizeLanguage(languageSelect.value)
  };

  const response = await apiRequest("/api/config", {
    method: "PUT",
    body: JSON.stringify(payload)
  });

  applyConfig(response.config || payload);
  configStatus.textContent = t("config.saved");
}

windows.forEach((win) => {
  makeDraggable(win);
  makeResizable(win);

  win.addEventListener("pointerdown", () => {
    bringToFront(win);
    saveWindowLayout();
  });
});

restoreWindowLayout();

document.addEventListener(
  "click",
  (event) => {
    const clickable = event.target.closest("button, .task-btn, .config-tab, select, input[type='checkbox']");
    if (clickable) {
      playUiClickSound();
    }
  },
  true
);

window.addEventListener(
  "pointerdown",
  () => {
    ensureAudioContext();
  },
  { once: true }
);

window.addEventListener(
  "keydown",
  () => {
    ensureAudioContext();
  },
  { once: true }
);

closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const windowName = button.dataset.close;
    const target = getWindowFromName(windowName);
    if (!target) {
      return;
    }

    target.classList.add("hidden");
    saveWindowLayout();
  });
});

minimizeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = getWindowFromName(button.dataset.minimize);
    if (!target) {
      return;
    }

    target.classList.add("hidden");
    saveWindowLayout();
  });
});

maximizeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = getWindowFromName(button.dataset.maximize);
    if (!target) {
      return;
    }

    bringToFront(target);
    toggleMaximizeWindow(target);
    saveWindowLayout();
  });
});

taskButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const windowName = button.dataset.open;
    const target = getWindowFromName(windowName);
    if (!target) {
      return;
    }

    target.classList.remove("hidden");
    bringToFront(target);
    keepInViewport(target);
    saveWindowLayout();
  });
});

friendsList.addEventListener("click", async (event) => {
  const userAddTarget = event.target.closest("[data-user-add]");
  if (userAddTarget) {
    try {
      await addFriendByName(userAddTarget.dataset.userAdd);
    } catch (error) {
      configStatus.textContent = error.message;
    }
    return;
  }

  const actionTarget = event.target.closest("[data-friend-action]");
  if (!actionTarget) {
    return;
  }

  try {
    await runFriendAction(actionTarget.dataset.friendAction, actionTarget.dataset.friendId);
  } catch (error) {
    configStatus.textContent = error.message;
  }
});

friendSearchInput.addEventListener("input", () => {
  if (state.friendMode === "add") {
    searchUsersToAdd().catch((error) => {
      configStatus.textContent = error.message;
    });
    return;
  }

  renderFriends();
});

friendFilterSelect.addEventListener("change", () => {
  renderFriends();
});

friendModeToggleBtn.addEventListener("click", () => {
  const nextMode = state.friendMode === "add" ? "friends" : "add";
  setFriendMode(nextMode);
  if (nextMode === "add") {
    searchUsersToAdd().catch((error) => {
      configStatus.textContent = error.message;
    });
  }
});

soundEnabledInput.addEventListener("change", () => {
  state.soundEnabled = soundEnabledInput.checked;
  if (state.soundEnabled) {
    playUiClickSound();
  }
});

themeColorInput.addEventListener("input", () => {
  applyThemeColor(themeColorInput.value);
});

configTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    openConfigSection(tab.dataset.configSection);
  });
});

window.addEventListener("resize", () => {
  windows.forEach((win) => {
    if (isWindowMaximized(win)) {
      win.style.left = "0px";
      win.style.top = "0px";
      win.style.width = `${window.innerWidth}px`;
      win.style.height = `${getWorkspaceHeight()}px`;
      return;
    }

    keepInViewport(win);
  });
  saveWindowLayout();
});

function updateClock() {
  clock.textContent = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
}

updateClock();
setInterval(updateClock, 1000 * 30);

markAllReadBtn.addEventListener("click", async () => {
  try {
    await markAllNotificationsRead();
  } catch (error) {
    configStatus.textContent = error.message;
  }
});

clearNotificationsBtn.addEventListener("click", async () => {
  try {
    await clearNotifications();
  } catch (error) {
    configStatus.textContent = error.message;
  }
});

conversationSelect.addEventListener("change", () => {
  updateDeleteConversationButton();
  renderThread(conversationSelect.value);
});

deleteConversationBtn.addEventListener("click", async () => {
  try {
    await deleteConversation();
  } catch (error) {
    configStatus.textContent = error.message;
  }
});

messageForm.addEventListener("submit", async (event) => {
  try {
    await sendMessage(event);
  } catch (error) {
    configStatus.textContent = error.message === "You can only send messages to friends." ? t("messages.friendsOnly") : error.message;
  }
});

configForm.addEventListener("submit", async (event) => {
  try {
    await saveConfig(event);
  } catch (error) {
    configStatus.textContent = error.message;
  }
});

document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("authUser");
  window.location.href = "/";
});

openConfigSection("personalize");
loadWindowData().catch((error) => {
  configStatus.textContent = error.message;
});
