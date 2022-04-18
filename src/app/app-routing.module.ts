import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ErrorPageComponent } from './error-page/error-page.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)},
    { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
    { path: 'accountantDisplay', loadChildren: () => import('./accountant-display/accountant-display.module').then(m => m.AccountantDisplayModule)},
    { path: 'receipt/:email/:firstname/:lastname/:id', loadChildren: () => import('./receipt/receipt.module').then(m => m.ReceiptModule)},
    { path: 'displayReceipt/:email/:firstname/:lastname/:id', loadChildren: () => import('./display-receipt/display-receipt.module').then(m => m.DisplayReceiptModule)},
    { path: 'editAccounts/:email/:firstname/:lastname/:id', loadChildren: () => import('./edit-accounts/edit-accounts.module').then(m => m.EditAccountsModule )},
    { path: 'deleteAccount/:email/:firstname/:lastname/:id', loadChildren: () => import('./delete-account/delete-account.module').then(m => m.DeleteAccountModule )},
    { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'} },
    { path: '**', redirectTo: '/not-found'}
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})

export class AppRoutingModule{

}
