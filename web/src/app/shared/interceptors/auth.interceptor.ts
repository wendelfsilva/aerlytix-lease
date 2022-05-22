import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from "@shared/services/translate.service";
import { ToastrService } from "ngx-toastr";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    _refreshing = false;

    constructor(private _toast: ToastrService,
        private _translate: TranslateService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        req = this._addHeader(req);
        return next.handle(req).pipe(catchError(err => {
            if (err.status === 0) {
                return this._handle0Error(req, next);
            } else if (err.status === 403) {
                return this._handle403Error(req, next);
            }

            return this._handleError(err);
        }));
    }

    _addHeader(req: HttpRequest<any>) {
        return req.clone({
            setHeaders: {
                "Accept-Language": `${this._translate.currentLang}`
            }
        });
    }

    _handle0Error(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.method !== 'OPTIONS') {
            this._toast.error(this._translate._("errors.unknown_error"));
        }

        return next.handle(this._addHeader(req));
    }

    _handle403Error(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this._refreshing) {
            this._refreshing = true;
        }

        return next.handle(this._addHeader(req));
    }

    _handleError(err: HttpErrorResponse): Observable<HttpEvent<any>> {
        const title = this._translate._(`errors.http_error_${err.status}`);
        const error = err.error;
        if (this._isJson(error)) {
            try {
                if (error.detail) {
                    this._toast.error(error.detail, title);
                } else if (error.non_field_errors) {
                    this._toast.error(error.non_field_errors, title);
                } else {
                    Object.keys(error).forEach(field => {
                        const _field = this._translate._(field);
                        this._toast.error(`[${_field}]: ${error[field]}`);
                    });
                }
            } catch (e) {
                this._toast.error(JSON.stringify(error), title);
            }
        }

        return throwError(err);
    }

    _isJson(item: any) {
        item = typeof item !== "string" ? JSON.stringify(item) : item;
        try {
            item = JSON.parse(item);
        } catch (e) {
            return false;
        }
        return typeof item === "object" && item !== null;
    }
}
