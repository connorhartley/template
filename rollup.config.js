import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';
import { terser } from 'rollup-plugin-terser';

// Development Flag
const dev = process.env.DEVELOPMENT === '1'

const plugins = [
  babel({
    babelrc: false,
    // presets: [['@babel/preset-env', { modules: false }]],
    // presets: ['es2015-rollup'],
    plugins: [['@babel/transform-react-jsx', { pragma: 'h' }]]
  }),
  resolve({
    jsnext: true
  }),
  dev && serve({
    contentBase: './dist/',
    port: 8080,
    open: true
  }),
  dev && livereload(),
  !dev && terser()
];

let config = {
  input: './src/app.js',
  output: {
    name: 'app',
    file: './dist/app.js',
    format: 'umd',
    sourcemap: dev
  },
  plugins: plugins
};

export default config;
