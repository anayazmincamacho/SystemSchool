import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from './students.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class StudentsService {
 
  Url = environment.baseUrl;

   
  constructor(private httpClient : HttpClient) {
      
    
   }

   getStudents() : Observable<Student>{



    const result = this.httpClient.get<Student>(this.Url+'api/Alumno');
    return result
   }

   addStudents(body : any): Observable<any>{
      console.log(body);
      const result = this.httpClient.post<any[]>(this.Url+'api/Alumno', body);
      return result;
   }
   updateStudent(id : any, body : any): Observable<any>{
    console.log(body);
    const result = this.httpClient.put<any[]>(this.Url+'api/Alumno/'+id, body);
    return result;
 }

   deleteStudent(id : any): Observable<any>
   {

    const result = this.httpClient.delete<any[]>(this.Url+'api/Alumno/' + id );
    return result;
   }
   
}
