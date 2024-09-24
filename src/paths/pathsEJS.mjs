import { join }      from 'path'       ;
import { viewsPath } from './utils.mjs';

const publicViewsPath  = join(viewsPath, '/public') ;
const privateViewsPath = join(viewsPath, '/private');


// PUBLIC EJS
export const indexEJS      = join(publicViewsPath, '/index.ejs')     ;
export const loginEJS      = join(publicViewsPath, '/login.ejs')     ;
export const registerEJS   = join(publicViewsPath, '/register.ejs')  ;
export const remembermeEJS = join(publicViewsPath, '/rememberme.ejs');
// PUBLIC EJS - CATALOGS
export const chickenCatalogEJS = join(publicViewsPath, '/chicken_catalog.ejs');
export const fishCatalogEJS    = join(publicViewsPath, '/fish_catalog.ejs')   ;
// PUBLIC EJS - MANAGER
export const loginManagerEJS = join(publicViewsPath, '/login_manager.ejs');


// PRIVATE EJS
export const dashboardEJS = join(privateViewsPath, '/dashboard.ejs');
export const profileEJS   = join(privateViewsPath, '/profile.ejs')  ;
export const settingsEJS  = join(privateViewsPath, '/settings.ejs') ;


// HANDLING ERRORS
export const notFoundEJS = join(publicViewsPath, '/not_found.ejs');
