import { RATE_LIMIT_MAX, RATE_LIMIT_WINDOW, SPIKE_LIMIT_MAX, SPIKE_LIMIT_WINDOW } from '@config';
import rateLimit from 'express-rate-limit';

// Limiter for standard traffic
const standardLimiter = rateLimit({
  windowMs: parseInt(RATE_LIMIT_WINDOW, 10),
  max: parseInt(RATE_LIMIT_MAX, 10),
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Limiter for spikes in traffic
const spikeLimiter = rateLimit({
  windowMs: parseInt(SPIKE_LIMIT_WINDOW, 10),
  max: parseInt(SPIKE_LIMIT_MAX, 10),
  standardHeaders: true,
  legacyHeaders: false,
});

export default { standardLimiter, spikeLimiter };
