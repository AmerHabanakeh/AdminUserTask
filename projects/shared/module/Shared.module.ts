import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../component/spinner/spinner.component';
import { LucideAngularModule, Globe, Circle, Sun, Moon, LogOut } from 'lucide-angular';



@NgModule({
  declarations: [SpinnerComponent],
  imports: [
    CommonModule,
    LucideAngularModule.pick({ Globe }),
    LucideAngularModule.pick({ Circle }),
    LucideAngularModule.pick({ Sun }),
    LucideAngularModule.pick({ Moon }),
    LucideAngularModule.pick({ LogOut }),

  ],
  exports: [
    SpinnerComponent,
    LucideAngularModule,
  ]
})
export class SharedModule { }
