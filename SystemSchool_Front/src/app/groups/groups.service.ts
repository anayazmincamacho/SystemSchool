import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GroupsService {
Url = environment.baseUrl
  constructor(private httpClient : HttpClient) { }


  getStudents() : Observable<any[]>
  {
    const result = this.httpClient.get<any[]>(this.Url+'listaAlumno');
    return result
  }

}
