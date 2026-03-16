import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

declare global {
  interface Window {
    Echo: Echo<any>;
    Pusher: typeof Pusher;
  }
}

window.Pusher = Pusher;

const reverbKey = 'cfvbmtogk4rzm2nh7ijt';
const reverbHost = 'transport-operations-ws.onrender.com';

const pusher = new Pusher(reverbKey, {
  wsHost: reverbHost,
  wsPort: 443,
  wssPort: 443,
  forceTLS: true,
  enabledTransports: ['wss'],
});

window.Echo = new Echo({
  broadcaster: 'pusher',
  client: pusher,
});