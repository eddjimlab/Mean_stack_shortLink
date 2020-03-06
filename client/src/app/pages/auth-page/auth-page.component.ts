import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core'
import * as M from 'materialize-css/dist/js/materialize.js'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {AuthService} from '../shared/auth.service'
import {ActivatedRoute, Router} from '@angular/router'
import {User} from '../shared/interfaces'

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit, AfterViewInit {

  form: FormGroup
  submitted = false



  @ViewChild('active', {static: false}) elActive: ElementRef

  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    })

  }

  ngAfterViewInit() {
    new M.updateTextFields(this.elActive.nativeElement, {})
  }

  register(){
    if (this.form.invalid){
      return
    }
    this.submitted = true

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    }
    this.auth.register(user).subscribe(()=> {
      this.form.reset()
      this.router.navigate(['/'])
      this.submitted = false
    },error => {
      M.toast({html: error})
    })
  }

  login(){
    if (this.form.invalid){
      return
    }
    this.submitted = true
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    }
    this.auth.login(user).subscribe(()=> {
      this.form.reset()
      this.router.navigate(['/', 'create'])
      this.submitted = false
    }, (e) => {
      console.log(e)
      M.toast({html: e})
      this.submitted = false
    })
  }

}
