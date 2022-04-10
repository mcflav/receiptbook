import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { EditAccountsComponent } from "./edit-accounts.component";

@NgModule({
    declarations: [
        EditAccountsComponent
    ],

    imports: [
        FormsModule,
        SharedModule,
        RouterModule.forChild([{ path: '', component: EditAccountsComponent }])
    ]
})
export class EditAccountsModule{}
