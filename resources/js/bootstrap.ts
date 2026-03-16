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
  wsPort: 443,
  wssPort: 443,
  forceTLS: true,
  enabledTransports: ['wss'],
  disableStats: true,
});

// Log the actual socket URL Pusher uses
pusher.connection.bind('connecting', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const url = (pusher.connection as any).connection?.url;
  // eslint-disable-next-line no-console
  console.log('Pusher connecting URL', url);
});
pusher.connection.bind('connected', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const url = (pusher.connection as any).connection?.url;
  // eslint-disable-next-line no-console
  console.log('Pusher connected URL', url);
});
pusher.connection.bind('error', (err: any) => {
  // eslint-disable-next-line no-console
  console.log('Pusher error', err);
});

// Force a connection attempt so we see logs
pusher.connect();
// eslint-disable-next-line no-console
console.log('Pusher state (immediate)', pusher.connection.state);
setTimeout(() => {
  // eslint-disable-next-line no-console
  console.log('Pusher state (after 2s)', pusher.connection.state);
}, 2000);

window.Echo = new Echo({
  broadcaster: 'pusher',
  client: pusher,
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
