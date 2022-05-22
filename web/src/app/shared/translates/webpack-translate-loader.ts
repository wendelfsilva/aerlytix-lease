import {TranslateLoader} from '@ngx-translate/core';
import {from, Observable} from "rxjs";

export class WebpackTranslateLoader implements TranslateLoader {
    getTranslation(lang: string): Observable<any> {
        return from(import(`src/assets/i18n/${lang}.json`));
    }
}
