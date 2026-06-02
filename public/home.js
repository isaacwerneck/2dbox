import { apiRequest, buildQuery } from "./services.js";

const userName = localStorage.getItem("authUser");

if (!userName) {
  window.location.href = "/";
}

const i18n = {
  en: {
    "window.friends": "Friend List",
    "window.game": "Classic World",
    "window.notifications": "Notifications",
    "window.messages": "Message Box",
    "window.feed": "Social Feed",
    "window.profile": "Profile Options",
    "window.config": "Configurations",
    "task.friends": "Friend List",
    "task.game": "Classic World",
    "task.notifications": "Notifications",
    "task.messages": "Message Box",
    "task.feed": "Social Feed",
    "task.profile": "Profile",
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
    "profile.subtitle": "Update your name and icon.",
    "profile.changeIcon": "Change icon",
    "profile.crop": "Crop size",
    "profile.cropHint": "Drag the image to position it inside the circle.",
    "profile.resetCrop": "Reset crop",
    "profile.name": "Name",
    "profile.id": "ID",
    "profile.coins": "Coins",
    "profile.note": "Name changes affect login.",
    "profile.saving": "Saving profile...",
    "profile.save": "Save profile",
    "profile.saved": "Profile saved.",
    "profile.iconHelp": "PNG or JPEG only.",
    "profile.iconTooLarge": "Image must be under 1 MB.",
    "profile.iconInvalidType": "Use a PNG or JPEG image.",
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
    "game.loadingZone": "Loading world...",
    "game.loadingMeta": "Starting game session...",
    "game.connecting": "Connecting world state...",
    "game.meta": "{theme} - Online since: {since} - Visitors today: {visitors}",
    "game.position": "Zone: {zone} | X: {x} | Y: {y}",
    "game.help": "Move with WASD or arrow keys. Closing this window does not stop the session.",
    "game.status.running": "Game running in background.",
    "game.status.syncing": "Saving position...",
    "game.status.portal": "Warped to {zone}.",
    "game.status.offline": "Game session paused.",
    "config.section.personalize": "Personalize",
    "config.section.language": "Language",
    "config.section.security": "Privacy & Security",
    "config.section.sound": "Sound Options",
    "config.wallpaper": "Wallpaper Color",
    "config.windowBg": "Window Background Color",
    "config.border": "Window Border Color",
    "config.theme": "Theme Color",
    "config.text": "Text Color",
    "config.gameBackdrop": "Game Backdrop Color",
    "config.language": "Language",
    "config.soundEnabled": "Sound enabled",
    "config.save": "Save",
    "config.saving": "Saving...",
    "config.saved": "Configurations saved.",
    "security.currentPassword": "Current password",
    "security.nextPassword": "New password",
    "security.confirmPassword": "Confirm new password",
    "security.note": "You must confirm your current password before changing it.",
    "security.save": "Change password",
    "security.saving": "Updating password...",
    "security.saved": "Password updated.",
    "security.passwordMismatch": "New password and confirmation do not match.",
    "language.english": "English",
    "language.ptbr": "Portuguese (Brazil)",
    "avatarEditor.title": "Edit Image",
    "avatarEditor.cancel": "Cancel",
    "avatarEditor.apply": "Apply",
    "welcome.summary": "Logged as {name} - Friends: {friends} - Unread: {unread}"
  },
  "pt-BR": {
    "window.friends": "Lista de Amigos",
    "window.game": "Mundo Classico",
    "window.notifications": "Notificacoes",
    "window.messages": "Caixa de Mensagens",
    "window.feed": "Feed Social",
    "window.profile": "Perfil",
    "window.config": "Configuracoes",
    "task.friends": "Lista de Amigos",
    "task.game": "Mundo Classico",
    "task.notifications": "Notificacoes",
    "task.messages": "Mensagens",
    "task.feed": "Feed Social",
    "task.profile": "Perfil",
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
    "profile.subtitle": "Atualize seu nome e icone.",
    "profile.changeIcon": "Trocar icone",
    "profile.crop": "Tamanho do corte",
    "profile.cropHint": "Arraste a imagem para posiciona-la dentro do circulo.",
    "profile.resetCrop": "Redefinir corte",
    "profile.name": "Nome",
    "profile.id": "ID",
    "profile.coins": "Moedas",
    "profile.note": "Trocar o nome afeta o login.",
    "profile.saving": "Salvando perfil...",
    "profile.save": "Salvar perfil",
    "profile.saved": "Perfil salvo.",
    "profile.iconHelp": "Apenas PNG ou JPEG.",
    "profile.iconTooLarge": "A imagem precisa ter menos de 1 MB.",
    "profile.iconInvalidType": "Use uma imagem PNG ou JPEG.",
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
    "game.loadingZone": "Carregando mundo...",
    "game.loadingMeta": "Iniciando sessao do jogo...",
    "game.connecting": "Conectando estado do mundo...",
    "game.meta": "{theme} - Online desde: {since} - Visitantes hoje: {visitors}",
    "game.position": "Area: {zone} | X: {x} | Y: {y}",
    "game.help": "Mova com WASD ou setas. Fechar esta janela nao para a sessao.",
    "game.status.running": "Jogo rodando em segundo plano.",
    "game.status.syncing": "Salvando posicao...",
    "game.status.portal": "Teleportado para {zone}.",
    "game.status.offline": "Sessao do jogo pausada.",
    "config.section.personalize": "Personalizar",
    "config.section.language": "Idioma",
    "config.section.security": "Privacidade e Seguranca",
    "config.section.sound": "Opcoes de Som",
    "config.wallpaper": "Cor do Papel de Parede",
    "config.windowBg": "Cor do Fundo das Janelas",
    "config.border": "Cor da Borda da Janela",
    "config.theme": "Cor do Tema",
    "config.text": "Cor do Texto",
    "config.gameBackdrop": "Cor do Fundo do Jogo",
    "config.language": "Idioma",
    "config.soundEnabled": "Som ativado",
    "config.save": "Salvar",
    "config.saving": "Salvando...",
    "config.saved": "Configuracoes salvas.",
    "security.currentPassword": "Senha atual",
    "security.nextPassword": "Nova senha",
    "security.confirmPassword": "Confirmar nova senha",
    "security.note": "Voce precisa confirmar sua senha atual antes de altera-la.",
    "security.save": "Alterar senha",
    "security.saving": "Atualizando senha...",
    "security.saved": "Senha atualizada.",
    "security.passwordMismatch": "A nova senha e a confirmacao nao coincidem.",
    "language.english": "Ingles",
    "language.ptbr": "Portugues (Brasil)",
    "avatarEditor.title": "Editar imagem",
    "avatarEditor.cancel": "Cancelar",
    "avatarEditor.apply": "Aplicar",
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
const profileForm = document.getElementById("profile-form");
const profileNameInput = document.getElementById("profile-name");
const profileIdInput = document.getElementById("profile-id");
const profileCoinsInput = document.getElementById("profile-coins");
const profileAvatarPreview = document.getElementById("profile-avatar-preview");
const profileAvatarFallback = document.getElementById("profile-avatar-fallback");
const profileAvatarButton = document.getElementById("profile-avatar-button");
const profileAvatarInput = document.getElementById("profile-avatar-input");
const profileAvatarZoomInput = document.getElementById("profile-avatar-zoom");
const profileAvatarZoomValue = document.getElementById("profile-avatar-zoom-value");
const profileAvatarResetButton = document.getElementById("profile-avatar-reset");
const avatarEditorModal = document.getElementById("avatar-editor-modal");
const avatarEditorViewport = document.getElementById("avatar-editor-viewport");
const avatarEditorImage = document.getElementById("avatar-editor-image");
const avatarEditorRing = document.getElementById("avatar-editor-ring");
const avatarEditorCloseButton = document.getElementById("avatar-editor-close");
const avatarEditorCancelButton = document.getElementById("avatar-editor-cancel");
const avatarEditorApplyButton = document.getElementById("avatar-editor-apply");
const avatarEditorCloseTargets = Array.from(document.querySelectorAll("[data-avatar-editor-close]"));
const profileStatus = document.getElementById("profile-status");
const feedList = document.getElementById("social-feed-list");
const gameStage = document.querySelector(".game-stage");
const gameCanvas = document.getElementById("game-canvas");
const gameContext = gameCanvas ? gameCanvas.getContext("2d") : null;
const gameWindowTitle = document.querySelector("#window-game .window-titlebar h2");
const gameTaskButton = document.querySelector(".task-btn[data-open='game']");
const gameZone = document.getElementById("game-zone");
const gamePosition = document.getElementById("game-position");
const gameMeta = document.getElementById("game-meta");
const configForm = document.getElementById("config-form");
const securityForm = document.getElementById("security-form");
const securitySaveBtn = document.getElementById("security-save-btn");
const wallpaperColorInput = document.getElementById("wallpaper-color");
const windowBgColorInput = document.getElementById("window-bg-color");
const borderColorInput = document.getElementById("border-color");
const themeColorInput = document.getElementById("theme-color");
const textColorInput = document.getElementById("text-color");
const gameBackdropColorInput = document.getElementById("game-backdrop-color");
const soundEnabledInput = document.getElementById("sound-enabled");
const languageSelect = document.getElementById("language-select");
const configStatus = document.getElementById("config-status");
const securityCurrentPasswordInput = document.getElementById("security-current-password");
const securityNextPasswordInput = document.getElementById("security-next-password");
const securityConfirmPasswordInput = document.getElementById("security-confirm-password");
const securityStatus = document.getElementById("security-status");
const configTabs = Array.from(document.querySelectorAll("[data-config-section]"));
const configPanels = Array.from(document.querySelectorAll("[data-config-panel]"));

const state = {
  conversations: [],
  friends: [],
  userSearchResults: [],
  friendMode: "friends",
  notifications: [],
  feed: [],
  gameSession: null,
  gamePreview: null,
  gameMovePending: false,
  gameLastMoveAt: 0,
  gameLoopId: 0,
  gameViewportWidth: 720,
  gameViewportHeight: 432,
  gameDpr: 1,
  gameCameraX: 0,
  gameCameraY: 0,
  gameCameraReady: false,
  playerRenderX: 0,
  playerRenderY: 0,
  playerStartX: 0,
  playerStartY: 0,
  playerTargetX: 0,
  playerTargetY: 0,
  playerTweenStartAt: 0,
  playerTweenDurationMs: 170,
  gameBackdropColor: "#b7dced",
  profile: null,
  profileAvatarSourceDataUrl: "",
  profileAvatarDraft: "",
  profileAvatarZoom: 1,
  profileAvatarCropCenterX: 0,
  profileAvatarCropCenterY: 0,
  profileAvatarSourceWidth: 0,
  profileAvatarSourceHeight: 0,
  themeColor: "#2f6eb1",
  textColor: "#16202b",
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
const GAME_TILE_SIZE = 24;
const GAME_CAMERA_LERP = 0.14;
const GAME_MOVE_COOLDOWN_MS = 150;
const GAME_KEY_TO_DIRECTION = {
  ArrowUp: "up",
  w: "up",
  W: "up",
  ArrowDown: "down",
  s: "down",
  S: "down",
  ArrowLeft: "left",
  a: "left",
  A: "left",
  ArrowRight: "right",
  d: "right",
  D: "right"
};
let profileAvatarPreviewRenderToken = 0;
let profileAvatarDragState = null;

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

  if (win.dataset.window === "game") {
    window.requestAnimationFrame(resizeGameCanvas);
  }
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

  if (win.dataset.window === "game") {
    window.requestAnimationFrame(resizeGameCanvas);
  }
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

function applyTextColor(textColor) {
  const base = normalizeHexColor(textColor, "#16202b");
  const root = document.documentElement;

  root.style.setProperty("--window-text", base);
  root.style.setProperty("--window-meta-text", mixColors(base, "#ffffff", 0.22));
  root.style.setProperty("--theme-board-text", mixColors(base, "#000000", 0.15));
  root.style.setProperty("--theme-chip-text", mixColors(base, state.themeColor || "#2f6eb1", 0.25));

  state.textColor = base;
  textColorInput.value = base;
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
    renderGameSession(state.gameSession);
  }

  syncGameWindowLabels(state.gameSession?.zone?.name || "");
}

function syncGameWindowLabels(zoneName = "") {
  const fallbackWindowTitle = t("window.game");
  const fallbackTaskLabel = t("task.game");
  const label = zoneName || fallbackWindowTitle;

  if (gameWindowTitle) {
    gameWindowTitle.textContent = label;
  }

  if (gameTaskButton) {
    gameTaskButton.textContent = zoneName || fallbackTaskLabel;
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
    if (!dragState || event.pointerId !== dragState.pointerId || event.buttons !== 1) {
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

    if (event.target.closest(".window-titlebar")) {
      win.style.cursor = "move";
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

    if (event.target.closest(".window-titlebar")) {
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
    if (!resizeState || event.pointerId !== resizeState.pointerId || event.buttons !== 1) {
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
  const displayName = state.profile?.displayName || userName;
  welcomeText.textContent = tf("welcome.summary", {
    name: displayName,
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

function getProfileInitials(name) {
  const trimmed = (name || userName || "?").trim();
  const parts = trimmed.split(/\s+/).filter(Boolean);
  const initials = parts.slice(0, 2).map((part) => part[0]).join("");
  return (initials || trimmed.slice(0, 2) || "?").toUpperCase();
}

function clampNumber(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function updateProfileZoomLabel() {
  const zoomPercent = Math.round((state.profileAvatarZoom || 1) * 100);
  profileAvatarZoomValue.textContent = `${zoomPercent}%`;
  profileAvatarZoomInput.value = String(state.profileAvatarZoom || 1);
}

function getAvatarEditorViewportSize() {
  return avatarEditorViewport?.getBoundingClientRect().width || 320;
}

function getAvatarCropMetrics() {
  const sourceWidth = state.profileAvatarSourceWidth || 0;
  const sourceHeight = state.profileAvatarSourceHeight || 0;

  if (!sourceWidth || !sourceHeight) {
    return null;
  }

  const zoom = clampNumber(Number(state.profileAvatarZoom) || 1, 1, 3);
  const viewportSize = getAvatarEditorViewportSize();
  const circleDiameter = avatarEditorRing?.getBoundingClientRect().width || viewportSize * 0.74;
  const baseScale = viewportSize / Math.max(sourceWidth, sourceHeight);
  const imageScale = Math.max(baseScale * zoom, circleDiameter / Math.min(sourceWidth, sourceHeight));
  const circleRadius = circleDiameter / 2;
  const cropHalfSize = circleRadius / imageScale;
  const minCenterX = cropHalfSize;
  const maxCenterX = sourceWidth - cropHalfSize;
  const minCenterY = cropHalfSize;
  const maxCenterY = sourceHeight - cropHalfSize;
  const centerX = clampNumber(state.profileAvatarCropCenterX || sourceWidth / 2, minCenterX, maxCenterX);
  const centerY = clampNumber(state.profileAvatarCropCenterY || sourceHeight / 2, minCenterY, maxCenterY);

  return {
    sourceWidth,
    sourceHeight,
    zoom,
    viewportSize,
    circleDiameter,
    baseScale,
    imageScale,
    circleRadius,
    cropHalfSize,
    minCenterX,
    maxCenterX,
    minCenterY,
    maxCenterY,
    centerX,
    centerY
  };
}

function clampAvatarCenter(centerX, centerY) {
  const metrics = getAvatarCropMetrics();
  if (!metrics) {
    return { centerX: 0, centerY: 0 };
  }

  return {
    centerX: clampNumber(centerX, metrics.minCenterX, metrics.maxCenterX),
    centerY: clampNumber(centerY, metrics.minCenterY, metrics.maxCenterY)
  };
}

function resetAvatarCrop() {
  if (!state.profileAvatarSourceWidth || !state.profileAvatarSourceHeight) {
    return;
  }

  state.profileAvatarZoom = 1;
  state.profileAvatarCropCenterX = state.profileAvatarSourceWidth / 2;
  state.profileAvatarCropCenterY = state.profileAvatarSourceHeight / 2;
  updateProfileZoomLabel();
  refreshProfileAvatarPreview().catch(() => {
    profileStatus.textContent = t("profile.iconHelp");
  });
}

function setProfileAvatarSource(sourceDataUrl) {
  state.profileAvatarSourceDataUrl = sourceDataUrl || "";
  if (!state.profileAvatarSourceDataUrl) {
    state.profileAvatarDraft = "";
    profileAvatarZoomInput.disabled = true;
    profileAvatarResetButton.disabled = true;
    state.profileAvatarSourceWidth = 0;
    state.profileAvatarSourceHeight = 0;
    state.profileAvatarCropCenterX = 0;
    state.profileAvatarCropCenterY = 0;
    avatarEditorModal?.classList.add("hidden");
    if (avatarEditorImage) {
      avatarEditorImage.removeAttribute("src");
      avatarEditorImage.style.width = "";
      avatarEditorImage.style.height = "";
      avatarEditorImage.style.left = "";
      avatarEditorImage.style.top = "";
      avatarEditorImage.style.transform = "";
    }
  }
}

function updateProfileAvatarDisplay() {
  const avatarDataUrl = state.profileAvatarDraft || state.profile?.avatarDataUrl || "";

  if (!avatarDataUrl) {
    profileAvatarPreview.style.backgroundImage = "none";
    profileAvatarPreview.style.backgroundSize = "cover";
    profileAvatarPreview.style.backgroundPosition = "center";
    profileAvatarPreview.classList.remove("has-image");
    profileAvatarFallback.textContent = getProfileInitials(profileNameInput.value || userName);
    return;
  }

  profileAvatarPreview.style.backgroundImage = `url(${avatarDataUrl})`;
  profileAvatarPreview.style.backgroundSize = "cover";
  profileAvatarPreview.style.backgroundPosition = "center";
  profileAvatarPreview.classList.add("has-image");
  profileAvatarFallback.textContent = "";
}

function openAvatarEditor() {
  if (!state.profileAvatarSourceDataUrl) {
    return;
  }

  avatarEditorModal?.classList.remove("hidden");
  document.body.classList.add("avatar-editor-open");
  refreshProfileAvatarPreview().catch(() => {
    profileStatus.textContent = t("profile.iconHelp");
  });
}

function closeAvatarEditor() {
  avatarEditorModal?.classList.add("hidden");
  document.body.classList.remove("avatar-editor-open");
  state.profileAvatarSourceDataUrl = "";
  state.profileAvatarSourceWidth = 0;
  state.profileAvatarSourceHeight = 0;
  state.profileAvatarCropCenterX = 0;
  state.profileAvatarCropCenterY = 0;
  state.profileAvatarZoom = 1;
  profileAvatarInput.value = "";
}

function loadImageFromDataUrl(dataUrl) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Unable to load image file."));
    image.src = dataUrl;
  });
}

async function buildCroppedAvatarDataUrl(sourceDataUrl, zoom) {
  const image = await loadImageFromDataUrl(sourceDataUrl);
  const size = 256;
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Unable to create image preview.");
  }

  canvas.width = size;
  canvas.height = size;

  const normalizedZoom = clampNumber(Number(zoom) || 1, 1, 3);
  const viewportSize = getAvatarEditorViewportSize();
  const circleDiameter = avatarEditorRing?.getBoundingClientRect().width || viewportSize * 0.74;
  const baseScale = viewportSize / Math.max(image.width, image.height);
  const imageScale = Math.max(baseScale * normalizedZoom, circleDiameter / Math.min(image.width, image.height));
  const metrics = getAvatarCropMetrics();
  const centerX = metrics?.centerX || image.width / 2;
  const centerY = metrics?.centerY || image.height / 2;
  const cropSize = circleDiameter / imageScale;
  const sourceX = clampNumber(centerX - cropSize / 2, 0, image.width - cropSize);
  const sourceY = clampNumber(centerY - cropSize / 2, 0, image.height - cropSize);

  context.save();
  context.beginPath();
  context.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
  context.clip();
  context.drawImage(image, sourceX, sourceY, cropSize, cropSize, 0, 0, size, size);
  context.restore();
  return canvas.toDataURL("image/png");
}

async function refreshProfileAvatarPreview() {
  const sourceDataUrl = state.profileAvatarSourceDataUrl || state.profile?.avatarDataUrl || "";

  if (!sourceDataUrl) {
    state.profileAvatarDraft = "";
    profileAvatarZoomInput.disabled = true;
    profileAvatarResetButton.disabled = true;
    if (avatarEditorImage) {
      avatarEditorImage.removeAttribute("src");
      avatarEditorImage.style.width = "";
      avatarEditorImage.style.height = "";
      avatarEditorImage.style.left = "";
      avatarEditorImage.style.top = "";
      avatarEditorImage.style.transform = "";
    }
    updateProfileZoomLabel();
    return;
  }

  profileAvatarZoomInput.disabled = false;
  profileAvatarResetButton.disabled = false;
  const renderToken = ++profileAvatarPreviewRenderToken;
  const image = await loadImageFromDataUrl(sourceDataUrl);

  state.profileAvatarSourceWidth = image.width;
  state.profileAvatarSourceHeight = image.height;
  if (!state.profileAvatarCropCenterX) {
    state.profileAvatarCropCenterX = image.width / 2;
  }
  if (!state.profileAvatarCropCenterY) {
    state.profileAvatarCropCenterY = image.height / 2;
  }

  const metrics = getAvatarCropMetrics();
  if (!metrics) {
    return;
  }

  const previewSize = avatarEditorViewport?.getBoundingClientRect().width || 320;
  const imageWidth = `${Math.round(metrics.sourceWidth * metrics.imageScale)}px`;
  const imageHeight = `${Math.round(metrics.sourceHeight * metrics.imageScale)}px`;
  const imageLeft = `${Math.round(previewSize / 2 - metrics.centerX * metrics.imageScale)}px`;
  const imageTop = `${Math.round(previewSize / 2 - metrics.centerY * metrics.imageScale)}px`;

  if (renderToken !== profileAvatarPreviewRenderToken) {
    return;
  }

  if (avatarEditorImage) {
    avatarEditorImage.src = sourceDataUrl;
    avatarEditorImage.style.width = imageWidth;
    avatarEditorImage.style.height = imageHeight;
    avatarEditorImage.style.left = imageLeft;
    avatarEditorImage.style.top = imageTop;
    avatarEditorImage.style.transform = "";
  }

  updateProfileZoomLabel();
}

function renderProfile(profile, user = { id: "", name: userName }) {
  state.profile = profile || { displayName: user.name || userName, avatarDataUrl: "", coins: 0 };
  state.profileAvatarDraft = "";
  state.profileAvatarSourceDataUrl = "";
  state.profileAvatarSourceWidth = 0;
  state.profileAvatarSourceHeight = 0;
  state.profileAvatarCropCenterX = 0;
  state.profileAvatarCropCenterY = 0;
  state.profileAvatarZoom = 1;

  const displayName = state.profile.displayName || user.name || userName;
  profileNameInput.value = displayName;
  profileIdInput.value = user.id || "";
  profileCoinsInput.value = String(Number.isFinite(state.profile.coins) ? state.profile.coins : 0);

  updateProfileAvatarDisplay();
  updateProfileZoomLabel();

  profileStatus.textContent = "";
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("Unable to read image file."));
    reader.readAsDataURL(file);
  });
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

function formatGameClock(value) {
  if (!value) {
    return "--";
  }

  const timestamp = new Date(value);
  if (!Number.isFinite(timestamp.getTime())) {
    return "--";
  }

  return timestamp.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function formatTimePlayed(startedAt) {
  if (!startedAt) return "0m played";
  const startMs = typeof startedAt === "number" ? startedAt : new Date(startedAt).getTime();
  if (isNaN(startMs)) return "0m played";
  const totalSec = Math.max(0, Math.floor((Date.now() - startMs) / 1000));
  const totalMin = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  if (totalMin < 60) return `${totalMin}m ${sec}s played`;
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  return m > 0 ? `${h}h ${m}m played` : `${h}h played`;
}

function setGameStatus(text) {
  gameMeta.textContent = text;
}

function getGameDirectionFromKey(key) {
  return GAME_KEY_TO_DIRECTION[key] || "";
}

function isTypingTarget(target) {
  return Boolean(target?.closest("input, textarea, select, [contenteditable='true']"));
}

function getTilePalette(tile) {
  switch (tile) {
    case "W":
      return { base: "#3ab8e8", detail: "#1e90c0", shimmer: "#7ad8f8" };
    case "D":
      return { base: "#b88c58", detail: "#906838", light: "#d4a870" };
    case "S":
      return { base: "#9ab0c4", detail: "#6a8899", highlight: "#c8dce8" };
    case "F":
      return { base: "#c08040", detail: "#8a5820", light: "#e0a860" };
    case "R":
      return { base: "#d09860", detail: "#a87040", light: "#e8b878" };
    case "H":
      return { base: "#287038", detail: "#185028", bump: "#38904a" };
    case "P":
      return { base: "#c0946a", detail: "#9a7048", light: "#d8ae88" };
    case "G":
    default:
      return { base: "#52b050", detail: "#3a8838", light: "#6ac868" };
  }
}

function drawGameTile(ctx, tile, x, y, timestamp) {
  const palette = getTilePalette(tile);
  const drawX = x * GAME_TILE_SIZE;
  const drawY = y * GAME_TILE_SIZE;
  const T = GAME_TILE_SIZE;

  // Base fill with slight overlap to prevent hairline seams
  ctx.fillStyle = palette.base;
  ctx.fillRect(drawX, drawY, T + 1, T + 1);

  if (tile === "G") {
    // Checkerboard 2-tone grass like references
    const checker = ((x + y) % 2 === 0);
    ctx.fillStyle = checker ? "rgba(90, 185, 80, 0.38)" : "rgba(42, 118, 48, 0.22)";
    ctx.fillRect(drawX, drawY, T + 1, T + 1);
    // Short grass blade details
    const seed = (x * 7 + y * 13) % 5;
    ctx.fillStyle = palette.detail;
    ctx.fillRect(drawX + 3 + seed, drawY + T - 6, 1, 4);
    ctx.fillRect(drawX + 9 + seed, drawY + T - 5, 1, 3);
    ctx.fillRect(drawX + 17 + seed % 3, drawY + T - 7, 1, 5);
    // Occasional tiny daisy on grass
    if ((x * 3 + y * 11) % 9 === 0) {
      ctx.fillStyle = "#f8f8e0";
      ctx.fillRect(drawX + 11, drawY + 8, 2, 2);
      ctx.fillStyle = "#f0c040";
      ctx.fillRect(drawX + 12, drawY + 9, 1, 1);
    }
    return;
  }

  if (tile === "W") {
    // Bright cyan water with animated shimmer
    const t1 = Math.sin((timestamp / 380) + x * 0.9 + y * 0.5) * 2;
    const t2 = Math.sin((timestamp / 320) + x * 0.4 + y * 0.8) * 1.5;
    ctx.fillStyle = "rgba(255,255,255,0.22)";
    ctx.fillRect(drawX + 2, drawY + 6 + t1, T - 4, 4);
    ctx.fillRect(drawX + 5, drawY + 15 + t2, T - 10, 3);
    // Sparkle
    ctx.fillStyle = palette.shimmer;
    ctx.fillRect(drawX + 4 + ((x * 5) % 8), drawY + 4, 2, 2);
    return;
  }

  if (tile === "P") {
    // Sandy dirt path — two-tone pebble texture from references
    ctx.fillStyle = palette.light;
    ctx.fillRect(drawX + 1, drawY + 1, T - 2, 4);
    ctx.fillStyle = palette.detail;
    // Scattered small pebble dots
    const ps = (x * 11 + y * 7) % 6;
    ctx.fillRect(drawX + 4 + ps, drawY + 8, 2, 2);
    ctx.fillRect(drawX + 14 + (ps % 4), drawY + 16, 2, 2);
    ctx.fillRect(drawX + 9, drawY + 6 + (ps % 5), 2, 2);
    return;
  }

  if (tile === "D") {
    // Dirt tile — darker than path, soil texture
    ctx.fillStyle = palette.light;
    ctx.fillRect(drawX + 2, drawY + 2, T - 4, 3);
    ctx.fillStyle = palette.detail;
    ctx.fillRect(drawX + 7, drawY + 11, 3, 2);
    ctx.fillRect(drawX + 16, drawY + 7, 2, 3);
    return;
  }

  if (tile === "S") {
    // Stone cobble — rounded blocks like reference ruins
    ctx.fillStyle = palette.highlight;
    ctx.fillRect(drawX + 1, drawY + 1, T - 2, 2);
    ctx.fillRect(drawX + 1, drawY + 1, 2, T - 2);
    ctx.fillStyle = palette.detail;
    ctx.fillRect(drawX + 1, drawY + T - 2, T - 2, 1);
    ctx.fillRect(drawX + T - 2, drawY + 1, 1, T - 2);
    // Inner cobble joints
    ctx.fillStyle = "rgba(80, 110, 130, 0.4)";
    ctx.fillRect(drawX + T / 2 - 1, drawY + 2, 1, T - 4);
    ctx.fillRect(drawX + 2, drawY + T / 2 - 1, T - 4, 1);
    return;
  }

  if (tile === "F") {
    // Wood plank floor — horizontal planks with grain
    ctx.fillStyle = palette.light;
    ctx.fillRect(drawX + 1, drawY + 1, T - 2, 3);
    ctx.fillStyle = palette.detail;
    for (let py = 0; py < T; py += 8) {
      ctx.fillRect(drawX, drawY + py + 7, T, 1);
    }
    // Plank grain dots
    ctx.fillStyle = "rgba(120, 72, 28, 0.35)";
    ctx.fillRect(drawX + 5, drawY + 3, 3, 1);
    ctx.fillRect(drawX + 14, drawY + 11, 4, 1);
    ctx.fillRect(drawX + 7, drawY + 19, 3, 1);
    return;
  }

  if (tile === "R") {
    // Interior room tile — warm wood/rug look
    ctx.fillStyle = palette.light;
    ctx.fillRect(drawX + 1, drawY + 1, T - 2, 2);
    ctx.fillStyle = "rgba(160, 100, 50, 0.25)";
    ctx.fillRect(drawX + 3, drawY + 3, T - 6, T - 6);
    ctx.fillStyle = palette.detail;
    ctx.fillRect(drawX, drawY + 7, T, 1);
    ctx.fillRect(drawX, drawY + 15, T, 1);
    return;
  }

  if (tile === "H") {
    // Hedge / dark grass — bumpy top edge
    ctx.fillStyle = palette.bump;
    ctx.fillRect(drawX + 2, drawY, 4, 5);
    ctx.fillRect(drawX + 9, drawY - 1, 5, 6);
    ctx.fillRect(drawX + 17, drawY, 4, 4);
    ctx.fillStyle = palette.detail;
    ctx.fillRect(drawX + 1, drawY + 4, T - 2, T - 4);
  }
}

function drawPortalMarkers(ctx, portals, timestamp) {
  portals.forEach((portal, index) => {
    const pulse = 0.35 + ((Math.sin(timestamp / 180 + index) + 1) * 0.2);
    ctx.fillStyle = `rgba(255, 241, 145, ${pulse})`;
    ctx.fillRect(portal.x * GAME_TILE_SIZE + 4, portal.y * GAME_TILE_SIZE + 4, GAME_TILE_SIZE - 8, GAME_TILE_SIZE - 8);
    ctx.strokeStyle = "rgba(173, 100, 18, 0.95)";
    ctx.lineWidth = 2;
    ctx.strokeRect(portal.x * GAME_TILE_SIZE + 5, portal.y * GAME_TILE_SIZE + 5, GAME_TILE_SIZE - 10, GAME_TILE_SIZE - 10);
  });
}

function drawRoundedRect(ctx, x, y, width, height, radius, fillStyle, strokeStyle = "") {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  ctx.fillStyle = fillStyle;
  ctx.fill();

  if (strokeStyle) {
    ctx.strokeStyle = strokeStyle;
    ctx.stroke();
  }
}

function drawTree(ctx, feature, timestamp) {
  const centerX = (feature.x * GAME_TILE_SIZE) + (GAME_TILE_SIZE / 2);
  const baseY = (feature.y * GAME_TILE_SIZE) + GAME_TILE_SIZE;
  const scale = feature.size === "l" ? 1.25 : feature.size === "m" ? 1 : 0.8;
  const sway = Math.sin((timestamp / 600) + feature.x * 0.8) * 1.5;

  // Ground shadow ellipse
  ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
  ctx.beginPath();
  ctx.ellipse(centerX + 2, baseY + 2, 13 * scale, 5 * scale, 0, 0, Math.PI * 2);
  ctx.fill();

  // Trunk — brown with lighter center stripe
  const trunkW = Math.round(5 * scale);
  const trunkH = Math.round(20 * scale);
  ctx.fillStyle = "#6b4020";
  ctx.fillRect(centerX - trunkW / 2, baseY - trunkH, trunkW, trunkH);
  ctx.fillStyle = "#9a6838";
  ctx.fillRect(centerX - 1, baseY - trunkH + 2, 2, trunkH - 4);

  // Canopy — 3 layered circle clusters (dark → mid → bright) like references
  const cy = baseY - trunkH - 4 * scale;
  const cr = 14 * scale;

  // Layer 1: darkest (shadow/depth)
  ctx.fillStyle = "#1e5828";
  ctx.beginPath();
  ctx.arc(centerX - 7 * scale + sway, cy + 4 * scale, cr * 0.75, 0, Math.PI * 2);
  ctx.arc(centerX + 6 * scale + sway, cy + 5 * scale, cr * 0.70, 0, Math.PI * 2);
  ctx.arc(centerX + sway, cy + 3 * scale, cr * 0.80, 0, Math.PI * 2);
  ctx.fill();

  // Layer 2: mid green (main canopy)
  ctx.fillStyle = "#3a8838";
  ctx.beginPath();
  ctx.arc(centerX + sway, cy, cr, 0, Math.PI * 2);
  ctx.arc(centerX - 9 * scale + sway, cy + 6 * scale, cr * 0.78, 0, Math.PI * 2);
  ctx.arc(centerX + 9 * scale + sway, cy + 5 * scale, cr * 0.74, 0, Math.PI * 2);
  ctx.fill();

  // Layer 3: bright green clusters (top highlights)
  ctx.fillStyle = "#5ab850";
  ctx.beginPath();
  ctx.arc(centerX - 5 * scale + sway, cy - 4 * scale, cr * 0.55, 0, Math.PI * 2);
  ctx.arc(centerX + 5 * scale + sway, cy - 2 * scale, cr * 0.50, 0, Math.PI * 2);
  ctx.arc(centerX + sway, cy - 6 * scale, cr * 0.48, 0, Math.PI * 2);
  ctx.fill();

  // Tiny highlight pixels (top-left of canopy)
  ctx.fillStyle = "rgba(180, 240, 160, 0.70)";
  ctx.fillRect(centerX - 6 * scale + sway, cy - 8 * scale, 3, 3);
  ctx.fillRect(centerX + 3 * scale + sway, cy - 5 * scale, 2, 2);
}

function drawBench(ctx, feature) {
  const left = feature.x * GAME_TILE_SIZE;
  const top = feature.y * GAME_TILE_SIZE;

  // Legs — dark wood, slightly angled base
  ctx.fillStyle = "#5a3418";
  ctx.fillRect(left + 5, top + 15, 3, 9);
  ctx.fillRect(left + 20, top + 15, 3, 9);
  ctx.fillStyle = "#7a4c28";
  ctx.fillRect(left + 6, top + 15, 1, 9);
  ctx.fillRect(left + 21, top + 15, 1, 9);

  // Back rest — 2 planks
  ctx.fillStyle = "#7a5030";
  ctx.fillRect(left + 4, top + 7, 20, 4);
  ctx.fillRect(left + 4, top + 12, 20, 3);
  // Plank highlights (top edge)
  ctx.fillStyle = "#b07848";
  ctx.fillRect(left + 5, top + 7, 18, 1);
  ctx.fillRect(left + 5, top + 12, 18, 1);
  // Plank grain
  ctx.fillStyle = "rgba(60, 30, 10, 0.30)";
  ctx.fillRect(left + 10, top + 8, 1, 2);
  ctx.fillRect(left + 17, top + 8, 1, 2);

  // Seat plank
  ctx.fillStyle = "#8a5c38";
  ctx.fillRect(left + 3, top + 15, 22, 5);
  ctx.fillStyle = "#c08850";
  ctx.fillRect(left + 4, top + 15, 20, 1);
}

function drawLamp(ctx, feature, timestamp) {
  const left = feature.x * GAME_TILE_SIZE;
  const top = feature.y * GAME_TILE_SIZE;
  const glow = 0.28 + ((Math.sin((timestamp / 360) + feature.x) + 1) * 0.12);

  // Soft glow halo behind lantern
  ctx.fillStyle = `rgba(255, 224, 100, ${glow * 0.45})`;
  ctx.beginPath();
  ctx.arc(left + 12, top + 6, 14, 0, Math.PI * 2);
  ctx.fill();

  // Stone base — two stacked blocks
  ctx.fillStyle = "#7a8e9e";
  ctx.fillRect(left + 7, top + 20, 10, 5);
  ctx.fillRect(left + 9, top + 16, 6, 5);
  ctx.fillStyle = "#a0b4c4";
  ctx.fillRect(left + 8, top + 20, 9, 1);
  ctx.fillRect(left + 10, top + 16, 5, 1);

  // Pole
  ctx.fillStyle = "#5a6878";
  ctx.fillRect(left + 11, top + 8, 2, 9);
  ctx.fillStyle = "#7a8898";
  ctx.fillRect(left + 11, top + 8, 1, 9);

  // Lantern head — warm amber square lamp
  ctx.fillStyle = "#5a4820";
  ctx.fillRect(left + 7, top + 2, 10, 8);
  ctx.fillStyle = `rgba(255, 210, 80, ${0.7 + glow * 0.3})`;
  ctx.fillRect(left + 8, top + 3, 8, 6);
  // Window shine
  ctx.fillStyle = "rgba(255, 255, 200, 0.85)";
  ctx.fillRect(left + 9, top + 3, 3, 2);
  // Top cap
  ctx.fillStyle = "#4a3818";
  ctx.fillRect(left + 6, top + 1, 12, 2);
}

function drawFlowerbed(ctx, feature) {
  const left = feature.x * GAME_TILE_SIZE;
  const top = feature.y * GAME_TILE_SIZE;
  const width = feature.w * GAME_TILE_SIZE;
  const height = feature.h * GAME_TILE_SIZE;
  const isSun = feature.palette === "sun";
  const petalColors = isSun ? ["#f0b830", "#e87820", "#f04848"] : ["#f070a0", "#e8a0d0", "#f8d860"];

  // Dirt border
  ctx.fillStyle = "#8a6030";
  ctx.fillRect(left, top, width, height);
  // Inner soil
  ctx.fillStyle = "#a07040";
  ctx.fillRect(left + 2, top + 2, width - 4, height - 4);
  // Green ground base
  ctx.fillStyle = "#3a8838";
  ctx.fillRect(left + 3, top + 3, width - 6, height - 6);

  // Leaf clusters (sparser)
  ctx.fillStyle = "#2e7030";
  for (let fy = top + 6; fy < top + height - 4; fy += 13) {
    for (let fx = left + 5; fx < left + width - 4; fx += 13) {
      ctx.fillRect(fx, fy, 5, 5);
    }
  }

  // Flower heads (sparser, wider spacing)
  for (let fy = top + 9; fy < top + height - 5; fy += 17) {
    for (let fx = left + 8; fx < left + width - 5; fx += 17) {
      const ci = ((fx + fy) % 30) % petalColors.length;
      ctx.fillStyle = petalColors[ci];
      ctx.fillRect(fx - 1, fy, 4, 2);
      ctx.fillRect(fx, fy - 1, 2, 4);
      // Center dot
      ctx.fillStyle = isSun ? "#fffaaa" : "#fffce0";
      ctx.fillRect(fx, fy, 2, 2);
    }
  }
}

function drawFountain(ctx, feature, timestamp) {
  const left = feature.x * GAME_TILE_SIZE;
  const top = feature.y * GAME_TILE_SIZE;
  const width = feature.w * GAME_TILE_SIZE;
  const height = feature.h * GAME_TILE_SIZE;
  const cx = left + width / 2;

  // Outer stone basin wall
  ctx.fillStyle = "#607890";
  ctx.fillRect(left + 2, top + 4, width - 4, height - 6);
  // Basin rim highlight (top + left)
  ctx.fillStyle = "#98bcd4";
  ctx.fillRect(left + 2, top + 4, width - 4, 3);
  ctx.fillRect(left + 2, top + 4, 3, height - 6);
  // Basin rim shadow (bottom + right)
  ctx.fillStyle = "#3a5870";
  ctx.fillRect(left + 2, top + height - 4, width - 4, 3);
  ctx.fillRect(left + width - 5, top + 4, 3, height - 6);

  // Inner water (stays well inside basin walls)
  ctx.fillStyle = "#2ea8e0";
  ctx.fillRect(left + 8, top + 10, width - 16, height - 18);
  // Water surface shimmer
  const sh = Math.sin(timestamp / 280) * 1.5;
  ctx.fillStyle = "rgba(190, 240, 255, 0.55)";
  ctx.fillRect(left + 10, top + 12 + sh, width - 20, 3);
  ctx.fillStyle = "rgba(190, 240, 255, 0.30)";
  ctx.fillRect(left + 10, top + 17 + sh * 0.5, (width - 20) * 0.55, 2);

  // Center stone pillar
  ctx.fillStyle = "#506a88";
  ctx.fillRect(cx - 3, top + 8, 6, height - 16);
  ctx.fillStyle = "#80a4c0";
  ctx.fillRect(cx - 3, top + 8, 6, 2);
  // Spout cap
  ctx.fillStyle = "#90b8d0";
  ctx.fillRect(cx - 5, top + 4, 10, 5);
  ctx.fillStyle = "#b0d0e0";
  ctx.fillRect(cx - 4, top + 4, 8, 2);

  // Water arc droplets from spout
  const dropAlpha = 0.55 + Math.sin(timestamp / 200) * 0.20;
  ctx.fillStyle = `rgba(160, 230, 255, ${dropAlpha})`;
  for (let i = 0; i < 4; i++) {
    const phase = (timestamp / 260) + i * 1.57;
    const dx = Math.cos(phase) * 5;
    const dy = top + 5 - Math.abs(Math.sin(phase)) * 3;
    ctx.fillRect(cx + dx - 1, dy, 2, 2);
  }
}

function drawGazebo(ctx, feature) {
  const left = feature.x * GAME_TILE_SIZE;
  const top = feature.y * GAME_TILE_SIZE;
  const width = feature.w * GAME_TILE_SIZE;
  const height = feature.h * GAME_TILE_SIZE;

  // Stone floor platform
  ctx.fillStyle = "#9ab0c4";
  ctx.fillRect(left + 4, top + height - 10, width - 8, 10);
  ctx.fillStyle = "#c0d4e4";
  ctx.fillRect(left + 4, top + height - 10, width - 8, 2);

  // Wooden columns (left & right)
  ctx.fillStyle = "#8a6040";
  ctx.fillRect(left + 6, top + 14, 5, height - 24);
  ctx.fillRect(left + width - 11, top + 14, 5, height - 24);
  ctx.fillStyle = "#c09060";
  ctx.fillRect(left + 7, top + 14, 2, height - 24);
  ctx.fillRect(left + width - 10, top + 14, 2, height - 24);

  // Interior wood floor — opaque
  ctx.fillStyle = "#c09870";
  ctx.fillRect(left + 10, top + 16, width - 20, height - 26);
  ctx.fillStyle = "rgba(80, 40, 12, 0.20)";
  for (let py = top + 21; py < top + height - 10; py += 6) {
    ctx.fillRect(left + 10, py, width - 20, 1);
  }

  // Roof ridge — terracotta/red triangular
  ctx.fillStyle = "#c04040";
  ctx.beginPath();
  ctx.moveTo(left + 2, top + 16);
  ctx.lineTo(left + width / 2, top + 2);
  ctx.lineTo(left + width - 2, top + 16);
  ctx.closePath();
  ctx.fill();
  // Roof shadow underside
  ctx.fillStyle = "#982828";
  ctx.beginPath();
  ctx.moveTo(left + 3, top + 16);
  ctx.lineTo(left + width / 2, top + 10);
  ctx.lineTo(left + width - 3, top + 16);
  ctx.closePath();
  ctx.fill();
  // Roof highlight ridge line
  ctx.fillStyle = "#e86060";
  ctx.fillRect(left + width / 2 - 1, top + 2, 2, 14);
}

function drawBuilding(ctx, feature) {
  const left = feature.x * GAME_TILE_SIZE;
  const top = feature.y * GAME_TILE_SIZE;
  const width = feature.w * GAME_TILE_SIZE;
  const height = feature.h * GAME_TILE_SIZE;
  const cx = left + width / 2;

  // Per-style saturated colors
  const roofMain  = feature.style === "cafe" ? "#d85f18" : feature.style === "arcade" ? "#2870b8" : "#a82020";
  const roofDark  = feature.style === "cafe" ? "#a03e08" : feature.style === "arcade" ? "#1050a0" : "#801010";
  const roofLight = feature.style === "cafe" ? "#f08030" : feature.style === "arcade" ? "#50a0e0" : "#d03030";
  const wallMain  = feature.style === "cafe" ? "#c89838" : feature.style === "arcade" ? "#5888b0" : "#b86828";
  const wallLight = feature.style === "cafe" ? "#e0b858" : feature.style === "arcade" ? "#78a8d0" : "#d08848";
  const wallDark  = feature.style === "cafe" ? "#a07020" : feature.style === "arcade" ? "#386898" : "#8c4818";

  const eaveY  = top + 20;
  const wallH  = height - 20;

  // ── WALL ──
  ctx.fillStyle = wallMain;
  ctx.fillRect(left + 2, eaveY, width - 4, wallH);
  // Right-side depth shadow
  ctx.fillStyle = wallDark;
  ctx.fillRect(left + width - 7, eaveY, 5, wallH);
  // Foundation strip
  ctx.fillStyle = "#3a1c06";
  ctx.fillRect(left + 2, top + height - 3, width - 4, 3);

  // ── WINDOWS ──
  const winY = eaveY + 16;
  const winH = 12;
  // Left window
  ctx.fillStyle = "#1c68a8";
  ctx.fillRect(left + 7, winY, 14, winH);
  ctx.fillStyle = wallLight;
  ctx.fillRect(left + 13, winY, 1, winH); // pane divider
  ctx.fillStyle = "rgba(255,255,255,0.75)";
  ctx.fillRect(left + 8, winY + 1, 4, 3); // shine
  ctx.fillStyle = wallDark;
  ctx.fillRect(left + 6, winY - 1, 16, 1);
  ctx.fillRect(left + 6, winY + winH, 16, 1);
  ctx.fillRect(left + 6, winY - 1, 1, winH + 2);
  ctx.fillRect(left + 22, winY - 1, 1, winH + 2);
  // Right window
  ctx.fillStyle = "#1c68a8";
  ctx.fillRect(left + width - 21, winY, 14, winH);
  ctx.fillStyle = wallLight;
  ctx.fillRect(left + width - 15, winY, 1, winH);
  ctx.fillStyle = "rgba(255,255,255,0.75)";
  ctx.fillRect(left + width - 20, winY + 1, 4, 3);
  ctx.fillStyle = wallDark;
  ctx.fillRect(left + width - 22, winY - 1, 16, 1);
  ctx.fillRect(left + width - 22, winY + winH, 16, 1);
  ctx.fillRect(left + width - 22, winY - 1, 1, winH + 2);
  ctx.fillRect(left + width - 6, winY - 1, 1, winH + 2);

  // ── DOOR ──
  const dw = 14, dh = 20;
  ctx.fillStyle = "#301406";
  ctx.fillRect(cx - dw / 2, top + height - dh, dw, dh);
  ctx.fillStyle = "#5a2e10";
  ctx.fillRect(cx - dw / 2 + 2, top + height - dh + 2, dw / 2 - 2, dh - 4);
  ctx.fillStyle = "#b87820";
  ctx.fillRect(cx + 2, top + height - 9, 2, 2);

  // ── CHIMNEY (house only) ──
  if (feature.style === "house") {
    ctx.fillStyle = "#786050";
    ctx.fillRect(cx + 10, top + 6, 7, 13);
    ctx.fillStyle = "#9a8070";
    ctx.fillRect(cx + 11, top + 5, 5, 2);
  }

  // ── ROOF ──
  ctx.fillStyle = roofMain;
  ctx.beginPath();
  ctx.moveTo(left - 2, eaveY);
  ctx.lineTo(cx, top + 2);
  ctx.lineTo(left + width + 2, eaveY);
  ctx.closePath();
  ctx.fill();
  // Underside shadow triangle
  ctx.fillStyle = roofDark;
  ctx.beginPath();
  ctx.moveTo(left, eaveY);
  ctx.lineTo(cx, top + 11);
  ctx.lineTo(left + width, eaveY);
  ctx.closePath();
  ctx.fill();
  // Ridge highlight line
  ctx.fillStyle = roofLight;
  ctx.fillRect(cx - 1, top + 2, 2, 18);
  // Horizontal tile stripes
  ctx.fillStyle = "rgba(0,0,0,0.10)";
  for (let ry = top + 5; ry < eaveY; ry += 4) {
    const p = (ry - top - 2) / 18;
    const hw = Math.round(p * (width / 2 + 2));
    ctx.fillRect(cx - hw, ry, hw * 2, 1);
  }
  // Eave board
  ctx.fillStyle = wallLight;
  ctx.fillRect(left - 2, eaveY - 1, width + 4, 4);
  ctx.fillStyle = wallDark;
  ctx.fillRect(left - 2, eaveY + 2, width + 4, 1);

  // ── SIGN (on wall, below eave) ──
  if (feature.label) {
    const sy = eaveY + 5;
    ctx.fillStyle = "#b87018";
    ctx.fillRect(left + 6, sy, width - 12, 10);
    ctx.fillStyle = "rgba(255,240,150,0.22)";
    ctx.fillRect(left + 7, sy + 1, width - 14, 3);
    ctx.fillStyle = "#7a4408";
    ctx.fillRect(left + 6, sy, width - 12, 1);
    ctx.fillRect(left + 6, sy + 9, width - 12, 1);
    ctx.fillStyle = "#120800";
    ctx.font = "bold 7px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(feature.label.slice(0, 14), cx, sy + 8);
  }
}

function drawDock(ctx, feature) {
  const left = feature.x * GAME_TILE_SIZE;
  const top = feature.y * GAME_TILE_SIZE;
  const width = feature.w * GAME_TILE_SIZE;
  const height = feature.h * GAME_TILE_SIZE;

  // Dock planks — warm tan wood
  ctx.fillStyle = "#b88c58";
  ctx.fillRect(left, top + 2, width, height - 2);
  // Top highlight
  ctx.fillStyle = "#d4aa70";
  ctx.fillRect(left, top + 2, width, 3);

  // Plank dividers — horizontal
  ctx.fillStyle = "rgba(90, 54, 18, 0.40)";
  for (let py = top + 2; py < top + height; py += 8) {
    ctx.fillRect(left, py + 7, width, 1);
  }

  // Support posts under dock edge
  ctx.fillStyle = "#7a5028";
  for (let px = left + 10; px < left + width; px += 16) {
    ctx.fillRect(px, top, 4, 5);
    ctx.fillStyle = "#a07040";
    ctx.fillRect(px, top, 2, 5);
    ctx.fillStyle = "#7a5028";
  }

  // Rope/chain line along edge
  ctx.fillStyle = "rgba(90, 60, 20, 0.50)";
  ctx.fillRect(left, top + 2, width, 1);
}

function drawBanner(ctx, feature, timestamp) {
  const left = feature.x * GAME_TILE_SIZE;
  const top = feature.y * GAME_TILE_SIZE;
  const wave = Math.sin(timestamp / 280) * 2;

  // Wooden support poles
  ctx.fillStyle = "#7a5020";
  ctx.fillRect(left + 1, top - 10, 4, 22);
  ctx.fillRect(left + 24, top - 10, 4, 22);
  // Pole highlight
  ctx.fillStyle = "#a87840";
  ctx.fillRect(left + 2, top - 10, 2, 22);
  ctx.fillRect(left + 25, top - 10, 2, 22);

  // Rope connecting poles
  ctx.fillStyle = "#8a7040";
  ctx.fillRect(left + 4, top - 8, 21, 1);

  // Fabric banner body with wave
  ctx.fillStyle = "#f0c040";
  ctx.beginPath();
  ctx.moveTo(left + 4, top - 6);
  ctx.lineTo(left + 25, top - 4 + wave * 0.5);
  ctx.lineTo(left + 25, top + 9 + wave);
  ctx.lineTo(left + 4, top + 7);
  ctx.closePath();
  ctx.fill();
  // Banner shadow stripe
  ctx.fillStyle = "rgba(180, 120, 0, 0.35)";
  ctx.fillRect(left + 5, top + 4 + wave * 0.5, 20, 3);
  // Banner text
  ctx.fillStyle = "#5a2010";
  ctx.font = "bold 6px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText((feature.text || "").slice(0, 12), left + 15, top + 3 + wave * 0.3);
}

function drawPortalSign(ctx, feature) {
  const left = feature.x * GAME_TILE_SIZE;
  const top = feature.y * GAME_TILE_SIZE;

  // Post
  ctx.fillStyle = "#7a5020";
  ctx.fillRect(left + 11, top + 10, 4, 18);
  ctx.fillStyle = "#a87840";
  ctx.fillRect(left + 12, top + 10, 2, 18);

  // Arrow sign board (directional like reference)
  ctx.fillStyle = "#c89448";
  ctx.beginPath();
  ctx.moveTo(left + 1, top + 4);
  ctx.lineTo(left + 22, top + 4);
  ctx.lineTo(left + 26, top + 10);
  ctx.lineTo(left + 22, top + 16);
  ctx.lineTo(left + 1, top + 16);
  ctx.closePath();
  ctx.fill();
  // Sign outline
  ctx.fillStyle = "#7a5820";
  ctx.fillRect(left + 1, top + 4, 21, 1);
  ctx.fillRect(left + 1, top + 15, 21, 1);
  // Sign highlight
  ctx.fillStyle = "#e8c070";
  ctx.fillRect(left + 2, top + 5, 20, 2);
  // Sign text
  ctx.fillStyle = "#2a1a08";
  ctx.font = "bold 6px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText((feature.text || "").slice(0, 10), left + 13, top + 13);
}

function drawFeature(ctx, feature, timestamp) {
  switch (feature.type) {
    case "tree":
      drawTree(ctx, feature, timestamp);
      break;
    case "bench":
      drawBench(ctx, feature);
      break;
    case "lamp":
      drawLamp(ctx, feature, timestamp);
      break;
    case "flowerbed":
      drawFlowerbed(ctx, feature);
      break;
    case "fountain":
      drawFountain(ctx, feature, timestamp);
      break;
    case "gazebo":
      drawGazebo(ctx, feature);
      break;
    case "building":
      drawBuilding(ctx, feature);
      break;
    case "dock":
      drawDock(ctx, feature);
      break;
    case "banner":
      drawBanner(ctx, feature, timestamp);
      break;
    case "portal-sign":
      drawPortalSign(ctx, feature);
      break;
    default:
      break;
  }
}

function drawAmbientParticles(ctx, zone, timestamp) {
  const width = state.gameViewportWidth;
  const height = state.gameViewportHeight;
  ctx.save();
  for (let index = 0; index < 24; index += 1) {
    const phase = timestamp * 0.018 + (index * 17);
    const x = ((phase * 0.8) + (index * 23)) % (width + 40) - 20;
    const y = ((Math.sin((timestamp / 900) + index) * 0.5 + 0.5) * height * 0.8) + ((index * 29) % 36);
    const size = 2 + (index % 3);
    ctx.fillStyle = index % 2 === 0 ? "rgba(255, 214, 232, 0.72)" : "rgba(255, 245, 184, 0.68)";
    ctx.beginPath();
    ctx.ellipse(x, y % height, size, size * 0.7, Math.sin(index), 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function getZonePixelSize(zone) {
  return {
    width: (zone?.tiles?.[0]?.length || 0) * GAME_TILE_SIZE,
    height: (zone?.tiles?.length || 0) * GAME_TILE_SIZE
  };
}

function getWorldRenderScale(zone) {
  const zoneSize = getZonePixelSize(zone);
  const viewportWidth = state.gameViewportWidth;
  const viewportHeight = state.gameViewportHeight;

  if (!zoneSize.width || !zoneSize.height || !viewportWidth || !viewportHeight) {
    return 1;
  }

  const fitScale = Math.min(viewportWidth / zoneSize.width, viewportHeight / zoneSize.height);
  return Math.max(1, fitScale * 1.45);
}

function getRenderedPlayerPosition(timestamp) {
  if (!state.gameSession?.player?.position) {
    return { x: 0, y: 0, direction: "down" };
  }

  const direction = state.gameSession.player.position.direction || "down";

  if (!state.playerTweenStartAt || state.playerTweenDurationMs <= 0) {
    return {
      x: state.playerTargetX,
      y: state.playerTargetY,
      direction
    };
  }

  const elapsed = timestamp - state.playerTweenStartAt;
  const t = Math.min(1, Math.max(0, elapsed / state.playerTweenDurationMs));
  const eased = 1 - ((1 - t) * (1 - t));

  const x = state.playerStartX + ((state.playerTargetX - state.playerStartX) * eased);
  const y = state.playerStartY + ((state.playerTargetY - state.playerStartY) * eased);

  state.playerRenderX = x;
  state.playerRenderY = y;

  return { x, y, direction };
}

function drawPlayer(ctx, player, timestamp, renderPosition = null) {
  const position = player?.position;
  if (!position) {
    return;
  }

  const activePosition = renderPosition || position;
  const cx = activePosition.x * GAME_TILE_SIZE + GAME_TILE_SIZE / 2;
  const cy = activePosition.y * GAME_TILE_SIZE + GAME_TILE_SIZE / 2;
  const displayName = (player.name || userName).slice(0, 12);
  const facing = activePosition.direction || "down";

  // Walk animation only active while tween is running (not during idle)
  const tweenElapsed = timestamp - (state.playerTweenStartAt || 0);
  const isMoving = state.playerTweenStartAt > 0 && tweenElapsed < (state.playerTweenDurationMs + 100);
  const walkCycle = isMoving ? Math.sin(timestamp / 130) : 0;
  const bob = isMoving ? walkCycle * 0.9 : 0;
  const legA = walkCycle * 3.5;   // front leg vertical offset
  const legB = -walkCycle * 3.5;  // back leg (opposite phase)

  // Ground shadow
  ctx.fillStyle = "rgba(0, 0, 0, 0.18)";
  ctx.beginPath();
  ctx.ellipse(cx, cy + 13, 9, 4, 0, 0, Math.PI * 2);
  ctx.fill();

  // Mirror left-facing using canvas transform so we only need one side-profile draw path
  ctx.save();
  ctx.translate(cx, cy);
  if (facing === "left") {
    ctx.scale(-1, 1);
  }

  if (facing === "left" || facing === "right") {
    // ── SIDE PROFILE ────────────────────────────────────
    // Back leg (darker, behind body)
    ctx.fillStyle = "#1e1208";
    ctx.fillRect(0, 7 + bob + legB, 4, 7);
    ctx.fillStyle = "#3a2818";
    ctx.fillRect(1, 7 + bob + legB, 2, 2);

    // Body side (narrower than front)
    ctx.fillStyle = "#d04040";
    ctx.fillRect(-5, -1 + bob, 11, 10);
    ctx.fillStyle = "#e87070";
    ctx.fillRect(-4, -1 + bob, 9, 2);   // collar
    ctx.fillStyle = "#a02828";
    ctx.fillRect(-5, 7 + bob, 11, 2);   // hem

    // Back arm (behind body, muted)
    ctx.fillStyle = "#c09870";
    ctx.fillRect(-6, 1 + bob - walkCycle * 2.5, 3, 6);

    // Front leg (in front of body)
    ctx.fillStyle = "#2a1a0e";
    ctx.fillRect(-4, 7 + bob + legA, 5, 7);
    ctx.fillStyle = "#4a3020";
    ctx.fillRect(-3, 7 + bob + legA, 3, 2);

    // Front arm (in front of body)
    ctx.fillStyle = "#e8b888";
    ctx.fillRect(4, 1 + bob + walkCycle * 2.5, 3, 6);

    // Head — side profile
    const hy = -12 + bob;
    ctx.fillStyle = "#f0c090";
    ctx.fillRect(-6, hy, 13, 13);
    ctx.fillStyle = "#f0a080";
    ctx.fillRect(4, hy + 7, 2, 2);      // cheek
    ctx.fillStyle = "#d89860";
    ctx.fillRect(-5, hy + 11, 11, 2);   // jaw

    // Hair — top + forward tuft
    ctx.fillStyle = "#2e1e10";
    ctx.fillRect(-7, hy - 5, 15, 8);
    ctx.fillRect(-6, hy - 6, 13, 3);
    ctx.fillRect(4, hy - 1, 4, 7);      // hair sticking forward
    ctx.fillStyle = "#5a3820";
    ctx.fillRect(-5, hy - 5, 11, 2);

    // Single eye (facing right = left side of head in profile)
    ctx.fillStyle = "#18100a";
    ctx.fillRect(1, hy + 4, 3, 3);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(3, hy + 4, 1, 1);

    // Nose tip
    ctx.fillStyle = "#d89860";
    ctx.fillRect(6, hy + 7, 2, 1);

  } else if (facing === "up") {
    // ── BACK VIEW ───────────────────────────────────────
    // Legs
    ctx.fillStyle = "#2a1a0e";
    ctx.fillRect(-7, 7 + bob + legA, 5, 7);
    ctx.fillRect(2, 7 + bob + legB, 5, 7);
    ctx.fillStyle = "#4a3020";
    ctx.fillRect(-6, 7 + bob + legA, 3, 2);
    ctx.fillRect(3, 7 + bob + legB, 3, 2);

    // Body back
    ctx.fillStyle = "#d04040";
    ctx.fillRect(-8, -1 + bob, 16, 10);
    ctx.fillStyle = "#a02828";
    ctx.fillRect(-8, 7 + bob, 16, 2);

    // Arms
    ctx.fillStyle = "#e8b888";
    ctx.fillRect(-11, 1 + bob + legB * 0.5, 4, 7);
    ctx.fillRect(7, 1 + bob + legA * 0.5, 4, 7);

    // Head back — fully covered by hair
    const hy = -12 + bob;
    ctx.fillStyle = "#f0c090";
    ctx.fillRect(-4, hy + 10, 8, 3);   // neck strip
    ctx.fillStyle = "#2e1e10";
    ctx.fillRect(-9, hy - 5, 18, 18);  // hair covers entire head
    ctx.fillRect(-8, hy - 6, 16, 4);
    ctx.fillRect(-10, hy - 1, 3, 9);   // left side tuft
    ctx.fillRect(7, hy - 1, 3, 9);     // right side tuft
    ctx.fillStyle = "#5a3820";
    ctx.fillRect(-7, hy - 5, 14, 2);

  } else {
    // ── FRONT VIEW ──────────────────────────────────────
    // Legs
    ctx.fillStyle = "#2a1a0e";
    ctx.fillRect(-7, 7 + bob + legA, 5, 7);
    ctx.fillRect(2, 7 + bob + legB, 5, 7);
    ctx.fillStyle = "#4a3020";
    ctx.fillRect(-6, 7 + bob + legA, 3, 2);
    ctx.fillRect(3, 7 + bob + legB, 3, 2);

    // Body
    ctx.fillStyle = "#d04040";
    ctx.fillRect(-8, -1 + bob, 16, 10);
    ctx.fillStyle = "#e87070";
    ctx.fillRect(-7, -1 + bob, 14, 2);  // collar
    ctx.fillStyle = "#a02828";
    ctx.fillRect(-8, 7 + bob, 16, 2);   // hem
    ctx.fillStyle = "rgba(0,0,0,0.10)";
    ctx.fillRect(-1, -1 + bob, 2, 9);   // center seam

    // Arms (swing opposite to legs)
    ctx.fillStyle = "#e8b888";
    ctx.fillRect(-11, 1 + bob + legA * 0.55, 4, 7);
    ctx.fillRect(7, 1 + bob + legB * 0.55, 4, 7);

    // Head
    const hy = -12 + bob;
    ctx.fillStyle = "#f0c090";
    ctx.fillRect(-9, hy, 18, 14);
    ctx.fillStyle = "#f0a080";
    ctx.fillRect(-8, hy + 8, 3, 2);    // left cheek
    ctx.fillRect(5, hy + 8, 3, 2);     // right cheek
    ctx.fillStyle = "#d89860";
    ctx.fillRect(-8, hy + 11, 16, 2);  // jaw

    // Hair
    ctx.fillStyle = "#2e1e10";
    ctx.fillRect(-10, hy - 5, 20, 8);
    ctx.fillRect(-9, hy - 6, 18, 3);
    ctx.fillRect(-11, hy - 2, 3, 8);   // left tuft
    ctx.fillRect(8, hy - 2, 3, 8);     // right tuft
    ctx.fillStyle = "#5a3820";
    ctx.fillRect(-8, hy - 5, 14, 2);

    // Eyes
    ctx.fillStyle = "#18100a";
    ctx.fillRect(-5, hy + 4, 3, 3);
    ctx.fillRect(2, hy + 4, 3, 3);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(-5, hy + 4, 1, 1);
    ctx.fillRect(2, hy + 4, 1, 1);

    // Nose + smile
    ctx.fillStyle = "#d89860";
    ctx.fillRect(-1, hy + 8, 2, 1);
    ctx.fillStyle = "#c06050";
    ctx.fillRect(-2, hy + 10, 4, 1);
  }

  ctx.restore();

  // Nameplate drawn after restore so it is never flipped
  const nameW = 52;
  ctx.fillStyle = "rgba(14, 28, 45, 0.82)";
  ctx.fillRect(cx - nameW / 2, cy - 30, nameW, 13);
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 9px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(displayName, cx, cy - 21);
}

function getCameraOffset(zone, playerPosition, viewportWidth, viewportHeight) {
  const zoneSize = getZonePixelSize(zone);
  const mapWidth = zoneSize.width;
  const mapHeight = zoneSize.height;
  const playerCenterX = (playerPosition.x * GAME_TILE_SIZE) + (GAME_TILE_SIZE / 2);
  const playerCenterY = (playerPosition.y * GAME_TILE_SIZE) + (GAME_TILE_SIZE / 2);
  const maxOffsetX = Math.max(0, mapWidth - viewportWidth);
  const maxOffsetY = Math.max(0, mapHeight - viewportHeight);

  const offsetX = Math.min(Math.max(playerCenterX - (viewportWidth / 2), 0), maxOffsetX);
  const offsetY = Math.min(Math.max(playerCenterY - (viewportHeight / 2), 0), maxOffsetY);

  return { x: offsetX, y: offsetY };
}

function resizeGameCanvas() {
  if (!gameCanvas || !gameStage || !gameContext) {
    return;
  }

  const stageRect = gameStage.getBoundingClientRect();
  const nextWidth = Math.floor(stageRect.width);
  const nextHeight = Math.floor(stageRect.height);
  const nextDpr = Math.min(3, Math.max(1, window.devicePixelRatio || 1));
  const nextPixelWidth = Math.max(1, Math.floor(nextWidth * nextDpr));
  const nextPixelHeight = Math.max(1, Math.floor(nextHeight * nextDpr));

  if (nextWidth < 120 || nextHeight < 120) {
    return;
  }

  if (
    gameCanvas.width === nextPixelWidth
    && gameCanvas.height === nextPixelHeight
    && state.gameViewportWidth === nextWidth
    && state.gameViewportHeight === nextHeight
    && state.gameDpr === nextDpr
  ) {
    return;
  }

  gameCanvas.style.width = `${nextWidth}px`;
  gameCanvas.style.height = `${nextHeight}px`;
  gameCanvas.width = nextPixelWidth;
  gameCanvas.height = nextPixelHeight;
  state.gameViewportWidth = nextWidth;
  state.gameViewportHeight = nextHeight;
  state.gameDpr = nextDpr;
  gameContext.setTransform(nextDpr, 0, 0, nextDpr, 0, 0);
  gameContext.imageSmoothingEnabled = true;
  gameContext.imageSmoothingQuality = "high";
  state.gameCameraReady = false;
}

function updateSmoothCamera(targetCamera) {
  if (!state.gameCameraReady) {
    state.gameCameraX = targetCamera.x;
    state.gameCameraY = targetCamera.y;
    state.gameCameraReady = true;
    return targetCamera;
  }

  state.gameCameraX += (targetCamera.x - state.gameCameraX) * GAME_CAMERA_LERP;
  state.gameCameraY += (targetCamera.y - state.gameCameraY) * GAME_CAMERA_LERP;

  return { x: state.gameCameraX, y: state.gameCameraY };
}

function renderGameFrame(timestamp = performance.now()) {
  if (!gameContext || !state.gameSession?.zone || !state.gameSession?.player?.position) {
    state.gameLoopId = window.requestAnimationFrame(renderGameFrame);
    return;
  }

  const { zone, player } = state.gameSession;
  resizeGameCanvas();
  const zoneSize = getZonePixelSize(zone);
  const viewportWidth = state.gameViewportWidth;
  const viewportHeight = state.gameViewportHeight;
  const worldScale = getWorldRenderScale(zone);
  const worldViewportWidth = viewportWidth / worldScale;
  const worldViewportHeight = viewportHeight / worldScale;
  const playerRenderPosition = getRenderedPlayerPosition(timestamp);
  const camera = updateSmoothCamera(getCameraOffset(zone, playerRenderPosition, worldViewportWidth, worldViewportHeight));
  const padX = Math.max(0, (worldViewportWidth - zoneSize.width) / 2);
  const padY = Math.max(0, (worldViewportHeight - zoneSize.height) / 2);

  gameContext.clearRect(0, 0, viewportWidth, viewportHeight);
  const skyGradient = gameContext.createLinearGradient(0, 0, 0, viewportHeight);
  const backdropColor = normalizeHexColor(state.gameBackdropColor, "#b7dced");
  skyGradient.addColorStop(0, mixColors(backdropColor, "#ffffff", 0.2));
  skyGradient.addColorStop(1, backdropColor);
  gameContext.fillStyle = skyGradient;
  gameContext.fillRect(0, 0, viewportWidth, viewportHeight);

  gameContext.save();
  gameContext.scale(worldScale, worldScale);
  const snappedTranslateX = Math.round((padX - camera.x) * worldScale) / worldScale;
  const snappedTranslateY = Math.round((padY - camera.y) * worldScale) / worldScale;
  gameContext.translate(snappedTranslateX, snappedTranslateY);

  zone.tiles.forEach((row, y) => {
    Array.from(row).forEach((tile, x) => {
      drawGameTile(gameContext, tile, x, y, timestamp);
    });
  });

  (zone.features || []).forEach((feature) => {
    drawFeature(gameContext, feature, timestamp);
  });

  drawPortalMarkers(gameContext, zone.portals || [], timestamp);
  drawPlayer(gameContext, player, timestamp, playerRenderPosition);

  gameContext.restore();
  drawAmbientParticles(gameContext, zone, timestamp);

  // Update HUD meta line every frame so time ticks in real time
  if (!state.gameMovePending) {
    gameMeta.textContent = `${zone.name || "-"}  ·  ${zone.visitorsToday ?? 0} people  ·  ${formatTimePlayed(player.sessionStartedAt)}`;
  }

  state.gameLoopId = window.requestAnimationFrame(renderGameFrame);
}

function ensureGameLoop() {
  if (!gameContext || state.gameLoopId) {
    return;
  }

  state.gameLoopId = window.requestAnimationFrame(renderGameFrame);
}

function renderGameSession(game) {
  const previousZoneId = state.gameSession?.zone?.id || "";
  state.gameSession = game || null;
  state.gamePreview = game?.gamePreview || null;

  if (!game?.zone || !game?.player?.position) {
    state.gameCameraReady = false;
    syncGameWindowLabels("");
    gameZone.textContent = t("game.loadingZone");
    gamePosition.textContent = tf("game.position", { zone: "--", x: "--", y: "--" });
    gameMeta.textContent = t("game.loadingMeta");
    setGameStatus(t("game.connecting"));
    return;
  }

  const { zone, player } = game;
  const incomingX = Number(player.position.x) || 0;
  const incomingY = Number(player.position.y) || 0;

  if (!state.playerTweenStartAt || previousZoneId !== zone.id) {
    state.playerRenderX = incomingX;
    state.playerRenderY = incomingY;
    state.playerStartX = incomingX;
    state.playerStartY = incomingY;
    state.playerTargetX = incomingX;
    state.playerTargetY = incomingY;
    state.playerTweenStartAt = performance.now();
  } else if (state.playerTargetX !== incomingX || state.playerTargetY !== incomingY) {
    state.playerStartX = state.playerRenderX;
    state.playerStartY = state.playerRenderY;
    state.playerTargetX = incomingX;
    state.playerTargetY = incomingY;
    state.playerTweenStartAt = performance.now();
  }

  resizeGameCanvas();
  const worldScale = getWorldRenderScale(zone);
  const worldViewportWidth = state.gameViewportWidth / worldScale;
  const worldViewportHeight = state.gameViewportHeight / worldScale;
  const targetCamera = getCameraOffset(zone, { x: state.playerTargetX, y: state.playerTargetY }, worldViewportWidth, worldViewportHeight);
  if (!state.gameCameraReady || previousZoneId !== zone.id) {
    state.gameCameraX = targetCamera.x;
    state.gameCameraY = targetCamera.y;
    state.gameCameraReady = true;
  }

  gameZone.textContent = zone.name || t("game.loadingZone");
  syncGameWindowLabels(zone.name || "");
  gamePosition.textContent = tf("game.position", {
    zone: zone.name || "--",
    x: player.position.x,
    y: player.position.y
  });
  gameMeta.textContent = `${zone.name || "-"}  ·  ${zone.visitorsToday ?? 0} people  ·  ${formatTimePlayed(player.sessionStartedAt)}`;

  if (!state.gameMovePending && !player.running) {
    setGameStatus(t("game.status.offline"));
  }

  ensureGameLoop();
}

function applyConfig(config) {
  const wallpaperColor = config.wallpaperColor || "#3f76bf";
  const windowBgColor = normalizeHexColor(config.windowBgColor, "#f2f4f8");
  const borderColor = config.borderColor || "#0f2b4a";
  const themeColor = config.themeColor || "#2f6eb1";
  const textColor = normalizeHexColor(config.textColor, "#16202b");
  const gameBackdropColor = normalizeHexColor(config.gameBackdropColor, "#b7dced");
  const soundEnabled = Boolean(config.soundEnabled);
  const language = normalizeLanguage(config.language);

  document.documentElement.style.setProperty("--desktop-wallpaper", wallpaperColor);
  document.documentElement.style.setProperty("--window-bg", windowBgColor);
  document.documentElement.style.setProperty("--window-border", borderColor);

  wallpaperColorInput.value = wallpaperColor;
  windowBgColorInput.value = windowBgColor;
  borderColorInput.value = borderColor;
  applyThemeColor(themeColor);
  applyTextColor(textColor);
  gameBackdropColorInput.value = gameBackdropColor;
  state.gameBackdropColor = gameBackdropColor;
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

  const [session, profile, friends, notifications, messages, feed, config, gameSession] = await Promise.all([
    apiRequest(buildQuery("/api/session", query)),
    apiRequest(buildQuery("/api/profile", query)),
    apiRequest(buildQuery("/api/friends", query)),
    apiRequest(buildQuery("/api/notifications", query)),
    apiRequest(buildQuery("/api/messages", query)),
    apiRequest(buildQuery("/api/feed", query)),
    apiRequest(buildQuery("/api/config", query)),
    apiRequest(buildQuery("/api/game-session", query))
  ]);

  state.summary.friendCount = session.summary.friendCount;
  state.summary.unreadNotifications = session.summary.unreadNotifications;
  state.profile = profile.profile || null;
  state.friends = friends.friends || [];

  applyConfig(config.config || {});
  renderProfile(profile.profile || null, profile.user || session.user || { id: "", name: userName });
  updateWelcome();
  renderFriends();
  renderNotifications(notifications.notifications || []);
  renderConversations(messages.conversations || []);
  renderFeed(feed.feed || []);
  renderGameSession(gameSession.game || null);
}

async function moveGamePlayer(direction) {
  const now = performance.now();
  if (!direction || state.gameMovePending || (now - state.gameLastMoveAt) < GAME_MOVE_COOLDOWN_MS) {
    return;
  }

  state.gameMovePending = true;
  state.gameLastMoveAt = now;

  const previousZoneId = state.gameSession?.zone?.id || "";

  try {
    const response = await apiRequest("/api/game-move", {
      method: "POST",
      body: JSON.stringify({ name: userName, direction })
    });

    renderGameSession(response.game || null);

    if (response.game?.zone?.id && response.game.zone.id !== previousZoneId) {
      setGameStatus(tf("game.status.portal", { zone: response.game.zone.name }));
    }
  } catch (error) {
    setGameStatus(error.message);
  } finally {
    state.gameMovePending = false;
  }
}

async function stopGameSession() {
  try {
    await apiRequest("/api/game-session/stop", {
      method: "POST",
      body: JSON.stringify({ name: userName })
    });
  } catch (_error) {
    // Ignore logout session stop failures.
  }
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
    windowBgColor: windowBgColorInput.value,
    borderColor: borderColorInput.value,
    themeColor: themeColorInput.value,
    textColor: textColorInput.value,
    gameBackdropColor: gameBackdropColorInput.value,
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

async function saveSecurity(event) {
  event.preventDefault();

  const currentPassword = securityCurrentPasswordInput.value.trim();
  const nextPassword = securityNextPasswordInput.value.trim();
  const confirmPassword = securityConfirmPasswordInput.value.trim();

  if (!currentPassword || !nextPassword || !confirmPassword) {
    securityStatus.textContent = t("security.currentPassword");
    return;
  }

  if (nextPassword !== confirmPassword) {
    securityStatus.textContent = t("security.passwordMismatch");
    return;
  }

  securityStatus.textContent = t("security.saving");

  await apiRequest("/api/security/password", {
    method: "PUT",
    body: JSON.stringify({
      name: userName,
      currentPassword,
      nextPassword
    })
  });

  securityCurrentPasswordInput.value = "";
  securityNextPasswordInput.value = "";
  securityConfirmPasswordInput.value = "";
  securityStatus.textContent = t("security.saved");
}

async function saveProfile(event) {
  event.preventDefault();

  const nextName = profileNameInput.value.trim();
  if (!nextName) {
    profileStatus.textContent = t("profile.name");
    return;
  }

  profileStatus.textContent = t("profile.saving");

  const payload = {
    name: userName,
    nextName,
    avatarDataUrl: state.profileAvatarDraft || state.profile?.avatarDataUrl || ""
  };

  const response = await apiRequest("/api/profile", {
    method: "PUT",
    body: JSON.stringify(payload)
  });

  const savedProfile = response.profile || {};
  const savedUser = response.user || {};

  if (savedUser.name && savedUser.name !== userName) {
    localStorage.setItem("authUser", savedUser.name);
    window.location.href = "/home.html";
    return;
  }

  state.profileAvatarDraft = "";
  renderProfile(savedProfile, savedUser);
  profileStatus.textContent = t("profile.saved");
  await refreshSessionSummary();
}

windows.forEach((win) => {
  makeDraggable(win);
  makeResizable(win);

  win.addEventListener("pointerdown", () => {
    bringToFront(win);
    saveWindowLayout();
  });
});

profileAvatarButton.addEventListener("click", () => {
  profileAvatarInput.click();
});

profileAvatarResetButton.addEventListener("click", () => {
  resetAvatarCrop();
});

avatarEditorCloseButton.addEventListener("click", () => {
  closeAvatarEditor();
});

avatarEditorCancelButton.addEventListener("click", () => {
  closeAvatarEditor();
});

avatarEditorApplyButton.addEventListener("click", async () => {
  if (!state.profileAvatarSourceDataUrl) {
    return;
  }

  state.profileAvatarDraft = await buildCroppedAvatarDataUrl(state.profileAvatarSourceDataUrl, state.profileAvatarZoom || 1);
  updateProfileAvatarDisplay();
  closeAvatarEditor();
});

avatarEditorCloseTargets.forEach((node) => {
  node.addEventListener("click", () => {
    closeAvatarEditor();
  });
});

function startAvatarCropDrag(event) {
  if (event.button !== 0 || !state.profileAvatarSourceDataUrl) {
    return;
  }

  const metrics = getAvatarCropMetrics();
  if (!metrics) {
    return;
  }

  const clampedCenter = clampAvatarCenter(metrics.centerX, metrics.centerY);

  profileAvatarDragState = {
    isDragging: true,
    startX: event.clientX,
    startY: event.clientY,
    startCenterX: clampedCenter.centerX,
    startCenterY: clampedCenter.centerY,
    imageScale: metrics.imageScale,
    minCenterX: metrics.minCenterX,
    maxCenterX: metrics.maxCenterX,
    minCenterY: metrics.minCenterY,
    maxCenterY: metrics.maxCenterY
  };

  avatarEditorViewport.classList.add("dragging");
  event.preventDefault();
}

avatarEditorViewport.addEventListener("mousedown", startAvatarCropDrag);

function stopAvatarCropDrag() {
  if (!profileAvatarDragState) {
    return;
  }

  profileAvatarDragState.isDragging = false;
  profileAvatarDragState = null;
  avatarEditorViewport.classList.remove("dragging");
}

document.addEventListener("mousemove", async (event) => {
  if (!profileAvatarDragState || !profileAvatarDragState.isDragging) {
    return;
  }

  const dx = event.clientX - profileAvatarDragState.startX;
  const dy = event.clientY - profileAvatarDragState.startY;

  const nextCenter = clampAvatarCenter(
    profileAvatarDragState.startCenterX - dx / profileAvatarDragState.imageScale,
    profileAvatarDragState.startCenterY - dy / profileAvatarDragState.imageScale
  );

  state.profileAvatarCropCenterX = nextCenter.centerX;
  state.profileAvatarCropCenterY = nextCenter.centerY;

  await refreshProfileAvatarPreview();
});

document.addEventListener("mouseup", stopAvatarCropDrag);
avatarEditorViewport.addEventListener("mouseleave", stopAvatarCropDrag);

profileAvatarZoomInput.addEventListener("input", async () => {
  state.profileAvatarZoom = clampNumber(Number(profileAvatarZoomInput.value) || 1, 1, 3);
  updateProfileZoomLabel();

  if (!state.profileAvatarSourceDataUrl && !state.profile?.avatarDataUrl) {
    return;
  }

  try {
    await refreshProfileAvatarPreview();
  } catch (error) {
    profileStatus.textContent = error.message;
  }
});

profileAvatarInput.addEventListener("change", async () => {
  const file = profileAvatarInput.files?.[0];
  if (!file) {
    return;
  }

  if (file.size > 1024 * 1024) {
    profileStatus.textContent = t("profile.iconTooLarge");
    profileAvatarInput.value = "";
    return;
  }

  if (!["image/png", "image/jpeg"].includes(file.type)) {
    profileStatus.textContent = t("profile.iconInvalidType");
    profileAvatarInput.value = "";
    return;
  }

  const dataUrl = await readFileAsDataUrl(file);
  setProfileAvatarSource(dataUrl);
  state.profileAvatarZoom = 1;
  state.profileAvatarCropCenterX = 0;
  state.profileAvatarCropCenterY = 0;
  profileAvatarInput.value = "";

  openAvatarEditor();
  profileStatus.textContent = t("profile.iconHelp");
});

restoreWindowLayout();
window.requestAnimationFrame(resizeGameCanvas);

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

window.addEventListener("keydown", (event) => {
  const direction = getGameDirectionFromKey(event.key);
  if (!direction) {
    return;
  }

  if (isTypingTarget(event.target) || !state.gameSession || !avatarEditorModal.classList.contains("hidden")) {
    return;
  }

  event.preventDefault();
  moveGamePlayer(direction);
});

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
    if (windowName === "game") {
      window.requestAnimationFrame(resizeGameCanvas);
    }
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
  applyTextColor(state.textColor || textColorInput.value);
});

textColorInput.addEventListener("input", () => {
  applyTextColor(textColorInput.value);
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
  resizeGameCanvas();
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

profileForm.addEventListener("submit", async (event) => {
  try {
    await saveProfile(event);
  } catch (error) {
    profileStatus.textContent = error.message;
  }
});

profileAvatarZoomInput.addEventListener("change", () => {
  updateProfileZoomLabel();
});

configForm.addEventListener("submit", async (event) => {
  try {
    await saveConfig(event);
  } catch (error) {
    configStatus.textContent = error.message;
  }
});

securitySaveBtn.addEventListener("click", async () => {
  try {
    await saveSecurity({ preventDefault() {} });
  } catch (error) {
    securityStatus.textContent = error.message;
  }
});

document.getElementById("logout").addEventListener("click", async () => {
  await stopGameSession();
  localStorage.removeItem("authUser");
  window.location.href = "/";
});

openConfigSection("personalize");
loadWindowData().catch((error) => {
  configStatus.textContent = error.message;
});
