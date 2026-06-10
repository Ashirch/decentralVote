import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forbidden-page',
  templateUrl: './forbidden-page.component.html',
  styleUrls: ['./forbidden-page.component.css']
})
export class ForbiddenPageComponent implements OnInit {
  currentUser: any;


  constructor(
    private _authService: AuthService,

  ) {
    this.currentUser = this._authService.currentUser;
   }

  ngOnInit(): void {
  }

}
