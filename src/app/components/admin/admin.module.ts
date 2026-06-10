import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    AdminDashboardComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    BrowserModule
  ],
  exports: []
})
export class AdminModule { }
