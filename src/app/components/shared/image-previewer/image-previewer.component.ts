import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-previewer',
  templateUrl: './image-previewer.component.html',
  styleUrls: ['./image-previewer.component.css'],
})
export class ImagePreviewerComponent implements OnInit {
  @Input() docURL: any;
  mainURL = "";
  constructor() {}
  ngOnInit(): void {
    if(this.docURL){
      this.mainURL = this.docURL;
    }
  }
}
