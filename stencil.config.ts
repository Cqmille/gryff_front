import { Config } from '@stencil/core';

// https://stenciljs.com/docs/config

export const config: Config = {
  globalStyle: 'src/global/app.css',
  globalScript: 'src/global/app.ts',
  taskQueue: 'async',
  outputTargets: [
    {
      type: 'www',
      // comment the following line to disable service workers in production
      serviceWorker: null,
      baseUrl: 'https://myapp.local/',
      copy: [
        { 
          src: '../node_modules/@teamhive/pdf-viewer/dist/pdf-viewer/pdf-viewer-assets',
          dest: 'build/pdf-viewer-assets' 
        },
        { src: 'service-worker.js' },
        {
          src: '../src/global/bootstrap',
          dest: 'bootstrap-files'
        },
        {
          src: '../src/global/logo',
          dest: 'svg'
        }
      ],
    },
  ],
};
