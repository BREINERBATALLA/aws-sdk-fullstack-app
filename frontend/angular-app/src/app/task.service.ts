import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {


  constructor(private http : HttpClient) { }

  getAll() {
    return this.http.get(`https://cgsj2610cb.execute-api.us-east-1.amazonaws.com/prod/tasks`)
  }
  
  create(task: any){
    return this.http.post(`https://cgsj2610cb.execute-api.us-east-1.amazonaws.com/prod/tasks`,task)
  }

  update(id: String, task:any){
    return this.http.put(`https://cgsj2610cb.execute-api.us-east-1.amazonaws.com/prod/tasks/`+id, task)
  }

  delete(id: String) {
    return this.http.delete(`https://cgsj2610cb.execute-api.us-east-1.amazonaws.com/prod/tasks/` + id)
  }
}
