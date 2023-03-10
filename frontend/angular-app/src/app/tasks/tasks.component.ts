import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: any[] = []
  form: FormGroup = this.fb.group({
    description: []
  })
  taskUpdating: any;
  constructor(private taskService: TaskService,
              private fb: FormBuilder
  
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll () {
    this.taskService.getAll()
    .subscribe((task: any) => {
      this.tasks = task.tasks;
      console.log(this.tasks)
    })
  }

  save(): void {
    const values = this.form.value;


    if (this.taskUpdating) {
      this.taskService.update(this.taskUpdating.taskId, values)
      .subscribe(()=>{
        this.getAll();
        this.form.setValue({
          description: ''
        })
      })
      this.taskUpdating = false;
    } else{
      this.taskService.create(values).
      subscribe(()=>{
        this.getAll();
        this.form.setValue({
          description: ''
        })
      })
      Swal.fire(
      'Good job!',
      'Task '+ values.description +' has been created',
      'success'
      )
    }


  }

  delete(id: String) {
    this.taskService.delete(id)
    .subscribe(()=>{
      this.getAll();
    })
  }

  update(task: any, id: String) {
    this.taskUpdating = task;
    this.form.setValue({
      description: task.description
    })

  }

}
