import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TasksService } from '../../services/tasks.service';
import { SpinnerService } from 'projects/shared/spinner.service';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent implements OnInit {
  displayedColumns: string[] = ['position', 'title', 'user', 'deadLineDate', 'status', 'actions'];
  dataSource: any = [];
  tasksFilter!: FormGroup
  users: any = [
    { name: "Moahmed", id: 1 },
    { name: "Ali", id: 2 },
    { name: "Ahmed", id: 3 },
    { name: "Zain", id: 4 },
  ]

  status: any = [
    { name: "Complete", id: 1 },
    { name: "In-Prossing", id: 2 },
  ]
  constructor(public dialog: MatDialog, private fb: FormBuilder, private service: TasksService, private toaster: ToastrService , public spinnerService: SpinnerService) { }
  page: any = 1;
  itemsPerPage: number = 1;
  itemsPerPageOptions: number[] = [1, 2, 5, 10];
  userData: any
  selectedStatus: string = "In-Progress"
  totalItems: any = 0
  ngOnInit(): void {
    this.createform()
    this.getUserData()
    this.getAllTasks()
  }

  createform() {
    this.tasksFilter = this.fb.group({
      title: [''],
      userId: [''],
      fromDate: [''],
      toDate: ['']
    })
  }

  getUserData() {
    let token = JSON.stringify(localStorage.getItem('token'));
    this.userData = JSON.parse(window.atob(token.split('.')[1]))
  }
  getAllTasks() {
    let params = {
      page: this.page,
      limit: this.itemsPerPage,
      status: this.selectedStatus
    }
    this.service.getUserTasks(this.userData.userId, params).subscribe((res: any) => {
      console.log(res);
      this.dataSource = res.tasks
      this.totalItems = res.totalItems
    }, error => {
      this.dataSource = []
    })
  }

  changePage(event: any) {
    console.log(event);
    this.page = event;
    this.getAllTasks()
  }
  complete(ele: any) {
    const MODEL = {
      id: ele._id
    }
    this.service.completeTask(MODEL).subscribe(res => {
      this.getAllTasks()
      this.toaster.success("Task Compelte Successfully", "Success")
    })
  }

  onItemsPerPageChange() {
    this.page = 1;
    this.getAllTasks();
  }
}
