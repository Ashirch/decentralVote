import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/shared/login/login.component';
import { RegisterComponent } from './components/shared/register/register.component';
import { SideMenubarComponent } from './components/shared/side-menubar/side-menubar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNGModule } from './primeng.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from './components/layout.module';
import { AdminModule } from './components/admin/admin.module';
import { ForbiddenPageComponent } from './components/shared/forbidden-page/forbidden-page.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForbiddenPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNGModule,
    FlexLayoutModule,
    LayoutModule,
    AdminModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [SideMenubarComponent, LayoutModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
