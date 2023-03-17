import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {


  constructor(private http : HttpClient) { }

  getAll() {
    const httpOptions = {
      headers: new HttpHeaders({
        'access-control-allow-origin': '*' // reemplaza "*" con tu origen permitido si no deseas permitir todas las solicitudes
      })
    };
    return this.http.get(`https://k0al33e307.execute-api.us-east-1.amazonaws.com/prod/tasks`,httpOptions)
  }
  
  create(task: any){
    const httpOptions = {
      headers: new HttpHeaders({
        'access-control-allow-origin': '*' // reemplaza "*" con tu origen permitido si no deseas permitir todas las solicitudes
      })
    };
    return this.http.post(`https://k0al33e307.execute-api.us-east-1.amazonaws.com/prod/tasks`, task, httpOptions)
  }

  update(id: String, task:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'access-control-allow-origin': '*' // reemplaza "*" con tu origen permitido si no deseas permitir todas las solicitudes
      })
    };
    return this.http.put(`https://k0al33e307.execute-api.us-east-1.amazonaws.com/prod/tasks/`+id, task, httpOptions)
  }

  delete(id: String) {
    const httpOptions = {
      headers: new HttpHeaders({
        'access-control-allow-origin': '*' // reemplaza "*" con tu origen permitido si no deseas permitir todas las solicitudes
      })
    };
    return this.http.delete(`https://k0al33e307.execute-api.us-east-1.amazonaws.com/prod/tasks/` + id,httpOptions)
  }
}
