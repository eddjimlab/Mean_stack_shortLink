import { Component, OnInit } from '@angular/core';
import {AuthLinkService} from '../shared/auth.link.service'
import {Links} from '../shared/interfaces'

@Component({
  selector: 'app-links-page',
  templateUrl: './links-page.component.html',
  styleUrls: ['./links-page.component.scss']
})
export class LinksPageComponent implements OnInit {

  links: Links[] = []

  constructor(
    private linkService: AuthLinkService
  ) { }

  ngOnInit() {
    this.linkService.getAll().subscribe(links => {
      this.links = links
    })
  }
}
