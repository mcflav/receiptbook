import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { LoginComponent } from "./login.component";
import { ShowHidePasswordModule } from "ngx-show-hide-password";
import { NgModule } from "@angular/core";

@NgModule({
    declarations: [
        LoginComponent
    ],

    imports: [
        FormsModule,
        ShowHidePasswordModule,
        SharedModule,
        RouterModule.forChild([{ path: '', component: LoginComponent}])
    ],

    // exports: [

    // ]
})
export class LoginModule{}
