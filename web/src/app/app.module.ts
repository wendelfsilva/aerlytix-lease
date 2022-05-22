import { registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import localeEn from "@angular/common/locales/en";
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AuthInterceptor } from '@shared/interceptors/auth.interceptor';
import { LANGUAGE, LANGUAGES, TranslateService } from '@shared/services/translate.service';
import { WebpackTranslateLoader } from '@shared/translates/webpack-translate-loader';
import { CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';
import { NgProgressModule } from 'ngx-progressbar';
import { ToastrModule } from 'ngx-toastr';
import { AerlytixModule } from './aerlytix/aerlytix.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


registerLocaleData(localeEn, "en-US");

const TRANSLATE_CONFIG = {
  loader: { provide: TranslateLoader, useClass: WebpackTranslateLoader }
};

const PROGRESS_CONFIG = {
  color: "gray"
};

export const CUSTOM_DATE_ADAPTER = [
  { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FlexLayoutModule,
    HttpClientModule,
    CurrencyMaskModule,
    NgProgressModule,
    NgProgressModule.withConfig(PROGRESS_CONFIG),
    TranslateModule.forRoot(TRANSLATE_CONFIG),
    ToastrModule.forRoot(),
    AerlytixModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: CURRENCY_MASK_CONFIG, deps: [TranslateService], useFactory: (translate: TranslateService) => translate.getCurrencyConfig() },
    { provide: LOCALE_ID, deps: [TranslateService], useFactory: (translate: TranslateService) => translate.currentLang },
    { provide: MAT_DATE_LOCALE, deps: [TranslateService], useFactory: (translate: TranslateService) => translate.currentLang },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {

  constructor(private _adapter: DateAdapter<any>,
    private _translate: TranslateService) {

    this._adapter.setLocale(LANGUAGE.EN_US);

    this._translate.addLangs(LANGUAGES);
    this._translate.setDefaultLang(LANGUAGE.EN_US);
    this._translate.use(LANGUAGE.EN_US);
  }
}