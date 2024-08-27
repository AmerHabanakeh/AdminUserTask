import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIs } from '../../../base/APIs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) { }

  getAllTasks(filter: any) {
    let params = new HttpParams();
    Object.entries(filter).forEach(([key, value]: any) => {
      if (value) {
        params = params.append(key, value)
      }
    })
    return this.http.get(`${APIs.baseApi}/tasks/all-tasks`, { params })
  }

  createTask(model: any) {
    return this.http.post(`${APIs.baseApi}/tasks/add-task`, model);
  }

  updateTask(model: any, id: any) {
    return this.http.put(`${APIs.baseApi}/tasks/edit-task/${id}`, model);
  }

  deleteTask(id: any) {
    return this.http.delete(`${APIs.baseApi}/tasks/delete-task/${id}`);
  }
}