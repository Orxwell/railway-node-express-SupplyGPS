import { fileURLToPath }      from 'url' ;
import { dirname, normalize } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename)           ;

export const srcPath   = normalize(`${__dirname}/../`)        ;
export const viewsPath = normalize(`${__dirname}/../../views`);
