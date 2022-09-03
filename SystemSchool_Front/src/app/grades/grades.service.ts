import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Grades } from './grades.module';


@Injectable({
  providedIn: 'root'
})
export class GradesService {
  Url = environment.baseUrl;
  constructor(private httpClient : HttpClient) { }

  getGrades() : Observable<Grades[]>
  {
    const result = this.httpClient.get<Grades[]>(this.Url+'api/Grado');
    return result
  }

  getGrade(id : number) : Observable<Grades>
  {
    const result = this.httpClient.get<Grades>(this.Url+'api/Grado/'+id);
    return result
  }

  getGradesTeacher()
  {
    const result = this.httpClient.get<Grades[]>(this.Url+'lista');
    return result
  }
  addGrade(body : any): Observable<any>{
    const result = this.httpClient.post<any[]>(this.Url+'api/Grado', body);
    return result;
 
 }
 updateGrade(id : any, body : any): Observable<any>{
  console.log(body);
  const result = this.httpClient.put<any[]>(this.Url+'api/Grado/'+id, body);
  return result;
}

 deleteGrade(id : any): Observable<any>
 {

  const result = this.httpClient.delete<any[]>(this.Url+'api/Grado/' + id );
  return result;
 }

}
