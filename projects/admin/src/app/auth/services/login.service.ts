import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIs } from '../../base/APIs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  loginCall(model: any) {
    return this.http.post(`${APIs.baseApi}/auth/login `, model)
  }
}
