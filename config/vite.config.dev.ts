import baseConfig from './vite.config.base';
import { mergeConfig } from 'vite';

export default mergeConfig(
  {
    mode: 'development',
    server: {
      //   open: true,
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:8080/',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      },
      fs: {
        strict: true
      }
    },
    plugins: [
      // configArcoResolverPlugin()
      // eslint({
      //   cache: false,
      //   include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue'],
      //   exclude: ['node_modules']
      // })
    ]
  },
  baseConfig
);
