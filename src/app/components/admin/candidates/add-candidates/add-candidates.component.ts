import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { CandidateService } from 'src/app/services/candidate.service';
import { ConstituencyService } from 'src/app/services/constituency.service';
import { PartyService } from 'src/app/services/party.service';

@Component({
  selector: 'app-add-candidates',
  templateUrl: './add-candidates.component.html',
  styleUrls: ['./add-candidates.component.css']
})

export class AddCandidatesComponent implements OnInit {
  @Input() candidateData: any;
  @Output() candidateAdded = new EventEmitter<any>();
  @ViewChild('imgUpload') imgUploadRef!: ElementRef<HTMLInputElement>;
  selectedSrc: String = "assets/other-images/user.png";
  countryies= [
    'United Kingdom'
  ]
  filter: any = {
    first_name: "",
    last_name: "",
    gender: "",
    email: "",
    mobile_no: "",
    date_of_birth: null,
    country: "",
    state: "",
    city: "",
    address_1: "",
    address_2: "",
    constituency_id: "",
    party_id: "",
    election_id: "",
  }
  selectedImageFile: any = null;
  selectedDocFile: any = null;
  allConstituencies: any[] = [];
  allConstituencyParty: any[] = [];
  allConstituencyElections: any[] = [];
  selectedConstituency: any;
  selectedParty: any;
  selectedElection: any

  constructor(private _constituencyService: ConstituencyService,
    private _partyService: PartyService,
    private _service: CandidateService) {

  }
  async ngOnInit(): Promise<void> {
    const response: any = await this._constituencyService.getConstituencies({}).toPromise();
    if(response.status == 200){
      this.allConstituencies = response.data;
    }
    if(this.candidateData){
      console.log(this.candidateData);
      this.filter = [this.candidateData].map((c:any) => {
        return {
          first_name: c.first_name,
          last_name: c.last_name,
          gender: c.gender,
          email: c.email,
          mobile_no: c.mobile_no,
          date_of_birth: c.date_of_birth ? new Date(c.date_of_birth) : null,
          country: c.country,
          state: c.state,
          city: c.city,
          address_1: c.address_1,
          address_2: c.address_2,
          constituency_id: c.constituency_id ? c.constituency_id : "" ,
          party_id: c.party_id ? c.party_id: "",
          election_id: c.election_id ? c.election_id : "" 
        };
      })[0];
      this.selectedConstituency = this.allConstituencies.filter((constituency) => constituency?._id.toString() === this.filter.constituency_id.toString())[0];
      if(this.candidateData.imageURL !== ""){
        this.selectedSrc = this.candidateData.imageURL;
      }
    }else{
      this.selectedConstituency = this.allConstituencies[0];
      this.filter.constituency_id = this.selectedConstituency._id;
    }
    await this.handleConstituencyChange();
  }
  triggerImageUpload(): void{
    this.imgUploadRef.nativeElement.click();
  }
  handleImageUpload($event:any){
    this.selectedImageFile = $event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.selectedSrc = e.target.result;
    };
    reader.readAsDataURL(this.selectedImageFile);
  }
  handleDocUpload($event:any){
    this.selectedDocFile = $event.target.files[0];
  }
  async handleConstituencyChange(){
    await this._partyService.getConstituencyElections({constituency_id: this.selectedConstituency._id}).subscribe((response: any)=>{
      if(response.status == 200){
        this.allConstituencyElections = response.data;
        if(this.candidateData){
          this.selectedElection = this.allConstituencyElections.filter((election) => election?._id.toString() === this.filter.election_id._id.toString())[0];
        }
      }
    });
    const response: any = await this._partyService.getConstituencyParties({constituency_id: this.selectedConstituency._id}).toPromise();
    if(response.status == 200){
      this.allConstituencyParty = response.data;
      if(this.candidateData){
        this.selectedParty = this.allConstituencyParty.filter((party) => party?._id.toString() === this.filter.party_id.toString())[0];
      }
    }
  }
  async addNewCandidate(){
    this.filter.constituency_id = this.selectedConstituency ? this.selectedConstituency._id : null;
    this.filter.party_id = this.selectedParty ? this.selectedParty._id : null;
    this.filter.election_id = this.selectedElection ? this.selectedElection._id : null;
    if(this.candidateData){
      const data = {
        candidate_id: this.candidateData._id,
        candidate_data: this.filter
      }
      const response: any = await lastValueFrom(this._service.updateCandidate(data,this.selectedImageFile,this.selectedDocFile));
      if(response.status === 200){
        let data = response.data;
        this.candidateAdded.emit(response.data);
      }
    }else{
      const response: any = await lastValueFrom(this._service.addNewCandidate(this.filter,this.selectedImageFile,this.selectedDocFile));
      if(response.status === 200){
        this.candidateAdded.emit(response.data);
      }
    }
  }
}
