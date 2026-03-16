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

(Pusher as any).logToConsole = true;

const pusher = new Pusher(REVERB_KEY, {
    cluster: "mt1",

    wsHost: REVERB_HOST,
    wsPort: 443,
    wssPort: 443,
    wsPath: "",

    forceTLS: true,

    enabledTransports: ["ws", "wss"],
    disabledTransports: ["xhr_streaming", "xhr_polling", "sockjs"]
});

pusher.connection.bind("state_change", (states: any) => {
    console.log("Pusher state:", states);
});

pusher.connection.bind("connected", () => {
    console.log("Pusher connected");
});

pusher.connection.bind("error", (err: any) => {
    console.log("Pusher error:", err);
});

window.Echo = new Echo({
    broadcaster: "pusher",
    client: pusher
});

console.log("Echo initialized", window.Echo);