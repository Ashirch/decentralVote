import { Component } from '@angular/core';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  cols!: Column[];

  constructor() {}

  ngOnInit() {
      // this.productService.getProductsMini().then((data) => {
      //     this.products = data;
      // });

      this.cols = [
          { field: 'code', header: '#' },
          { field: 'name', header: 'User Name' },
          { field: 'category', header: 'Constituency' },
          { field: 'quantity', header: 'Email' },
          { field: 'quantity', header: 'Role' },
          { field: 'quantity', header: 'Actions' },
      ];
  }
}
