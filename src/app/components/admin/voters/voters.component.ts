import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { VotersService } from 'src/app/services/voters.service';

interface Status {
  name: string;
  value: Boolean;
}

@Component({
  selector: 'app-voters',
  templateUrl: './voters.component.html',
  styleUrls: ['./voters.component.css'],
  providers: [MessageService]
})
export class VotersComponent {
  allVotersData : any[] = [];
  statusOptions: Status[] | undefined;
  selectedStatus: any;
  visibleDialog: boolean = false;
  mainURL = "";
  constructor(private _service: VotersService,
    private _message: MessageService) {
    this.statusOptions = [
      { name: 'Verified', value: true },
      { name: 'Non Verified', value: false },
    ];
  }
  async ngOnInit() {
    const response: any = await this._service.getAllVoters().toPromise();
    if(response.status === 200){
      this.allVotersData = response.data;
    }
  }
  getVoterStatus(status: any){
    return status === "verified" ? "Verified" : status === "rejected" ? "Rejected" : status === "in_progress" ? "Not Verified" : "";
  }
  getFullName(voter: any){
    return `${voter.first_name} ${voter.last_name}`;
  }
  viewVoterDoc(url: any){
    this.mainURL = url;
    this.visibleDialog = true;
  }
  async updateUser(action: any, user: any){
    let updateData = {
      voter_id: user._id,
      voter_data: {}
    }
    if(action === "convert"){
      const index = this.allVotersData.findIndex((v)=> v._id.toString() === user._id.toString());
      if(index > -1){
        const response:any = await this._service.convertVoterToAdmin({user_id: user._id}).toPromise();
        if(response.status === 200){
          this.allVotersData.splice(index);
        }
      }
    }else if(action === "verify"){
      updateData.voter_data = {
        vote_status: "verified"
      }
      const response:any = await this._service.updateVoter(updateData).toPromise();
      if(response.status === 200){
        user.vote_status = "verified"
      }
    }else if(action === "reject"){
      updateData.voter_data = {
        vote_status: "rejected"
      }
      const response:any = await this._service.updateVoter(updateData).toPromise();
      if(response.status === 200){
        user.vote_status = "rejected"
      }
    }else{

    }
  }
}
