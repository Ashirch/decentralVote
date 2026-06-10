import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PartyService } from 'src/app/services/party.service';
import { Party } from 'src/app/models/party';
import { ConstituencyService } from 'src/app/services/constituency.service';
import { Web3Service } from 'src/app/services/web3.service';

@Component({
  selector: 'app-add-party',
  templateUrl: './add-party.component.html',
  styleUrls: ['./add-party.component.css']
})
export class AddPartyComponent implements OnInit {
  @Input() partyData: any;
  @ViewChild('partImgUpload') imgUploadRef!: ElementRef<HTMLInputElement>;
  @Output() partyAdded = new EventEmitter<any>();
  selectedSrc: String = "assets/other-images/flag.jpg";
  selectedFile: any = null;
  allConstituencies: any[] = [];
  selectedConstituency: any;
  filter = {
    name: "",
    is_active: true,
    constituency_id: ""
  }
  constructor(
    private _partyService: PartyService,
    private _constituencyService: ConstituencyService,
    private _webService: Web3Service
  ) {
  }
  async ngOnInit(): Promise<void> {
    const response: any = await this._constituencyService.getConstituencies({}).toPromise();
    if(response.status == 200){
      this.allConstituencies = response.data;
    }
    if(this.partyData){
      this.filter = [this.partyData].map((party:any) => {
        return {
          name: party.name,
          is_active: party.is_active,
          constituency_id: party.constituency_id
        };
      })[0];
      this.selectedConstituency = this.allConstituencies.filter((constituency) => constituency?._id.toString() === this.filter.constituency_id.toString())[0];
      this.selectedSrc = this.partyData.imageURL;
    }else{
      this.selectedConstituency = this.allConstituencies[0];
      this.filter.constituency_id = this.selectedConstituency._id;
    }
  }
  triggerImageUpload(): void{
    console.log(this.imgUploadRef);
    this.imgUploadRef.nativeElement.click();
  }
  handleImageUpload($event:any){
    this.selectedFile = $event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.selectedSrc = e.target.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }
  async addNewParty(){
    // const response: any = await this._partyService.uploadImage(this.selectedFile).toPromise();
    this.filter.constituency_id = this.selectedConstituency._id;
    if(this.partyData){
      const data = {
        party_id: this.partyData._id,
        party_data: this.filter
      }
      if(this.selectedSrc !== this.partyData.imageURL){
        const response: any = await this._partyService.updateParty(data, this.selectedFile).toPromise();
        if(response.status === 200){
          this.partyAdded.emit(response.data)
        }
      }else{
        const response: any = await this._partyService.updateParty(data).toPromise();
        if(response.status === 200){
          this._webService.sendTrasaction(response.data._id,response.data.name,this.selectedConstituency._id)
          this.partyAdded.emit(response.data)
        }
      }
    }else{
      const response: any = await this._partyService.addNewParty(this.filter, this.selectedFile).toPromise();
      if(response.status === 200){
        this.partyAdded.emit(response.data)
      }
    }
  }
}
