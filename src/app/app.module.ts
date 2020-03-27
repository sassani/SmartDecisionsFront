import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import { UserAuthStatusComponent } from './shared/user-auth-status/user-auth-status.component';
import { HomeComponent } from './home/home.component';
import { ErrorPageNotfoundComponent } from './errors/error-page-notfound/error-page-notfound.component';
import { LoginComponent } from './credential/login/login.component';
import { AuthService } from './_services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './_services/api.service';
import { HttpInterceptorsProviders } from './_helpers/http-interceptors';
import { ForgotPasswordComponent } from './credential/forgot-password/forgot-password.component';
import { RegisterComponent } from './credential/register/register.component';
import { ErrorsListComponent } from './errors/errors-list/errors-list.component';
import { ChangePasswordComponent } from './credential/change-password/change-password.component';
import { TextInputComponent } from './shared/text-input/text-input.component';
import { MessageBoxComponent } from './shared/message-box/message-box.component';
import { EmailVerificationComponent } from './credential/email-verification/email-verification.component';
import { WorkspaceModule } from './workspace/workspace.module';
@NgModule({
    declarations: [
        AppComponent,
        ToolbarComponent,
        UserAuthStatusComponent,
        HomeComponent,
        ErrorPageNotfoundComponent,
        LoginComponent,
        ForgotPasswordComponent,
        RegisterComponent,
        ErrorsListComponent,
        ChangePasswordComponent,
        TextInputComponent,
        MessageBoxComponent,
        EmailVerificationComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        WorkspaceModule,
        AppRoutingModule,
    ],
    providers: [
        ApiService,
        AuthService,
        HttpInterceptorsProviders
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
