import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TasksService } from '../../services/tasks.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { SpinnerService } from 'projects/shared/spinner.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public dialog: MatDialogRef<AddTaskComponent>,
    public matDialog: MatDialog,
    private taksService: TasksService,
    private toastr: ToastrService,
    public spinnerService: SpinnerService,
  ) { }


  users: any = [
    { name: 'Moahmed', id: '66c5da3511352840abf4da1c' },
    { name: 'Ali', id: '66c9fb8e9c70a902b7003a5b' },
    { name: 'Test', id: '66cdac640be2304696239a09' },
  ];
  newTaskForm!: FormGroup;
  fileName = '';
  formValue: any;
  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.newTaskForm = this.fb.group({
      title: [this.data?.title || '', [Validators.required, Validators.minLength(5)]],
      userId: [this.data?.userId._id || '', Validators.required],
      image: [this.data?.image || '', Validators.required],
      description: [this.data?.description || '', Validators.required],
      deadline: [this.data ? `${this.data.deadline.split('-')[2]}-${this.data.deadline.split('-')[1]}-${this.data.deadline.split('-')[0]}` : '', Validators.required],
    });
    this.formValue = this.newTaskForm.value;
  }
  createTask() {
    let model = this.prepareFormData();
    this.taksService.createTask(model).subscribe((res) => {
      this.toastr.success("Task Created Successfully")
      this.dialog.close(true);
    })
  }

  updateTask() {
    let model = this.prepareFormData();
    this.taksService.updateTask(model, this.data._id).subscribe((res) => {
      this.toastr.success("Task Updated Successfully")
      this.dialog.close(true);

    })
  }

  selectImage(event: any) {
    this.fileName = event.target.value;
    this.newTaskForm.get('image')?.setValue(event.target.files[0]);
  }

  prepareFormData() {
    let newDate = moment(this.newTaskForm.value['deadline']).format("DD-MM-YYYY");
    let formData = new FormData();
    Object.entries(this.newTaskForm.value).forEach(([key, value]: any) => {
      if (key == "deadline") {
        formData.append(key, newDate)
      }
      else {
        formData.append(key, value);
      }
    })
    return formData;
  }

  close() {
    let hasChange = false;
    Object.keys(this.formValue).forEach((item) => {
      if (this.formValue[item] !== this.newTaskForm.value[item]) {
        hasChange = true;
      }
    })
    if(hasChange) {
      const dialogRef = this.matDialog.open(ConfirmationComponent , {
        width: "750px",
      }) ;
      
      dialogRef.afterClosed().subscribe((res) => {
        if(res) {
        }
      })
    } else {
      this.dialog.close();
    }
  }

  get title() {
    return this.newTaskForm.get('title');
  }

  get userId() {
    return this.newTaskForm.get('userId');
  }

  get image() {
    return this.newTaskForm.get("image")
  }

  get deadline() {
    return this.newTaskForm.get('deadline');
  }

  get description() {
    return this.newTaskForm.get('description');
  }
}





