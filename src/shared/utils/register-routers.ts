import { Router, Application } from "oak";
import { AppState } from "../../types/state.ts";

export const registerRouters = (payload: {
    app: Application<AppState>,
    routers: Router[]
  }): void => {
    const { app, routers } = payload;
    routers.forEach(router => {
      app.use(router.routes());
      app.use(router.allowedMethods())
    })
}