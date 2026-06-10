import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, } from '@angular/common/http';
import { API_URL } from "../components/shared/api-urls";
import * as global from '../components/shared/global';

@Injectable({
    providedIn: 'root',
  })
export class ElectionService {
    private currentUser:any = {};
    private userInfo:any = {};
    public constructor(
        private httpclient: HttpClient) {
    }
    addNewElection(data: any) {
        return this.httpclient.post(global.url + API_URL.ELECTIONS.addElection, {details: data}).pipe();
    }
    getElections(data: any) {
        return this.httpclient.post(global.url + API_URL.ELECTIONS.getElections, {details: data}).pipe();
    }
    updateElection(data: any){
        return this.httpclient.post(global.url + API_URL.ELECTIONS.updateElection, {details: data}).pipe();
    }
    deleteElection(data: any){
        return this.httpclient.post(global.url + API_URL.ELECTIONS.deleteElection, {details: data}).pipe();
    }
    getConstituencyElections(data: any){
        return this.httpclient.post(global.url + API_URL.ELECTIONS.getConstituencyElections, {details: data}).pipe();

    }
}