import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Web3Service } from 'src/app/services/web3.service';
declare let require: any;
const DecentralContract = require('../../../../Blockchain/build/contracts/Decentral.json');
const PartyContract = require('../../../../Blockchain/build/contracts/Party.json');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  hide = true;
  email: string = "";
  password: string = "";
  rememberMe = false;
  Election: any;
  constructor(
    private _router: Router,
    private _activeRoute: ActivatedRoute,
    private _message: MessageService,
    private _web3: Web3Service,
    private _user: UserService,
    private _authService: AuthService
  ){
  }
  ngOnInit(): void {
    console.log(this._activeRoute.snapshot.queryParamMap.get('message')!== "")
    if(this._activeRoute.snapshot.queryParamMap.get('message')){
    }

  }
  loginWithCognito(form: NgForm){

  }
  navigateToSignUp(){
    // this._web3.deployAllContracts();
    this._router.navigate([`register`])
  }
  async navigateToDashboard(){
    if(this.email.length > 0 && this.password.length > 0){
      const response: any = await this._user.loginUser({email: this.email,password: this.password}).toPromise();
      if(response.status === 200){
        localStorage.setItem('currentUser', JSON.stringify(response.data));
        if(response.data.is_admin){
          this._web3.initWeb3();
          this._message.add({ key: 'br', severity: 'success', summary: 'Success', detail: 'Login Successfully' });
          this._router.navigate([`admin`])
        }else{
          if(response.data.vote_status === "verified"){
            this._web3.initWeb3();
            this._message.add({ key: 'br', severity: 'success', summary: 'Success', detail: 'Login Successfully' });
            this._router.navigate(['vote-now']);
          }else{
            this._message.add({ key: 'br', severity: 'error', summary: 'Error', detail: 'User not Verified' });
            localStorage.removeItem("currentUser");
          }
        }
      }else if(response.status === 404){
        this._message.add({ key: 'br', severity: 'error', summary: 'Error', detail: 'User not Found' });
      }else if(response.status === 501){
        this._message.add({ key: 'br', severity: 'error', summary: 'Error', detail: 'Wrong Password' });
      }else{
        this._message.add({ key: 'br', severity: 'error', summary: 'Error', detail: 'Something went wrong' });
      }
    }else{
      this._message.add({ key: 'br', severity: 'error', summary: 'Error', detail: 'Please both email and password' });
    }
  }
}
