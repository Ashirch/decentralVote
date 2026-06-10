import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, } from '@angular/common/http';
import { API_URL } from "../components/shared/api-urls";
import * as global from '../components/shared/global';

@Injectable({
    providedIn: 'root',
  })
export class VotersService {
    private currentUser:any = {};
    private userInfo:any = {};
    public constructor(
        private httpclient: HttpClient) {
    }
    getAllVoters(){
        return this.httpclient.post(global.url + API_URL.VOTERS.getAllVoters, {}).pipe();
    }
    convertVoterToAdmin(data: any){
        return this.httpclient.post(global.url + API_URL.VOTERS.convertVoterToAdmin, {details: data}).pipe();
    }
    updateVoter(data: any){
        return this.httpclient.post(global.url + API_URL.VOTERS.updateVoter, {details: data}).pipe();
    }
}