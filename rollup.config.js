import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';

export default [
  {
    input: 'src/index.tsx',
    output: {
      file: 'lib/index.common.js',
      format: 'cjs'
    },
    plugins: [
      postcss({ extensions: ['.css'] }),
      typescript(),
      resolve(),
      commonjs()
    ],
    external: ['react', 'react-dom', 'rxjs']
  },
  {
    input: 'src/index.tsx',
    output: {
      file: 'lib/index.esm.js',
      format: 'esm'
    },
    plugins: [
      postcss({ extensions: ['.css'] }),
      typescript(),
      resolve(),
      commonjs()
    ],
    external: ['react', 'react-dom', 'rxjs']
  }
];
