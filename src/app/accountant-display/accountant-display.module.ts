import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { RouterModule } from "@angular/router";
import { AccountantDisplayComponent } from "./accountant-display.component";

@NgModule({
  declarations: [
      AccountantDisplayComponent
  ],

  imports: [
      FormsModule,
      SharedModule,
      RouterModule.forChild([{ path: '', component: AccountantDisplayComponent }])
  ]
})
export class AccountantDisplayModule{}
