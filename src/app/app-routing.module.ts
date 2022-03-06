import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { DisplayReceiptComponent } from './display-receipt/display-receipt.component';
import { AccountantDisplayComponent } from './accountant-display/accountant-display.component';
import { ErrorPageComponent } from './error-page/error-page.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'accountantDisplay', component: AccountantDisplayComponent },
    { path: 'receipt/:email/:firstname/:lastname/:id', component: ReceiptComponent },
    { path: 'displayReceipt/:email/:firstname/:lastname/:id', component: DisplayReceiptComponent },
    { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'} },
    { path: '**', redirectTo: '/not-found'}
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})

export class AppRoutingModule{

}
