import { app } from 'hyperapp';
import state from './state';
import view from './view';

// async function main() {
  const main = app({
    node: document.getElementById("main"),
    init: state,
    view: view
  });
// }

// main();
