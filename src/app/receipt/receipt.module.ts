import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { ReceiptComponent } from "./receipt.component";

@NgModule({
    declarations: [
        ReceiptComponent
    ],

    imports: [
        FormsModule,
        SharedModule,
        RouterModule.forChild([{ path: '', component: ReceiptComponent }])
    ]
})
export class ReceiptModule{}
