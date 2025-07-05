import config from "@/lib/config";
import { getUploadAuthParams } from "@imagekit/next/server";

export async function GET() {
  const { token, expire, signature } = getUploadAuthParams({
    privateKey: config.env.imagekit.privateKey,
    publicKey: config.env.imagekit.publicKey,
  });

  return Response.json({
    token,
    expire,
    signature,
    publicKey: config.env.imagekit.publicKey,
  });
}
