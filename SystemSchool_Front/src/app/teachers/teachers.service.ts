import { Injectable } from '@angular/core';
import { Teacher } from './teachers.module';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TeachersService {
  Url = environment.baseUrl;
  http= environment.base;
  constructor(private httpClient : HttpClient) { }


  getTeacher() : Observable<Teacher>{

    const result = this.httpClient.get<Teacher>(this.Url+'api/Profesor');
    return result
   }
   getDataTeacher(id : number): Observable<Teacher>{

    const result = this.httpClient.get<Teacher>(this.Url+'api/Profesor/'+ id);
    return result
   }
   addTeacher(body : any): Observable<any>{
      console.log(body, this.Url+'api/Profesor');
      const result = this.httpClient.post<any[]>(this.Url+'api/Profesor', body);
      return result;
   
   }
   updateTeacher(id : any, body : any): Observable<any>{
    console.log(body);
    const result = this.httpClient.put<any[]>(this.Url+'api/Profesor/'+id, body);
    return result;
 }

   deleteTeacher(id : any): Observable<any>
   {

    const result = this.httpClient.delete<any[]>(this.Url+'api/Profesor/' + id );
    return result;
   }
}
