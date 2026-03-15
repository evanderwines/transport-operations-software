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

window.Echo = new Echo({
  broadcaster: 'reverb',
  key: reverbKey,
  host: reverbHost,
  httpHost: reverbHost,
  wsHost: reverbHost,
  wsPath: '',
  wsPort: reverbPort,
  wssPort: reverbPort,
  httpPort: reverbPort,
  httpsPort: reverbPort,
  forceTLS: true,
  useTLS: true,
  enabledTransports: ['wss'],
  // This prevents the sockjs fallback:
  disableStats: true,
});
