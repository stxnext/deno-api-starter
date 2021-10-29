import { Application } from "oak";
import { userRouter } from "./domain/user/user.router.ts";
import { loggerMiddleware } from "./shared/middlewares/logger.middleware.ts";
import { requestIdMiddleware } from "./shared/middlewares/request-id.middleware.ts";
import { LogLevel } from "./shared/utils/logger.ts";
import { registerRouters } from "./shared/utils/register-routers.ts";
import { AppState } from "./types/state.ts";



const app = new Application<AppState>();

app.use(requestIdMiddleware);
app.use(loggerMiddleware(LogLevel.DEBUG));

registerRouters({
  app,
  routers: [
    userRouter
  ]
});

app.addEventListener("listen", () => {
  console.log("Server started at http://localhost:1337");
})

await app.listen({ port: 1337 });