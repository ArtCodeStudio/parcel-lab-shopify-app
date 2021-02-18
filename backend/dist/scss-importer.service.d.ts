import { AsyncImporter, SyncImporter, Importer } from 'node-sass';
export interface UrlParts {
    relativeModuleUrl: string;
    scssFileName: string;
    moduleName: null | string;
    parts: string[];
}
declare const importer: AsyncImporter | SyncImporter | Importer[];
export default importer;
