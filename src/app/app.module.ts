import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { DisplayReceiptComponent } from './display-receipt/display-receipt.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { UsersService } from './services/users.service';
import { DataStorageService } from './services/data-storage.service';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { ReceiptsService } from './services/receipts.service';
import { AlertComponent } from './shared/alert/alert.component';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { AccountantDisplayComponent } from './accountant-display/accountant-display.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    ReceiptComponent,
    DisplayReceiptComponent,
    ErrorPageComponent,
    LoadingSpinnerComponent,
    AlertComponent,
    AccountantDisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ShowHidePasswordModule,
    HttpClientModule
  ],
  providers: [DataStorageService, UsersService, ReceiptsService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
