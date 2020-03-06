import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LinksPageComponent } from './pages/links-page/links-page.component';
import { CreatePageComponent } from './pages/create-page/create-page.component';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import {AuthPageComponent} from './pages/auth-page/auth-page.component';
import {MainLayoutComponent} from './pages/shared/main-layout/main-layout.component'
import {AuthGuard} from './pages/shared/auth.guard';
import { LoaderComponent } from './pages/shared/loader/loader.component'
import localeRu from '@angular/common/locales/ru'
import {registerLocaleData} from '@angular/common'

registerLocaleData(localeRu)
@NgModule({
  declarations: [
    AppComponent,
    AuthPageComponent,
    LinksPageComponent,
    CreatePageComponent,
    DetailPageComponent,
    MainLayoutComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
