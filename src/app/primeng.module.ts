import { NgModule } from "@angular/core";
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { PanelMenuModule } from 'primeng/panelmenu';
import { SlideMenuModule } from 'primeng/slidemenu';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { MessagesModule } from 'primeng/messages';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FileUploadModule } from 'primeng/fileupload';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';

@NgModule({
    declarations:[],
    imports: [
        CardModule,
        InputTextModule,
        PasswordModule,
        CheckboxModule,
        ButtonModule,
        DividerModule,
        PanelMenuModule,
        SlideMenuModule,
        TableModule,
        DropdownModule,
        DialogModule,
        MessagesModule,
        InputSwitchModule,
        FileUploadModule,
        RadioButtonModule,
        InputTextareaModule,
        CalendarModule,
        ToastModule
    ],
    exports: [
        CardModule,
        InputTextModule,
        PasswordModule,
        CheckboxModule,
        ButtonModule,
        DividerModule,
        PanelMenuModule,
        SlideMenuModule,
        TableModule,
        DropdownModule,
        DialogModule,
        MessagesModule,
        InputSwitchModule,
        FileUploadModule,
        RadioButtonModule,
        InputTextareaModule,
        CalendarModule,
        ToastModule
    ],
    providers: [ToastModule]
    // entryComponents: []
})
export class PrimeNGModule {
}