import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/user/src/environments/environment';
import { BehaviorSubject } from 'rxjs';
export interface changeStatus {
  id: string,
  status: string
}
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  userData = new BehaviorSubject({})

  getAllUser(filter: any) {
    let params = new HttpParams;
    if (filter) {
      Object.entries(filter).forEach(([key, value]: any) => {
        if (value) {
          params = params.append(key, value);
        }
      })
    }
    return this.http.get(environment.baseApi.replace('tasks', 'auth') + '/users', { params })
  }

  deleteUser(id: string) {
    return this.http.delete(environment.baseApi.replace('tasks', 'auth') + '/user/' + id);
  }

  changeStatus(model: changeStatus) {
    return this.http.put(environment.baseApi.replace('tasks', 'auth') + '/user-status', model);
  }

  getUserData(model?: any) {
    this.getAllUser(model).subscribe((res: any) => {
      this.userData.next({
        total: res.totalItems,
        data: res.users
      })
    })
  }
}
