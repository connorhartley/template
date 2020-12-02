import h from '../h';

const Home = (state, act) => <div>Hello World!</div>;

export default {
  view: Home,
  init: () => {
    console.log("Home");
  }
};
