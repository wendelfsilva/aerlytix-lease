import { EventEmitter, Injectable } from '@angular/core';
import { TranslateService as NgxTranslateService } from "@ngx-translate/core";
import { LangChangeEvent } from "@ngx-translate/core/lib/translate.service";
import { CurrencyMaskConfig } from "ng2-currency-mask";
import { Observable } from "rxjs";


export const LANGUAGE = {
    EN_US: "en-US",
}
export const LANGUAGES = [LANGUAGE.EN_US];

@Injectable({
    providedIn: 'root',
})
export class TranslateService {

    constructor(
        private _translate: NgxTranslateService
        ) {
    }

    get onLangChange(): EventEmitter<LangChangeEvent> {
        return this._translate.onLangChange;
    }

    get currentLang(): string {
        return this._translate.currentLang || LANGUAGE.EN_US;
    }

    currentCultureLang(): string {
        return this._translate.getBrowserCultureLang() || LANGUAGE.EN_US;
    }

    _(key: string | Array<string>, interpolateParams?: Object): string | any {
        return this._translate.instant(key, interpolateParams);
    }

    use(lang: string): Observable<any> {
        let _lang = LANGUAGES.includes(lang) ? lang : LANGUAGE.EN_US;
        return this._translate.use(_lang);
    }

    getLangs(): Array<string> {
        return this._translate.getLangs();
    }

    addLangs(langs: Array<string>) {
        return this._translate.addLangs(langs);
    }

    setDefaultLang(lang: string): void {
        this._translate.setDefaultLang(lang);
    }

    getCurrencyConfig(): CurrencyMaskConfig {
        const config = {
            align: "right",
            allowNegative: true,
            prefix: "",
            suffix: "",
            thousands: "",
            decimal: ".",
            precision: 2,
        };
        if (this.currentLang === LANGUAGE.EN_US) {
            config["thousands"] = ","
            config["decimal"] = "."
        }
        return config;
    }
}
