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

window.Echo = new Echo({
  broadcaster: 'reverb',
  key: reverbKey,
  host: reverbHost,
  httpHost: reverbHost,
  wsHost: reverbHost,
  wsPath: reverbPath,
  wsPort: reverbPort,
  wssPort: reverbPort,
  httpPort: reverbPort,
  httpsPort: reverbPort,
  httpPath: reverbPath,
  forceTLS: true,
  useTLS: true,
  enabledTransports: ['wss'],
  authEndpoint: '',
  // This prevents the sockjs fallback:
  disableStats: true,
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
