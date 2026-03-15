// Sanity check to confirm this file runs in the built bundle.
// eslint-disable-next-line no-console
console.log('bootstrap loaded');

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
const reverbPort = 443;
const reverbPath = `/app/${reverbKey}`;

const pusher = new Pusher(reverbKey, {
  cluster: '',
  wsHost: reverbHost,
  wsPort: reverbPort,
  wssPort: reverbPort,
  wsPath: reverbPath,
  forceTLS: true, 
  enabledTransports: ['wss'],
  // This prevents the sockjs fallback:
  disableStats: true,
});

window.Echo = new Echo({
  broadcaster: 'reverb',
  client: pusher,
  authEndpoint: '',
});

// Debug connection state in the browser console
// eslint-disable-next-line no-console
console.log('Echo instance', window.Echo);
// eslint-disable-next-line no-console
console.log('Echo connector', window.Echo?.connector);
// eslint-disable-next-line no-console
console.log('Echo connection (initial)', window.Echo?.connector?.pusher?.connection?.state);

// Enable Pusher debug logs
try {
  (window as any).Pusher.logToConsole = true;
} catch {}

window.Echo?.connector?.pusher?.connection?.bind('state_change', (s: any) => {
  // eslint-disable-next-line no-console
  console.log('Echo state', s);
});
window.Echo?.connector?.pusher?.connection?.bind('connected', () => {
  // eslint-disable-next-line no-console
  console.log('Echo connected');
});
window.Echo?.connector?.pusher?.connection?.bind('error', (err: any) => {
  // eslint-disable-next-line no-console
  console.log('Echo error', err);
});
window.Echo?.connector?.pusher?.connect();
