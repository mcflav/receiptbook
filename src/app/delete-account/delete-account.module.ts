import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { DeleteAccountComponent } from "./delete-account.component";

@NgModule({
    declarations: [
        DeleteAccountComponent
    ],

    imports: [
        FormsModule,
        SharedModule,
        RouterModule.forChild([{ path: '', component: DeleteAccountComponent }])
    ]
})
export class DeleteAccountModule{}
