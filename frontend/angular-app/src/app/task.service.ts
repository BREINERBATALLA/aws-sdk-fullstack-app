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
    return this.http.get(`https://${this.uri}/tasks`)
  }
  
  create(task: any){
    return this.http.post(`https://${this.uri}/tasks`,task)
  }

  update(id: String, task:any){
    return this.http.put(`https://${this.uri}/tasks/`+id, task)
  }

  delete(id: String) {
    return this.http.delete(`https://${this.uri}/tasks/` + id)
  }
}
