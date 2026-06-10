import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, } from '@angular/common/http';
import { API_URL } from "../components/shared/api-urls";
import * as global from '../components/shared/global';

@Injectable({
    providedIn: 'root',
  })
export class CandidateService {
    private currentUser:any = {};
    private userInfo:any = {};
    public constructor(
        private httpclient: HttpClient) {
    }
    getAllCandidates(data: any) {
        return this.httpclient.post(global.url + API_URL.CANDIDATE.getAllCandidates, {details: data}).pipe();
    }
    addNewCandidate(data: any, imageFile: any, docFile: any) {
        const formData: any = new FormData();
        formData.append('data', JSON.stringify(data));
        if(imageFile){
            formData.append('imageURL', imageFile);
        }
        if(docFile){
            formData.append('docURL', docFile);
        }
        return this.httpclient.post(global.url + API_URL.CANDIDATE.addNewCandidate, formData).pipe();
    }
    updateCandidate(data: any, imageFile: any, docFile: any) {
        const formData: any = new FormData();
        formData.append('data', JSON.stringify(data));
        if(imageFile){
            formData.append('imageURL', imageFile);
        }
        if(docFile){
            formData.append('docURL', docFile);
        }
        return this.httpclient.post(global.url + API_URL.CANDIDATE.updateCandidate, formData).pipe();
    }
    deleteCandidate(data: any){
        return this.httpclient.post(global.url + API_URL.CANDIDATE.deleteCandidate, {details: data}).pipe();

    }
}