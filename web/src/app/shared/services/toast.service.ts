import { Injectable } from '@angular/core';
import { TranslateService } from "@shared/services/translate.service";
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ToastService {

    constructor(private _toast: ToastrService,
        private _translate: TranslateService) {
    }

    success(message: string, title?: string): void {
        if (title) {
            this._toast.success(this._translation(message), this._translation(title));
        } else {
            this._toast.success(this._translation(message));
        }
    }

    error(message: string, title?: string): void {
        if (title) {
            this._toast.error(this._translation(message), this._translation(title));
        } else {
            this._toast.error(this._translation(message));
        }
    }

    info(message: string, title?: string): void {
        if (title) {
            this._toast.info(this._translation(message), this._translation(title));
        } else {
            this._toast.info(this._translation(message));
        }
    }

    warn(message: string, title?: string): void {
        if (title) {
            this._toast.warning(this._translation(message), this._translation(title));
        } else {
            this._toast.warning(this._translation(message));
        }
    }

    private _translation(key: string): string {
        return this._translate._(key);
    }
}
