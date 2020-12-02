import { patch } from 'superfine';

const state = {
  to: "/"
}

const action = {
  routerInit: state => {
    const { path } = window.location;
    const router = state.router;

    router.to = path;

    return { router };
  },
  routerLink: state => data => {
    if (data.to === window.history.state) {
      window.history.back();
      return;
    }

    const to = typeof data.to === "string"
      ? data.to
      : state.router.to;

    window.history.pushState(state.router.to, null, to);
    window.dispatchEvent(new CustomEvent("pushstate"));
  }
}

const app = (node, init, routes) => {
  let lock = false;

  const act = (action, data) => {
    let result = action(init, act);
    result = typeof result === "function" ? result(data) : result;

    if (result && typeof result === "object") {
      Object.assign(init, result);

      if (!lock) {
        lock = true;

        window.requestAnimationFrame(() => {
          const route = routes[init.router.to];
          const routeTarget = route && route.view
            ? route
            : routes["_default"];

          lock = false;

          return patch(node, routeTarget.view(init, act));
        });
      }
    }
  };

  const get = action => action(init);

  return {
    act,
    get
  };
};

export { state, action, app };

