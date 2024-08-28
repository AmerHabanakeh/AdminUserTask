import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'projects/shared/spinner.service';
import { changeStatus, UsersService } from '../../services/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'email', 'tasksAssigned', 'actions'];
  dataSource: any = [];
  page: any = 1;
  itemsPerPage: number = 1;
  itemsPerPageOptions: number[] = [1, 2, 5, 10];
  totalItems: any;
  timeOutId: any
  constructor(public spinnerService: SpinnerService, private userService: UsersService, private toastr: ToastrService) {
    this.getUserFromSubject();
  }
  ngOnInit(): void {
    this.getUser();
  }


  getUser(name: string = '') {
    const model = {
      page: this.page,
      limit: this.itemsPerPage,
      name: name,
    }
    this.userService.getUserData(model);
  }

  getUserFromSubject() {
    this.userService.userData.subscribe((res: any) => {
      this.dataSource = res.data;
      this.totalItems = res.total;
    })
  }


  deleteUser(id: any, index: number) {
    if (this.dataSource[index].assignedTasks > 0) {
      this.toastr.error("You Can't Delete This User Until Finish Tasks")
    }
    else {
      this.userService.deleteUser(id).subscribe((res) => {
        this.toastr.success("User Deleted Successfully");
        this.page = 1;
        this.getUser();
      })
    }
  }

  changePage(event: any) {
    console.log(event);
    this.page = event;
    this.getUser();
  }

  onItemsPerPageChange() {
    this.page = 1;
    this.getUser();
  }

  search(event: any) {

    this.page = 1;
    clearTimeout(this.timeOutId)
    this.timeOutId = setTimeout(() => {
      this.getUser(event.target.value);
    }, 1000);
  }

  changeUserStatus(status: string, id: string, index: number) {
    const Model: changeStatus = {
      id: id,
      status: status
    }
    if (this.dataSource[index].assignedTasks > 0) {
      this.toastr.error("You Can't Update User Status Until Finish Tasks")
    }
    else {
      this.userService.changeStatus(Model).subscribe((res) => {
        this.toastr.success("User Status Updated Successfully");
        this.page = 1;
        this.getUser();
      })
    }
  }

}
