import '../polyfills';

import { platformBrowser } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';

// this file will be created dynamically by angular compiler
import { AppModuleNgFactory } from './app.module.ngfactory';

enableProdMode();

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
