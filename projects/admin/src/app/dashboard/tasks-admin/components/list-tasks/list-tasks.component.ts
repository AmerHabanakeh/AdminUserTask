import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import { TasksService } from '../../services/tasks.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { SpinnerService } from 'projects/shared/spinner.service';
export interface PeriodicElement {
  title: string;
  user: string;
  deadLineDate: string;
  status: string;
}


@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent implements OnInit {
  displayedColumns: string[] = ['position', 'title', 'user', 'deadline', 'status', 'actions'];
  dataSource: any = [];
  tasksFilter!: FormGroup;
  page: any = 1;
  itemsPerPage: number = 2;
  itemsPerPageOptions: number[] = [2, 5, 10, 20];
  filteration: any = {
    page: this.page,
    limit: 10,
  };
  timeOutId: any
  total: any;


  users: any = [
    { name: 'Moahmed', id: '66c5da3511352840abf4da1c' },
    { name: 'Ali', id: '66c9fb8e9c70a902b7003a5b' },
    { name: 'Amer', id: '66cdac640be2304696239a09' },
  ];

  status: any = [
    { name: "Complete" },
    { name: "In-Progress" },
  ]
  constructor(public dialog: MatDialog, private taksService: TasksService, private toastr: ToastrService, public spinnerService: SpinnerService) { }

  ngOnInit(): void {
    this.getAllTasks();
  }

  getAllTasks() {
    this.filteration.limit = this.itemsPerPage;
    this.taksService.getAllTasks(this.filteration).subscribe((res: any) => {
      this.dataSource = this.mappingTasks(res.tasks);
      this.total = res.totalItems
    })
  }

  mappingTasks(data: any[]) {
    let newTasks = data.map(item => {
      return {
        ...item,
        user: item.userId.username
      }
    })
    return newTasks;
  }

  addTask() {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '750px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllTasks()
      }
    })
  }

  deleteTask(id: any) {
    this.taksService.deleteTask(id).subscribe((res) => {
      this.toastr.success("Task Delete Successfully");
      this.getAllTasks()
    })
  }

  updateTask(element: any) {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '750px',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllTasks()
      }
    })
  }

  search(event: any) {
    this.filteration['keyword'] = event.value;
    this.page = 1;
    clearTimeout(this.timeOutId)
    this.timeOutId = setTimeout(() => {
      this.getAllTasks();
    }, 1000);
  }

  selectUser(event: any) {
    this.page = 1;
    this.filteration["page"] = 1;
    this.filteration['userId'] = event.target.value
    this.getAllTasks();
  }

  selectStatus(event: any) {
    this.page = 1;
    this.filteration["page"] = 1;
    this.filteration['status'] = event.target.value;
    this.getAllTasks();
  }

  selectDate(event: any, type: any) {
    this.filteration[type] = moment(event.value).format('DD-MM-YYYY');
    this.page = 1;
    this.filteration["page"] = 1;
    if (type == "toDate" && this.filteration['toDate'] !== 'Invalid Date') {
      console.log('yeesss')
      this.getAllTasks();
    }
  }

  changePage(event: any) {
    this.page = event;
    this.filteration["page"] = event;
    this.getAllTasks();
  }

  onItemsPerPageChange() {
    this.page = 1;
    this.filteration["page"] = 1;
    this.getAllTasks();
  }
}
