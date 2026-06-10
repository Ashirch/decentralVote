import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-side-menubar',
  templateUrl: './side-menubar.component.html',
  styleUrls: ['./side-menubar.component.css'],
})
export class SideMenubarComponent implements OnInit {
  items: MenuItem[] = [];
  expandedMenu = false;
  activeItem: String = 'Dashboard';

  constructor(private router: Router, public activatedRoute: ActivatedRoute) {
    this.activeItem =
      this.router.url.split('/')[this.router.url.split('/').length - 1];
  }
  ngOnInit() {
    this.initializeMenu(true);
  }

  initializeMenu(toggleButton = false) {
    if (toggleButton) {
      this.expandedMenu = !this.expandedMenu;
    }
    if (this.expandedMenu) {
      this.items = [
        {
          label: 'Dashboard',
          automationId: 'Dashboard',
          icon: 'fa-solid fa-chalkboard',
          routerLink: ['/admin/dashboard'],
          styleClass: this.getStyleClassStatus('Dashboard'),
          command: (e) => {
            this.ontabMenuClick(e);
          },
        },
        {
          label: 'Voters',
          automationId: 'Voters',
          icon: 'fa-solid fa-user',
          routerLink: ['/admin/voters'],
          styleClass: this.getStyleClassStatus('Voters'),
          command: (e) => {
            this.ontabMenuClick(e);
          },
        },
        {
          label: 'Candidates',
          automationId: 'Candidates',
          icon: 'fa-solid fa-address-card',
          routerLink: ['/admin/candidates'],
          styleClass: this.getStyleClassStatus('Candidates'),
          command: (e) => {
            this.ontabMenuClick(e);
          },
        },
        {
          label: 'Constituency',
          automationId: 'Constituency',
          icon: 'fa-solid fa-earth-americas',
          routerLink: ['/admin/constituency'],
          styleClass: this.getStyleClassStatus('Constituency'),
          command: (e) => {
            this.ontabMenuClick(e);
          },
        },
        {
          label: 'Party',
          automationId: 'Party',
          icon: 'fa-solid fa-flag',
          routerLink: ['/admin/party'],
          styleClass: this.getStyleClassStatus('Party'),
          command: (e) => {
            this.ontabMenuClick(e);
          },
        },
        {
          label: 'Election',
          automationId: 'Election',
          icon: 'fa-solid fa-check-to-slot',
          routerLink: ['/admin/election'],
          styleClass: this.getStyleClassStatus('Election'),
          command: (e) => {
            this.ontabMenuClick(e);
          },
        },
        {
          label: 'Vote Now',
          automationId: 'vote-now',
          icon: 'fa-solid fa-check-to-slot',
          routerLink: ['/admin/vote-now'],
          styleClass: this.getStyleClassStatus('vote-now'),
          command: (e) => {
            this.ontabMenuClick(e);
          },
        },
        {
          label: 'Logout',
          automationId: 'logout',
          icon: 'fa-solid fa-right-from-bracket',
          styleClass: this.getStyleClassStatus('logout'),
          command: (e) => {
            this.ontabMenuClick(e);
          },
        },
      ];
    } else {
      this.items = this.items.map((obj) => {
        const { label, ...rest } = obj;
        return { ...rest };
      });
    }
  }
  getStyleClassStatus(label: String): string | undefined {
    return this.activeItem.toLowerCase() === label.toLowerCase()
      ? 'highlight-menu-item'
      : '';
  }
  ontabMenuClick($event: any) {
    this.activeItem = $event.item.automationId;
    if(this.activeItem === "logout"){
      localStorage.removeItem("currentUser");
      this.router.navigate(['login']);
    }else{
      this.initializeMenu();
    }
  }
}
