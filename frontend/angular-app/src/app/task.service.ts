import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  apigId = environment.apiGatewayId
  region = environment.region //saco toda esa info en un output.
  stage  = environment.stageName
  uri = environment.uri

  constructor(private http : HttpClient) { }

  getAll() {
    return this.http.get(`https://${this.uri}/tasks`)
  }
  
  create(task: any){
    return this.http.post(`https://${this.apigId}.execute-api.us-east-1.amazonaws.com/prod/tasks/create`,task)
  }

  update(id: String, task:any){
    return this.http.put(`https://4vmkw2boq7.execute-api.us-east-1.amazonaws.com/prod/tasks/`+id, task)
  }

  delete(id: String) {
    return this.http.delete(`https://${this.apigId}.execute-api.us-east-1.amazonaws.com/prod/tasks/delete/` + id)
  }
}
