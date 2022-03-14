import { HTTP_INTERCEPTORS } from "@angular/common/http";
import  { NgModule } from "@angular/core";
import { AuthInterceptorService } from "./services/auth-interceptor.service";
import { DataStorageService } from "./services/data-storage.service";
import { ReceiptsService } from  "./services/receipts.service";
import { UsersService } from "./services/users.service";

@NgModule({
    providers: [
        UsersService,
        ReceiptsService,
        DataStorageService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true
        }
    ]
})
export class CoreModule{}
