import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from './environments/environment';
import { AppModule } from '@app/app.module';
import { hmrBootstrap } from './hmr';

if (environment.production) {
  enableProdMode();
}

const bootstrap = () => {
  console.log('🚀 Bootstrapping ...');
  return platformBrowserDynamic().bootstrapModule(AppModule);
};

/* "Hot Module Replacement" is enabled as described on
 * https://medium.com/@beeman/tutorial-enable-hrm-in-angular-cli-apps-1b0d13b80130#.sa87zkloh
 */

if (environment.hmr) {
  console.log('✅ Client-side HMR Enabled!');
  /* eslint-disable @typescript-eslint/dot-notation */
  if (module['hot']) {
    console.log('🔥▶ HRM Bootstrap!');
    hmrBootstrap(module, bootstrap); // HMR enabled bootstrap
  } else {
    console.error('HMR is not enabled for webpack-dev-server!');
    console.log('Are you using the --hmr flag for ng serve?');
  }
} else {
  console.log('▶ Regular Bootstrap!');
  bootstrap();
}
