import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { lastValueFrom } from 'rxjs';
import { CandidateService } from 'src/app/services/candidate.service';

interface Status {
  name: string;
  value: Boolean;
}

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css'],
  providers: [MessageService]
})
export class CandidatesComponent {
  allData : any[] = [];
  statusOptions: Status[] | undefined;
  selectedStatus: any;
  editData: any = null;
  visibleDialog: boolean = false;
  constructor(private _service: CandidateService,
    private messageService: MessageService) {
    this.statusOptions = [
      {name: "Verified", value: true},
      {name: "Non Verified", value: false},
    ]
  }

  async ngOnInit() {
    const response: any = await lastValueFrom(this._service.getAllCandidates({}));
    if(response.status == 200){
      this.allData = response.data;
    }
  }
  getStatus(status: Boolean){
    if(status){
      return "Active"
    }else{
      return "Deactive"
    }
  }
  async deleteCandidate(candidate_id: any){
    const response: any = await this._service.deleteCandidate({candidate_id}).toPromise();
    if(response.status === 200){
      const index  = this.allData.findIndex((p)=> p._id.toString() === candidate_id.toString());
      if(index > -1){
        this.allData.splice(index, 1);
        this.messageService.add({ key: 'br', severity: 'success', summary: 'Success', detail: 'Candiate Deleted Successfully' });
      }
    }
  }
  editCandidate(candidate: any){
    this.editData = JSON.parse(JSON.stringify(candidate));
    if(candidate?.constituency_id?._id){
      this.editData.constituency_id = candidate?.constituency_id?._id
    }
    if(candidate?.party_id?._id){
      this.editData.party_id = candidate?.party_id?._id
    }
    this.visibleDialog = true;
  }
  candidateAdded($event: any){
    if($event){
      if(this.allData.findIndex((p)=> p._id.toString() === $event._id.toString()) > -1){
        const index  = this.allData.findIndex((p)=> p._id.toString() === $event._id.toString());
        this.allData[index] = $event;
        this.editData = null;
        this.messageService.add({ key: 'br', severity: 'success', summary: 'Success', detail: 'Candidate Updated Successfully' });
      }else{
        this.allData.push($event)
        this.messageService.add({ key: 'br', severity: 'success', summary: 'Success', detail: 'New Candidate Added Successfully' });
      }
    }
    this.visibleDialog = false;
  }
}
