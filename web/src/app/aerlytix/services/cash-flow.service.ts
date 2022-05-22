import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginatedResult } from "@shared/models/paginated-result";
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";
import { URLS } from 'src/app/app-server.urls';
import { environment } from '../../../environments/environment';
import { CashFlow } from '../models/cash-flow';

@Injectable()
export class CashFlowService {

    private _URL = `${environment.apiUrl}${URLS.CASH_FLOW}`;
    private _PARAMETERS = new HttpParams();

    constructor(private http: HttpClient) {
    }

    addParams(key: string, value: any): void {
        if (this._PARAMETERS.has(key)) {
            this._PARAMETERS = this._PARAMETERS.set(key, value);
        } else {
            this._PARAMETERS = this._PARAMETERS.append(key, value);
        }
    }

    clearParams(): void {
        this._PARAMETERS = new HttpParams();
    }

    retrieve(pk: number): Observable<CashFlow> {
        return this.http.get<CashFlow>(`${this._URL}${pk}/`, this._options());
    }

    all(): Observable<CashFlow[]> {
        return this.http.get<CashFlow[]>(this._URL, this._options());
    }

    paginated(): Observable<PaginatedResult<CashFlow>> {
        return this.http.get<PaginatedResult<CashFlow>>(this._URL, this._options())
            .pipe(
                tap(response => response as PaginatedResult<CashFlow>),
            );
    }

    create(Cashflow: CashFlow): Observable<CashFlow> {
        return this.http.post<CashFlow>(this._URL, Cashflow, this._options());
    }

    update(pk: number, Cashflow: CashFlow): Observable<CashFlow> {
        return this.http.put<CashFlow>(`${this._URL}${pk}/`, Cashflow, this._options());
    }

    delete(pk: number): Observable<CashFlow> {
        return this.http.delete<CashFlow>(`${this._URL}${pk}/`, this._options());
    }

    private _options(): {} {
        const options: any = {};

        if (this._PARAMETERS) {
            options['params'] = this._PARAMETERS;
        }
        return options;
    }
}
