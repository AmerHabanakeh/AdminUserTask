import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SpinnerService {

    private SpinnerState:any = 0;
    get apiCount(){
        return this.SpinnerState
    }
    addApi(){
        this.SpinnerState+=1;
    }
    removeApi(){
        if(!!this.SpinnerState)
            this.SpinnerState-=1;
    }
    constructor(private http: HttpClient) { }
}