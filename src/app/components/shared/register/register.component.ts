import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService]
})
export class RegisterComponent implements OnInit {
  value!: string;
  filter:any = {
    first_name: "",
    last_name:"",
    email: "",
    password: "",
    constituency_id: "",
    reg_no: ""
  };
  allConstituencies: any[] = [];
  selectedConstituecny: any = null;
  errorMessage: String = "";
  isEmptyFields: boolean = false;
  selectedDocFile: any = null;
  constructor(
    private _router: Router,
    private _service: UserService,
    private _message: MessageService
  ){
  }
  async ngOnInit(): Promise<void> {
    const response: any = await this._service.getConstituencies().toPromise();
    if(response.status === 200){
      this.allConstituencies = response.data;
    }
  }
  async register(){
    if(this.selectedConstituecny !== null){
      this.filter.constituency_id = this.selectedConstituecny._id;
    }
    this.isEmptyFields = Object.values(this.filter).some((value:any)=> value.trim() === "");
    if(this.isEmptyFields){
      this.errorMessage = "*Please Enter All Details";
      if(this.value !== this.filter.password){
        this.errorMessage = "*Please Enter All Details and Correct Password";
      }
      return
    }else{
      if(this.value !== this.filter.password){
        this.isEmptyFields = true;
        this.errorMessage = "*Please Enter Correct Password";
        return;
      }
      if(this.selectedDocFile === null){
        this.isEmptyFields = true;
        this.errorMessage = "*Please Upload Document";
        return;
      }
      this.isEmptyFields = false;
      this.errorMessage = "";
    }
    await this._service.registerUser(this.selectedDocFile,this.filter).toPromise().then((response:any)=>{
      if(response.status === 200){
        this.navigateToLogin("User Registered Successfully");
      }else if(response.status === 409){
        this._message.add({ key: 'br', severity: 'info', summary: 'Success', detail: 'User Already Exists' });
      }else{
        this._message.add({ key: 'br', severity: 'error', summary: 'Success', detail: 'Something Went Wrong' });
      }
    });
  }
  navigateToLogin(message = ""){
    const params= message === "" ? {} : {queryParams: {message: message}};
    this._router.navigate([`login`],params);
  }
  handleDocUpload($event: any){
    this.selectedDocFile = $event.target.files[0];
  }
}
