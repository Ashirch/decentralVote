import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ElectionService } from 'src/app/services/election.service';
import * as moment from 'moment';

@Component({
  selector: 'app-election',
  templateUrl: './election.component.html',
  styleUrls: ['./election.component.css'],
  providers: [MessageService]
})
export class ElectionComponent implements OnInit {
  visibleDialog: boolean = false;
  editData: any = null;
  allElections : any[] = [];

  constructor(
    private messageService: MessageService,
    private _service: ElectionService
  ){

  }
  async ngOnInit(): Promise<void> {
    const response: any = await this._service.getElections({searchName: ""}).toPromise();
    if(response.status == 200){
      this.allElections = response.data;
    }
  }
  getStatus(started : Boolean,ended: Boolean){
    if(started && ended){
      return "Ended"
    }else if(started){
      return "Started"
    }else{
      return "Not Started"
    }
  }
  getElectionDate(electionDate: any){
    return moment(electionDate).format('MM/DD/YYYY')
  }
  electionAdded($event: any){
    if($event){
      if(this.allElections.findIndex((p)=> p._id.toString() === $event._id.toString()) > -1){
        const index  = this.allElections.findIndex((p)=> p._id.toString() === $event._id.toString());
        this.allElections[index] = $event;
        this.editData = null;
        this.messageService.add({ key: 'br', severity: 'success', summary: 'Success', detail: 'Election Updated Successfully' });
      }else{
        this.allElections.push($event)
        this.messageService.add({ key: 'br', severity: 'success', summary: 'Success', detail: 'New Election Added Successfully' });
      }
    }
    this.visibleDialog = false;
  }
  editElection(election: any){
    this.editData = election
    this.visibleDialog = true;
  }
  async deleteElection(election_id:any){
    const response: any = await this._service.deleteElection({election_id}).toPromise();
    if(response.status == 200){
      const index = this.allElections.findIndex((election)=> election._id.toString() === election_id.toString());
      if(index > -1){
        this.allElections.splice(index, 1);
        this.messageService.add({ key: 'br', severity: 'success', summary: 'Success', detail: 'Election Deleted Successfully' });
      }
    }
  }
}
