import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { DisplayReceiptComponent } from "./display-receipt.component";

@NgModule({
    declarations: [
        DisplayReceiptComponent
    ],

    imports: [
        FormsModule,
        SharedModule,
        RouterModule.forChild([{ path: '', component: DisplayReceiptComponent }])
    ]
})
export class DisplayReceiptModule{}
