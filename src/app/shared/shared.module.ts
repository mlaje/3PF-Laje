import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullNamePipe } from './full-name.pipe';
import { EdadPipe } from './edad.pipe';
import { SizeDirective } from './size.directive';
import { MatTableModule } from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog'; 
@NgModule({
  declarations: [
    FullNamePipe,
    EdadPipe,
    SizeDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[
    FullNamePipe,
    EdadPipe,
    SizeDirective,
    MatTableModule,
    MatDialogModule
  ]
})
export class SharedModule { }
