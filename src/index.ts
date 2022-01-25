import { Application } from "oak";
import { userRouter } from "./domain/user/user.router.ts";
import { databaseMiddleware } from "./shared/middlewares/database.middleware.ts";
import { loggerMiddleware } from "./shared/middlewares/logger.middleware.ts";
import { requestIdMiddleware } from "./shared/middlewares/request-id.middleware.ts";
import { DatabaseConnector } from "./shared/utils/database.ts";
import { errorMiddleware } from './shared/middlewares/error.middleware.ts';

import { registerRouters } from "./shared/utils/register-routers.ts";
import { AppState } from "./types/state.ts";

const app = new Application<AppState>();

const database = await new DatabaseConnector().connect()

app.use(requestIdMiddleware);
app.use(errorMiddleware)
app.use(loggerMiddleware(Number(Deno.env.get("LOG_LEVEL"))));
app.use(databaseMiddleware(database));

registerRouters({
  app,
  routers: [
    userRouter
  ]
});

app.addEventListener("listen", () => {
  console.log(`Server started at http://localhost:${Deno.env.get("PORT")}`);
})

await app.listen({ port: Number(Deno.env.get("PORT")) });
