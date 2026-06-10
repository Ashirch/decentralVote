import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, } from '@angular/common/http';
import { API_URL } from "../components/shared/api-urls";
import * as global from '../components/shared/global';

@Injectable({
    providedIn: 'root',
  })
export class PartyService {
    private currentUser:any = {};
    private userInfo:any = {};
    public constructor(
        private httpclient: HttpClient) {
    }
    getParties(data: any) {
        return this.httpclient.post(global.url + API_URL.PARTY.getParties, {details: data}).pipe();
    }
    addNewParty(data = {}, imageFile: any) {
        const details = {
            data: JSON.stringify(data)
        }
        const formData: any = new FormData();
        formData.append('file', imageFile);
        formData.append('data', JSON.stringify(data));
        return this.httpclient.post(global.url + API_URL.PARTY.addParty, formData).pipe();
    }
    updateParty(data: any, imageFile: any = null) {
        const formData: any = new FormData();
        if(imageFile){
            formData.append('file', imageFile);
        }
        formData.append('data', JSON.stringify(data));
        return this.httpclient.post(global.url + API_URL.PARTY.updateParty, formData).pipe();
    }
    deleteParty(data: any) {
        return this.httpclient.post(global.url + API_URL.PARTY.deleteParty, {details: data}).pipe();
    }
    getConstituencyParties(data: any){
        return this.httpclient.post(global.url + API_URL.PARTY.getConstituencyParties, {details: data}).pipe();
    }
    getConstituencyElections(data: any){
        return this.httpclient.post(global.url + API_URL.PARTY.getConstituencyElections, {details: data}).pipe();
    }
    castVote(data: any){
        return this.httpclient.post(global.url + API_URL.PARTY.castVote, {details: data}).pipe();
    }
}
