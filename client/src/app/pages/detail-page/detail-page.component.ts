import {Component, OnInit} from '@angular/core'
import {AuthLinkService} from '../shared/auth.link.service'
import {ActivatedRoute} from '@angular/router'
import {Observable, Subscription} from 'rxjs'
import {map, switchMap} from 'rxjs/operators'
import {Links} from '../shared/interfaces'

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit {

 link$: Observable<Links>

  constructor(
    private linkService: AuthLinkService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    const id: string = this.route.snapshot.params.id
    this.link$ = this.route.params.pipe(switchMap((link:Links)=>{
      return this.linkService.getLink(link['id'])
    }))
  }
}
