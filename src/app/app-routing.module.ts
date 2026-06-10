import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/shared/login/login.component';
import { RegisterComponent } from './components/shared/register/register.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './components/admin/admin.component';
import { PartyComponent } from './components/admin/party/party.component';
import { AddPartyComponent } from './components/admin/party/add-party/add-party.component';
import { CandidatesComponent } from './components/admin/candidates/candidates.component';
import { AddCandidatesComponent } from './components/admin/candidates/add-candidates/add-candidates.component';
import { ConstituencyComponent } from './components/admin/constituency/constituency.component';
import { AddConstituencyComponent } from './components/admin/constituency/add-constituency/add-constituency.component';
import { VotersComponent } from './components/admin/voters/voters.component';
import { UsersComponent } from './components/admin/users/users.component';
import { AddUsersComponent } from './components/admin/users/add-users/add-users.component';
import { PermissionsComponent } from './components/admin/users/permissions/permissions.component';
import { AddPermissionsComponent } from './components/admin/users/add-permissions/add-permissions.component';
import { ElectionComponent } from './components/admin/election/election.component';
import { VoteNowComponent } from './components/shared/vote-now/vote-now.component';
import { AuthorizationGuard } from './authorization.guard';
import { ForbiddenPageComponent } from './components/shared/forbidden-page/forbidden-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '403', component: ForbiddenPageComponent },
  {
    path: 'admin', component: AdminComponent, canActivateChild: [AuthorizationGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'voters', component: VotersComponent },
      { path: 'party', component: PartyComponent },
      { path: 'candidates', component: CandidatesComponent },
      { path: 'constituency', component: ConstituencyComponent },
      { path: 'users', component: UsersComponent },
      { path: 'permissions', component: PermissionsComponent },
      { path: 'election', component: ElectionComponent },
      { path: 'vote-now', component: VoteNowComponent }
    ]
  },
  { path: 'vote-now', component: VoteNowComponent, canActivate: [AuthorizationGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
