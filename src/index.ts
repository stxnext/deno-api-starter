import { Application } from "oak";
import { userRouter } from "./domain/user/user.router.ts";
import { databaseMiddleware } from "./shared/middlewares/database.middleware.ts";
import { loggerMiddleware } from "./shared/middlewares/logger.middleware.ts";
import { releaseDatabaseMiddleware } from "./shared/middlewares/release-database.middleware.ts";
import { requestIdMiddleware } from "./shared/middlewares/request-id.middleware.ts";
import { Database } from "./shared/utils/database.ts";
import { registerRouters } from "./shared/utils/register-routers.ts";
import { AppState } from "./types/state.ts";

const app = new Application<AppState>();

const database = new Database({
  dbOptions: {
    user: Deno.env.get("POSTGRES_USER"),
    database: Deno.env.get("POSTGRES_DB"),
    hostname: Deno.env.get("POSTGRES_HOSTNAME"),
    password: Deno.env.get("POSTGRES_PASSWORD"),
    port: 5432,
  }, 
  poolSize: Number(Deno.env.get("POSTGRES_POOL_SIZE")), 
  lazyConnections: true
});

app.use(requestIdMiddleware);
app.use(loggerMiddleware(Number(Deno.env.get("LOG_LEVEL"))));
app.use(databaseMiddleware(database));

registerRouters({
  app,
  routers: [
    userRouter
  ]
});

app.use(releaseDatabaseMiddleware(database));

app.addEventListener("listen", () => {
  console.log(`Server started at http://localhost:${Deno.env.get("PORT")}`);
})

await app.listen({ port: Number(Deno.env.get("PORT")) });