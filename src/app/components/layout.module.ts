import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { SideMenubarComponent } from "./shared/side-menubar/side-menubar.component";
import { AdminComponent } from './admin/admin.component';
import { PrimeNGModule } from "../primeng.module";
import { CommonModule } from "@angular/common";
import { PartyComponent } from "./admin/party/party.component";
import { AddPartyComponent } from "./admin/party/add-party/add-party.component";
import { ConstituencyComponent } from "./admin/constituency/constituency.component";
import { AddConstituencyComponent } from "./admin/constituency/add-constituency/add-constituency.component";
import { CandidatesComponent } from "./admin/candidates/candidates.component";
import { AddCandidatesComponent } from "./admin/candidates/add-candidates/add-candidates.component";
import { FlexLayoutModule } from '@angular/flex-layout';
import { VotersComponent } from "./admin/voters/voters.component";
import { UsersComponent } from "./admin/users/users.component";
import { AddUsersComponent } from "./admin/users/add-users/add-users.component";
import { PermissionsComponent } from "./admin/users/permissions/permissions.component";
import { AddPermissionsComponent } from "./admin/users/add-permissions/add-permissions.component";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ElectionComponent } from "./admin/election/election.component";
import { AddElectionComponent } from "./admin/election/add-election/add-election.component";
import { ImagePreviewerComponent } from './shared/image-previewer/image-previewer.component';
import { VoteNowComponent } from './shared/vote-now/vote-now.component';




@NgModule({
    declarations: [SideMenubarComponent, AdminComponent, PartyComponent, AddPartyComponent, 
        ConstituencyComponent, AddConstituencyComponent, CandidatesComponent, AddCandidatesComponent, VotersComponent, UsersComponent, AddUsersComponent, PermissionsComponent, AddPermissionsComponent, ElectionComponent, AddElectionComponent, ImagePreviewerComponent, VoteNowComponent],
    imports: [FlexLayoutModule,PrimeNGModule, CommonModule, FormsModule,BrowserModule, ReactiveFormsModule],
    exports: [SideMenubarComponent, PrimeNGModule],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LayoutModule {
}