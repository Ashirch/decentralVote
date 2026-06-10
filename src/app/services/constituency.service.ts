import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, } from '@angular/common/http';
// import * as global from '../../global';
import { API_URL } from "../components/shared/api-urls";
import * as global from '../components/shared/global';

@Injectable({
    providedIn: 'root',
  })
export class ConstituencyService {
    private currentUser:any = {};
    private userInfo:any = {};
    public constructor(
        private httpclient: HttpClient) {
    }
    getConstituencies(data: any) {
        return this.httpclient.post(global.url + API_URL.CONSTITUENCY.getConstituencies, {details: data}).pipe();
    }
    addNewConstituency(data: any) {
        return this.httpclient.post(global.url + API_URL.CONSTITUENCY.addNewConstituency, {details: data}).pipe();
    }
    updateConstituency(data: any) {
        return this.httpclient.post(global.url + API_URL.CONSTITUENCY.updateConstituency, {details: data}).pipe();
    }
    deleteConstituency(data: any) {
        return this.httpclient.post(global.url + API_URL.CONSTITUENCY.deleteConstituency, {details: data}).pipe();
    }
}
