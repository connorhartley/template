import { h, text } from "superfine";

const EMPTY_OBJECT = {};

export default (type, props, ...children) =>
  typeof type === "function"
    ? type(props, children)
    : h(
        type,
        props || EMPTY_OBJECT,
        []
          .concat(...children)
          .map((any) =>
            typeof any === "string" || typeof any === "number" ? text(any) : any
          )
      );
