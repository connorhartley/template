import { app, action } from './router';
import state from './state';
import routes from './routes';

const listen = window.addEventListener;

const main = app(document.getElementById("main"), state, routes);

const handleRoute = () => {
  main.act(action.routerInit);
  main.get(state => {
    const route = routes[state.router.to];
    const routeTarget = route && route.view ? route : routes["_default"];

    routeTarget.init();
  });
};

listen("DOMContentLoaded", () => {
  handleRoute();

  listen("popstate", handleRoute);
  listen("pushstate", handleRoute);
});



