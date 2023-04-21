import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private urlApiGateway: string = environment.apiUrl

  constructor(private http : HttpClient) { }

  getAll() {
    return this.http.get(`https://${this.urlApiGateway}/tasks`)
  }
  
  create(task: any){

    return this.http.post(`https://${this.urlApiGateway}/tasks`, task)
  }

  update(id: String, task:any){

    return this.http.put(`https://${this.urlApiGateway}/tasks/`+id, task)
  }

  delete(id: String) {
    return this.http.delete(`https://${this.urlApiGateway}/tasks/`+id)
  }
}
