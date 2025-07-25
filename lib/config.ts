const config = {
  env: {
    apiEndpoint: process.env.URL_ENDPOINT!,
    productionApiEndpoint: process.env.NEXT_PUBLIC_PROD_API_ENDPOINT!,

    imagekit: {
      endpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_KEY!,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    },

    dbConnectionUrl: process.env.DB_CONNECTION_URL!,
    redis: {
      endpoint: process.env.REDIS_DB_ENDPOINT!,
      token: process.env.REDIS_TOKEN!,
    },

    qstash: {
      qstashUrl: process.env.QSTASH_URL!,
      qstashToken: process.env.QSTASH_TOKEN!,
    },

    resendToken: process.env.RESEND_TOKEN!,
  },
};

export default config;
