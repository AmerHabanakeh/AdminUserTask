import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../component/spinner/spinner.component';
import { LucideAngularModule, Globe } from 'lucide-angular';
import { SpinnerService } from '../spinner.service';



@NgModule({
  declarations: [SpinnerComponent],
  imports: [
    CommonModule,
    LucideAngularModule.pick({ Globe }),
  ],
  exports: [
    SpinnerComponent,
    LucideAngularModule,
  ]
})
export class SharedModule { }
