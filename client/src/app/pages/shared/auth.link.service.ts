import {Injectable} from '@angular/core'
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http'
import {Observable, throwError} from 'rxjs'
import {catchError, map} from 'rxjs/operators'
import {Links} from './interfaces'



@Injectable({providedIn: 'root'})
export class AuthLinkService {

  link = ''


  constructor(private http: HttpClient,
  ) {
  }

  get token() {
    return localStorage.getItem('mongo-token')
  }

  createLink(event: KeyboardEvent): Observable<Links> {
    this.link = (event.target as HTMLInputElement).value
    return this.http.post<Links>('/api/link/generate', {from: this.link}, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    }).pipe(
      catchError(this.handleError)
    )
  }//createLink()

  getLink(id): Observable<Links> {
    return this.http.get<Links>(`/api/link/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    }).pipe(map((response:Links) => {
      return {
        ...response, id,
        date: new Date(response.date)
      }
    }), catchError(this.handleError)
    )
  }


  getAll(): Observable<Links[]> {
    return this.http.get<Links[]>('/api/link', {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    })
      .pipe(map(response => {
        return response
      }), catchError(this.handleError))
  }//getAll()

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log('Client side error', error.error.message)
    } else {
      console.log(`Backend error code: ${error.status}` + ` body was: ${error.error.message}`)
    }
    return throwError(
      `${error.error.message}`
    )
  }



}
