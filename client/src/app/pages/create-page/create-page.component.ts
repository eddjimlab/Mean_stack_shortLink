import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms'
import {ActivatedRoute, Router} from '@angular/router'
import {AuthLinkService} from '../shared/auth.link.service'

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {
  form: FormGroup
  link = ''

  constructor(
    private router: Router,
    private linkService: AuthLinkService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      link: new FormControl(null)
    })
    this.route.params.subscribe()
  }



  get token() {
    return   localStorage.getItem('mongo-token')
  }

  onInput(event: KeyboardEvent) {
      return this.linkService.createLink(event)
      .subscribe(data => {
      // @ts-ignore
      this.router.navigate([`/detail/${data.link._id}`])
    })
  }
}
