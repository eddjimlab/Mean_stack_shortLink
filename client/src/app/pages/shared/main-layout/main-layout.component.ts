import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core'
import * as M from 'materialize-css/dist/js/materialize.js'
import {AuthService} from '../auth.service'
import {Router} from '@angular/router'


@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, AfterViewInit {

@ViewChild('sidenav', {static: false}) elSidenav: ElementRef

  constructor(
    public auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // let element = document.querySelector('.sidenav')
    // M.Sidenav.init(element, {})
    M.Sidenav.init(this.elSidenav.nativeElement, {})
  }

  logout(event: Event) {
    event.preventDefault()
    this.auth.logout()
    this.router.navigate(['/'])
  }
}
