import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConstituencyService } from 'src/app/services/constituency.service';
import { ElectionService } from 'src/app/services/election.service';

@Component({
  selector: 'app-add-election',
  templateUrl: './add-election.component.html',
  styleUrls: ['./add-election.component.css']
})
export class AddElectionComponent implements OnInit {
  @Input() editData: any;
  @Output() electionAdded = new EventEmitter<any>();
  filter: any = {
    name: "",
    constituency_id: "",
    election_date: null,
    election_started: false,
    election_ended: false,
  }
  allConstituencies: any[] = [];
  selectedConstituency: any;

  constructor(private _constituencyService: ConstituencyService,
    private _service: ElectionService){
  }
  async ngOnInit(): Promise<void> {
    const response: any = await this._constituencyService.getConstituencies({}).toPromise();
    if(response.status == 200){
      this.allConstituencies = response.data;
    }
    if(this.editData){
      this.filter = [this.editData].map((election:any) => {
        return {
          name: election.name,
          election_date: new Date(election.election_date),
          election_started: election.election_started,
          election_ended: election.election_ended,
          constituency_id: election.constituency_id._id
        };
      })[0];
      this.selectedConstituency = this.allConstituencies.filter((constituency) => constituency?._id.toString() === this.filter.constituency_id.toString())[0];
    }else{
      this.selectedConstituency = this.allConstituencies[0];
      this.filter.constituency_id = this.selectedConstituency._id;
      this.filter.election_date = new Date();
    }
  }
  async saveElection(){
    this.filter.constituency_id = this.selectedConstituency._id;
    if(this.editData){
      const data = {
        election_id: this.editData._id,
        election_data: this.filter
      }
        const response: any = await this._service.updateElection(data).toPromise();
        if(response.status === 200){
          this.electionAdded.emit(response.data)
        }
    }else{
      const response: any = await this._service.addNewElection(this.filter).toPromise();
      if(response.status === 200){
        this.electionAdded.emit(response.data)
      }
    }
  }
}
