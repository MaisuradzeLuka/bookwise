import config from "@/lib/config";
import { Redis } from "@upstash/redis";

const redisDb = new Redis({
  url: config.env.redis.endpoint,
  token: config.env.redis.token,
});

export default redisDb;
