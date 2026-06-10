import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, } from '@angular/common/http';
import { API_URL } from "../components/shared/api-urls";
import * as global from '../components/shared/global';

@Injectable({
    providedIn: 'root',
  })
export class UserService {
    private currentUser:any = {};
    private userInfo:any = {};
    public constructor(
        private httpclient: HttpClient) {
    }
    loginUser(data: any){
        return this.httpclient.post(global.url + API_URL.USER.loginUser, {details: data}).pipe();
    }
    registerUser(docFile:any,data: any){
        const formData: any = new FormData();
        formData.append('data', JSON.stringify(data));
        if(docFile){
            formData.append('imageURL', docFile);
        }
        return this.httpclient.post(global.url + API_URL.USER.register, formData).pipe();
    }
    getConstituencies(){
        return this.httpclient.post(global.url + API_URL.USER.getConstituencies, {}).pipe();
    }
}