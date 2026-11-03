const http = require('http');
const crypto = require('crypto');

// In-memory store for timers
const timers = new Map();

const server = http.createServer((req, res) => {
  const { method, url } = req;

  // POST /new
  if (method === 'POST' && url === '/new') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const countdown = parseInt(payload.countdown, 10);

        if (isNaN(countdown) || countdown < 0) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ error: 'Invalid countdown value' }));
        }

        const timerId = crypto.randomUUID();
        
        const timerState = {
          remaining: countdown,
          interval: null
        };

        // Decrement remaining seconds every 1000ms until reaching 0
        timerState.interval = setInterval(() => {
          timerState.remaining -= 1;
          if (timerState.remaining <= 0) {
            timerState.remaining = 0;
            clearInterval(timerState.interval);
          }
        }, 1000);

        timers.set(timerId, timerState);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ timer_id: timerId }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
      }
    });

    return;
  }

  // GET /timers - List all existing timers
  if (method === 'GET' && url === '/timers') {
    const timerList = Array.from(timers.entries()).map(([id, timer]) => ({
      timer_id: id,
      seconds_left: timer.remaining
    }));

    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(timerList));
  }

  // GET /timer/<timer_id>
  if (method === 'GET' && url.startsWith('/timer/')) {
    const timerId = url.slice(7); // Extract timer_id from "/timer/<timer_id>"

    if (!timerId || !timers.has(timerId)) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Timer not found' }));
    }

    const timer = timers.get(timerId);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ seconds_left: timer.remaining }));
  }

  // 404 handler for undefined endpoints
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Route not found' }));
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});