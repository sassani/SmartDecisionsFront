import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ErrorPageNotfoundComponent } from './errors/error-page-notfound/error-page-notfound.component';
import { LoginComponent } from './credential/login/login.component';
import { ForgotPasswordComponent } from './credential/forgot-password/forgot-password.component';
import { RegisterComponent } from './credential/register/register.component';
import { ChangePasswordComponent } from './credential/change-password/change-password.component';


const routes: Routes = [
    {path:'login', component: LoginComponent},
    {path:'home', component: HomeComponent},
    {path:'forgotpassword', component: ForgotPasswordComponent},
    {path:'register', component: RegisterComponent},
    {path:'credential/changepassword/:token', component: ChangePasswordComponent},
    {path:'credential/changepassword', component: ChangePasswordComponent},
    {path:'', redirectTo:'/home',pathMatch: 'full'},
    {path:'**', component: ErrorPageNotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
