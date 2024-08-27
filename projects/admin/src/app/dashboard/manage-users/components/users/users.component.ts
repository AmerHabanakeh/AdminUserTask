import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'projects/shared/spinner.service';
import { UsersService } from '../../services/users.service';
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
  constructor(public spinnerService: SpinnerService, private userService: UsersService, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.getUserData();
  }



  getUserData() {
    const model = {
      page: this.page,
      limit: this.itemsPerPage,
      name: '',
    }
    this.userService.getAllUser(model).subscribe((res: any) => {
      this.totalItems = res.totalItems;
      this.dataSource = res.users
    })
  }

  deleteUser(id: any) {
    this.userService.deleteUser(id).subscribe((res) => {
      this.toastr.success("User Deleted Successfully");
      this.getUserData();
    })
  }

  changePage(event: any) {
    console.log(event);
    this.page = event;
    this.getUserData();
  }

  onItemsPerPageChange() {
    this.page = 1;
    this.getUserData();
  }

  search(event: any) {
    // this.model['name'] = event.value;
    this.page = 1;
    clearTimeout(this.timeOutId)
    this.timeOutId = setTimeout(() => {
      this.getUserData();
    }, 1000);
  }

}
