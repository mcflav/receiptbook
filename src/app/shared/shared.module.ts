import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from "../shared/alert/alert.component";
import { LoadingSpinnerComponent } from "../shared/loading-spinner/loading-spinner.component";

@NgModule({
    declarations: [
        LoadingSpinnerComponent,
        AlertComponent
    ],

    imports: [
        CommonModule
    ],

    exports: [
        LoadingSpinnerComponent,
        AlertComponent,
        CommonModule
    ],

    entryComponents: [AlertComponent]
})
export class SharedModule{}
