import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginatedResult } from "@shared/models/paginated-result";
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";
import { URLS } from 'src/app/app-server.urls';
import { environment } from '../../../environments/environment';
import { Lease } from '../models/lease';

@Injectable()
export class LeaseService {

    private _URL = `${environment.apiUrl}${URLS.LEASE}`;
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

    retrieve(pk: number): Observable<Lease> {
        return this.http.get<Lease>(`${this._URL}${pk}/`, this._options());
    }

    all(): Observable<Lease[]> {
        return this.http.get<Lease[]>(this._URL, this._options());
    }

    paginated(): Observable<PaginatedResult<Lease>> {
        return this.http.get<PaginatedResult<Lease>>(this._URL, this._options())
            .pipe(
                tap(response => response as PaginatedResult<Lease>),
            );
    }

    create(Lease: Lease): Observable<Lease> {
        return this.http.post<Lease>(this._URL, Lease, this._options());
    }

    update(pk: number, Lease: Lease): Observable<Lease> {
        return this.http.put<Lease>(`${this._URL}${pk}/`, Lease, this._options());
    }

    delete(pk: number): Observable<Lease> {
        return this.http.delete<Lease>(`${this._URL}${pk}/`, this._options());
    }

    private _options(): {} {
        const options: any = {};

        if (this._PARAMETERS) {
            options['params'] = this._PARAMETERS;
        }
        return options;
    }
}
