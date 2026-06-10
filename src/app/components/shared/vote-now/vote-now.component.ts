import { Component, OnInit } from '@angular/core';
import { ElectionService } from 'src/app/services/election.service';
import * as moment from 'moment';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PartyService } from 'src/app/services/party.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-vote-now',
  templateUrl: './vote-now.component.html',
  styleUrls: ['./vote-now.component.css'],
  providers: [MessageService]
})
export class VoteNowComponent implements OnInit {
  allElections = [];
  allParties = [];
  showElections = true;
  currentUser: any;
  alreadyVoted: any = false;
  constructor (
    private _electionService: ElectionService,
    private _authService: AuthService,
    private _router: Router,
    private _party: PartyService,
    private _messageService: MessageService
  ) {
    this.currentUser = this._authService.currentUser;
  }
  async ngOnInit(): Promise<void> {
    console.log(this._authService.currentUser);
    await this.getAllElections(this.currentUser.constituency_id.toString());
  }
  async getAllElections(constituency_id: any){
    const filter = {
      constituency_id
    }
    const response: any = await this._electionService.getConstituencyElections({filter}).toPromise();
    if(response.status === 200){
      this.allElections = response.data;
    }

  }
  getElection(election: any){
    return election.name;
  }
  getElectionDate(election: any){
    return moment(election.election_date).format("MM/DD/YYYY");
  }
  getElectionStatus(election: any){
    if(election.election_started && election.election_ended){
      return 'Ended'
    }else if(election.election_started){
      return 'Started'
    }else return 'Not Started';
  }
  getTotalParties(election: any){
    return election.candidates.length;
  }
  checkElections(election: any){
    if(moment(election.election_date).isAfter(new Date())){
      return true;
    }else{
      if(election.election_started && !election.election_ended){
        return false;
      }else{
        return true;
      }
    }
  }
  showElectionParties(election: any){
    this.allParties = [];
    this.allParties = election.candidates;
    this.allParties.forEach((cand: any)=>{
      if(cand.party.voters.includes(this.currentUser._id)){
        this.alreadyVoted = true;
      }
    });
    this.showElections = !this.showElections;
  }
  getPartyName(party: any){
    return party.party.name;
  }
  getCandidateName(candidate: any){
    return `${candidate.first_name} ${candidate.last_name}`
  }
  getURL(party: any){
    return party.party.imageURL;
  }
  checkVoted(party: any) {
    if(party.party.voters.includes(this.currentUser._id)){
      return true;
    }else{
      return false;
    }
  }
  logout(){
    localStorage.removeItem("currentUser");
    this._router.navigate([`login`])
  }
  async castVote(party: any){
    const response: any = await this._party.castVote({party_id: party.party._id, user_id: this.currentUser._id }).toPromise();
    if(response.status === 200){
      this._messageService.add({ key: 'br', severity: 'success', summary: 'Success', detail: 'Voted Successfully' });
    }
  }
  getTotalVotes(party: any){
    return party.party.voters.length;
  }
  
}
