import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConstituencyService } from 'src/app/services/constituency.service';

@Component({
  selector: 'app-add-constituency',
  templateUrl: './add-constituency.component.html',
  styleUrls: ['./add-constituency.component.css']
})
export class AddConstituencyComponent {
  filter = {
    name: "",
    short_code: "",
    is_active: true
  }
  @Input() constituencyData: any;
  @Output() constituencyAdded = new EventEmitter<any>();
  constructor(
    private _service: ConstituencyService,
  ) {

  }
  ngOnInit(): void {
    if(this.constituencyData){
      this.filter = [this.constituencyData].map((c:any) => {
        return {
          name: c.name,
          is_active: c.is_active,
          short_code: c.short_code
        };
      })[0];
    }
  }

  async addNewConstituency(){
    if(this.constituencyData){
      const data = {
        constituency_id: this.constituencyData._id,
        constituency_data: this.filter
      }
      const response: any = await this._service.updateConstituency(data).toPromise();
      if(response.status === 200){
        this.constituencyAdded.emit(response.data)
      }
    }else{
      const response: any = await this._service.addNewConstituency(this.filter).toPromise();
      if(response.status === 200){
        this.constituencyAdded.emit(response.data)
      }
    }
  }
}
