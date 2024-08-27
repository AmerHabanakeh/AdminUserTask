import { Component, Input } from '@angular/core';
import { SpinnerService } from 'projects/shared/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  constructor(public spinnerService:SpinnerService){}
}
