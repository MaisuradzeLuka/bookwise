import redisDb from "@/database/redis";
import { Ratelimit } from "@upstash/ratelimit";

const rateLimit = new Ratelimit({
  redis: redisDb,
  limiter: Ratelimit.fixedWindow(10, "5m"),
  analytics: true,
  prefix: "@upstash/ratelimit",
});

export default rateLimit;
