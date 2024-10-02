import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/service/crud.service';
import { Task } from 'src/app/model/task';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  taskObj : Task = new Task();
  taskarr : Task[] = [];

  addTaskValue : string = '';
  editTaskValue : string = '';

  constructor(private crudService : CrudService) { }

  ngOnInit(): void {
    this.editTaskValue = '';
    this.addTaskValue = '';
    this.taskObj = new Task();
    this.taskarr = [];
    this.getAllTasks();
  }
  getAllTasks() {
    this.crudService.getAllTask().subscribe(res=>{
      this.taskarr = res;
    },err =>{
     alert("Unable to get the list of Tasks")
    })
  }

  addTask(){
    this.taskObj.task_name = this.addTaskValue;
    this.crudService.addTask(this.taskObj).subscribe(resp=>{
      this.ngOnInit();
      this.addTaskValue = '';
    },err => {
      alert(err)
    })
  }

  editTask(){
    this.taskObj.task_name = this.editTaskValue;
    this.crudService.editaddTask(this.taskObj).subscribe(result=>{
      this.ngOnInit();
    })
  }

deleteTask(etask : Task){
  this.crudService.deleteTask(etask).subscribe(res=>{
    this.ngOnInit();
  }, err=>{
    alert("Failed to delete the task");
  })
}
call(etask : Task){
this.taskObj = etask;
this.editTaskValue = etask.task_name;
}
}
