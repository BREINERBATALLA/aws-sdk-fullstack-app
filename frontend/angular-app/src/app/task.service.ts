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
        'Access-Control-Allow-Origin': '*' // reemplaza "*" con tu origen permitido si no deseas permitir todas las solicitudes
      })
    };
    return this.http.get(`https://ojlkd0ma56.execute-api.us-east-1.amazonaws.com/prod/tasks`,httpOptions)
  }
  
  create(task: any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*' 
      })
    };
    return this.http.post(`https://ojlkd0ma56.execute-api.us-east-1.amazonaws.com/prod/tasks`,httpOptions, task)
  }

  update(id: String, task:any){
    return this.http.put(`https://ojlkd0ma56.execute-api.us-east-1.amazonaws.com/prod/tasks/`+id, task)
  }

  delete(id: String) {
    return this.http.delete(`https://ojlkd0ma56.execute-api.us-east-1.amazonaws.com/prod/tasks/` + id)
  }
}
