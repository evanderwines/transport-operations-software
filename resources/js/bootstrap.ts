// Confirm the bundle is running
console.log("bootstrap loaded");

import Echo from "laravel-echo";
import Pusher from "pusher-js";

declare global {
  interface Window {
    Echo: Echo<any>;
    Pusher: typeof Pusher;
  }
}

window.Pusher = Pusher;

const REVERB_KEY = "cfvbmtogk4rzm2nh7ijt";
const REVERB_HOST = "transport-operations-ws.onrender.com";

// Enable internal Pusher logs
(Pusher as any).logToConsole = true;

const pusher = new Pusher(REVERB_KEY, {
  cluster: undefined as any,
  wsHost: REVERB_HOST,
  wsPort: 443,
  wssPort: 443,
  forceTLS: true,
  enabledTransports: ["wss"],
});

// Debug connection lifecycle
pusher.connection.bind("connecting", () => {
  console.log("Pusher connecting...");
});

pusher.connection.bind("connected", () => {
  console.log("Pusher connected");
});

pusher.connection.bind("disconnected", () => {
  console.log("Pusher disconnected");
});

pusher.connection.bind("error", (error: any) => {
  console.log("Pusher error:", error);
});

pusher.connection.bind("state_change", (states: any) => {
  console.log("Pusher state change:", states);
});

// Initialize Echo
window.Echo = new Echo({
  broadcaster: "pusher",
  client: pusher,
});

// Echo-level debugging
window.Echo.connector.pusher.connection.bind("connected", () => {
  console.log("Echo connected");
});

window.Echo.connector.pusher.connection.bind("error", (err: any) => {
  console.log("Echo error:", err);
});

console.log("Echo initialized", window.Echo);