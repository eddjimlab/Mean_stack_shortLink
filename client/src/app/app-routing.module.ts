import {NgModule} from '@angular/core'
import {Routes, RouterModule} from '@angular/router'
import {LinksPageComponent} from './pages/links-page/links-page.component'
import {CreatePageComponent} from './pages/create-page/create-page.component'
import {DetailPageComponent} from './pages/detail-page/detail-page.component'
import {AuthPageComponent} from './pages/auth-page/auth-page.component'
import {MainLayoutComponent} from './pages/shared/main-layout/main-layout.component'
import {AuthGuard} from './pages/shared/auth.guard'


const routes: Routes = [
  {path:'', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/', pathMatch: 'full'},
      {path: '', component: AuthPageComponent},
      {path: 'links', component: LinksPageComponent, canActivate: [AuthGuard]},
      {path: 'create', component: CreatePageComponent, canActivate: [AuthGuard]},
      {path: 'detail/:id', component: DetailPageComponent, canActivate: [AuthGuard]},
      {path: '**', redirectTo: ''}
    ]}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
