import {Injectable} from '@angular/core'
import {Observable, Subject, throwError} from 'rxjs'
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http'
import {MongoToken, User} from './interfaces'
import {catchError, tap} from 'rxjs/operators'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'mongo-token'
  })
}

@Injectable({providedIn: 'root'})
export class AuthService {


  public error$: Subject<string> = new Subject<string>()



  constructor(private http: HttpClient) {}

  get token(): string {
    const expDate = new Date(localStorage.getItem('mongo-token-exp'))
    if (new Date() > expDate) {
    return null
    }
    return localStorage.getItem('mongo-token')
  }

  isAuthenticated(): boolean {
    return !!this.token
  }
  public static setToken(response: MongoToken | null){
    if (response){
      const expDate = new Date(+new Date() + 60*60*1000)
      localStorage.setItem('mongo-token', response.token)
      localStorage.setItem('mongo-token-exp', expDate.toString())
    } else {
      localStorage.clear()
    }

  }

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


  register(user: User): Observable<User> {
    return  this.http.post<User>('/api/auth/register', user, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  login(user: User): Observable<any> {
    return this.http.post('/api/auth/login', user)
      .pipe(
        tap(AuthService.setToken),
        catchError(this.handleError)
      )
  }



  logout(){AuthService.setToken(null)}


}
