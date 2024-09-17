import { join }      from 'path'       ;
import { viewsPath } from './utils.mjs';

const publicViewsPath  = join(viewsPath, '/public') ;
const privateViewsPath = join(viewsPath, '/private');

// PUBLIC EJS
export const indexEJS    = join(publicViewsPath, '/index.ejs')   ; // INDEX.EJS    - PATH
export const loginEJS    = join(publicViewsPath, '/login.ejs')   ; // LOGIN.EJS    - PATH
export const registerEJS = join(publicViewsPath, '/register.ejs'); // REGISTER.EJS - PATH
// PUBLIC EJS - CATALOGS
export const chickenCatalogEJS = join(publicViewsPath, '/chicken_catalog.ejs');
export const fishCatalogEJS    = join(publicViewsPath, '/fish_catalog.ejs')   ;
// PUBLIC EJS - MANAGER
export const loginManagerEJS = join(publicViewsPath, '/loginManager.ejs'); // LOGINMANAGER.EJS - PATH

// PRIVATE EJS
export const dashboardEJS = join(privateViewsPath, '/dashboard.ejs'); // DASHBOARD.EJS - PATH
export const profileEJS   = join(privateViewsPath, '/profile.ejs')  ; // PROFILE.EJS   - PATH
export const settingsEJS  = join(privateViewsPath, '/settings.ejs') ; // SETTINGS.EJS  - PATH
