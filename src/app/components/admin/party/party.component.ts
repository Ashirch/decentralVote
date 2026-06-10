import { Component } from '@angular/core';
import { PartyService } from 'src/app/services/party.service';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.css'], 
  providers: [MessageService]

})
export class PartyComponent {

  visibleDialog: boolean = false;
  allParties : any[] = [];
  editData: any = null;

  constructor(
    private _partyService: PartyService,
    private messageService: MessageService
    ) {}

  async ngOnInit() {
    const response: any = await this._partyService.getParties({searchName: ""}).toPromise();
    if(response.status == 200){
      this.allParties = response.data;
    }
  }
  getCreatedAt(date: any){
    return moment(date).format('MM/DD/YYYY')
  }
  getStatus(status: Boolean){
    if(status){
      return "Active"
    }else{
      return "Deactive"
    }
  }
  partyAdded($event: any){
    if($event){
      if(this.allParties.findIndex((p)=> p._id.toString() === $event._id.toString()) > -1){
        const index  = this.allParties.findIndex((p)=> p._id.toString() === $event._id.toString());
        this.allParties[index] = $event;
        this.editData = null;
        this.messageService.add({ key: 'br', severity: 'success', summary: 'Success', detail: 'Party Updated Successfully' });
      }else{
        this.allParties.push($event)
        this.messageService.add({ key: 'br', severity: 'success', summary: 'Success', detail: 'New Party Added Successfully' });
      }
    }
    this.visibleDialog = false;
  }
  async deleteParty(party_id: any){
    const response: any = await this._partyService.deleteParty({party_id}).toPromise();
    if(response.status === 200){
      const index  = this.allParties.findIndex((p)=> p._id.toString() === party_id.toString());
      if(index > -1){
        this.allParties.splice(index, 1);
        this.messageService.add({ key: 'br', severity: 'success', summary: 'Success', detail: 'Party Deleted Successfully' });
      }
    }
  }
  editParty(party: any){
    this.editData = party
    this.visibleDialog = true;
  }
}
