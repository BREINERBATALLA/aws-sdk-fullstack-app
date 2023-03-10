import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  uri = environment.uri

  constructor(private http : HttpClient) { }

  getAll() {
    return this.http.get(`http://cgsj2610cb.execute-api.us-east-1.amazonaws.com/prod/tasks`)
  }
  
  create(task: any){
    return this.http.post(`http://cgsj2610cb.execute-api.us-east-1.amazonaws.com/prod/tasks`,task)
  }

  update(id: String, task:any){
    return this.http.put(`http://cgsj2610cb.execute-api.us-east-1.amazonaws.com/prod/tasks/`+id, task)
  }

  delete(id: String) {
    return this.http.delete(`http://cgsj2610cb.execute-api.us-east-1.amazonaws.com/prod/tasks/` + id)
  }
}
