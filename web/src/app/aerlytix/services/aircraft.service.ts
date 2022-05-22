import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginatedResult } from "@shared/models/paginated-result";
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";
import { URLS } from 'src/app/app-server.urls';
import { environment } from '../../../environments/environment';
import { Aircraft } from '../models/aircraft';

@Injectable()
export class AircraftService {

    private _URL = `${environment.apiUrl}${URLS.AIRCRAFT}`;
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

    retrieve(pk: number): Observable<Aircraft> {
        return this.http.get<Aircraft>(`${this._URL}${pk}/`, this._options());
    }

    all(): Observable<Aircraft[]> {
        return this.http.get<Aircraft[]>(this._URL, this._options());
    }

    paginated(): Observable<PaginatedResult<Aircraft>> {
        return this.http.get<PaginatedResult<Aircraft>>(this._URL, this._options())
            .pipe(
                tap(response => response as PaginatedResult<Aircraft>),
            );
    }

    create(Aircraft: Aircraft): Observable<Aircraft> {
        return this.http.post<Aircraft>(this._URL, Aircraft, this._options());
    }

    update(pk: number, Aircraft: Aircraft): Observable<Aircraft> {
        return this.http.put<Aircraft>(`${this._URL}${pk}/`, Aircraft, this._options());
    }

    delete(pk: number): Observable<Aircraft> {
        return this.http.delete<Aircraft>(`${this._URL}${pk}/`, this._options());
    }

    private _options(): {} {
        const options: any = {};

        if (this._PARAMETERS) {
            options['params'] = this._PARAMETERS;
        }
        return options;
    }
}
