import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import * as moment from 'moment';
import { ConstituencyService } from 'src/app/services/constituency.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-constituency',
  templateUrl: './constituency.component.html',
  styleUrls: ['./constituency.component.css'],
  providers: [MessageService]
})
export class ConstituencyComponent {
  visibleDialog: boolean = false;
  editData: any = null;
  allData : any[] = [];
  constructor(
    private messageService: MessageService,
    private _service: ConstituencyService
  ) {}

  async ngOnInit() {
    const response: any = await lastValueFrom(this._service.getConstituencies({searchName: ""}));
    if(response.status == 200){
      this.allData = response.data;
    }
  }
  newConstituencyAdded($event: any){
    if($event){
      if(this.allData.findIndex((p)=> p._id.toString() === $event._id.toString()) > -1){
        const index  = this.allData.findIndex((p)=> p._id.toString() === $event._id.toString());
        this.allData[index] = $event;
        this.editData = null;
        this.messageService.add({ key: 'br', severity: 'success', summary: 'Success', detail: 'Constituency Updated Successfully' });
      }else{
        this.allData.push($event)
        this.messageService.add({ key: 'br', severity: 'success', summary: 'Success', detail: 'New Constituency Added Successfully' });
      }
    }
    this.visibleDialog = false;
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

  async deleteConstituency(constituency_id: any){
    const response: any = await this._service.deleteConstituency({constituency_id}).toPromise();
    if(response.status === 200){
      const index  = this.allData.findIndex((p)=> p._id.toString() === constituency_id.toString());
      if(index > -1){
        this.allData.splice(index, 1);
        this.messageService.add({ key: 'br', severity: 'success', summary: 'Success', detail: 'Constituency Deleted Successfully' });
      }
    }
  }
  editConstituency(constituency: any){
    this.editData = constituency
    this.visibleDialog = true;
  }
}
