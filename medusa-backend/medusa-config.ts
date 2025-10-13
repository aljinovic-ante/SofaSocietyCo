import { loadEnv, defineConfig } from "@medusajs/framework/utils"

loadEnv(process.env.NODE_ENV || "development", process.cwd())

export default defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
    http: {
      storeCors: "http://localhost:8000,http://192.168.56.1:8000",
      adminCors: "http://localhost:7000,http://localhost:7001",
      authCors: "http://localhost:8000,http://localhost:7000,http://localhost:7001",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
  },

  modules: {
    eventBus: {
      resolve: "@medusajs/event-bus-local",
    },
    cacheService: {
      resolve: "@medusajs/cache-inmemory",
    },
    auth: {
      resolve: "@medusajs/auth",
      options: {
        providers: [
          {
            id: "emailpass",
            resolve: "@medusajs/auth-emailpass",
            options: {
              provider: "emailpass",
              expiresIn: "7d",
              cookie: {
                sameSite: "none",
                secure: false,
              },
            },
          },
        ],
      },
    },
  },
})
