import { join }      from 'path'       ;
import { viewsPath } from './utils.mjs';

export const cssPath = join(viewsPath, '/static/css');

// PUBLIC CSS
export const indexCSS    = join(cssPath, '/index.css')   ; // INDEX.CSS    - PATH
export const loginCSS    = join(cssPath, '/login.css')   ; // LOGIN.CSS    - PATH
export const registerCSS = join(cssPath, '/register.css'); // REGISTER.CSS - PATH

export const loginManagerCSS = join(cssPath, '/loginManager.css'); // LOGINMANAGER.CSS - PATH

// PRIVATE CSS
export const dashboardCSS = join(cssPath, '/dashboard.css'); // DASHBOARD.CSS - PATH
export const profileCSS   = join(cssPath, '/profile.css')  ; // PROFILE.CSS   - PATH
export const settingsCSS  = join(cssPath, '/settings.css') ; // SETTINGS.CSS  - PATH
