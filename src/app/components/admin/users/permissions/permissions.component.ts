import { Component } from '@angular/core';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css']
})
export class PermissionsComponent {
  cols!: Column[];

  constructor() {}

  ngOnInit() {
      // this.productService.getProductsMini().then((data) => {
      //     this.products = data;
      // });

      this.cols = [
          { field: 'code', header: '#' },
          { field: 'name', header: 'Role Name' },
          { field: 'quantity', header: 'Actions' }
      ];
  }
}
