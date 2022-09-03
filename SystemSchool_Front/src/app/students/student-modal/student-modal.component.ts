import { Component, OnInit, ViewChild , Inject} from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { StudentsService } from '../students.service';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-student-modal',
  templateUrl: './student-modal.component.html',
  styleUrls: ['./student-modal.component.css'],
  providers: [
   
  ]
})
export class StudentModalComponent implements OnInit {
  StudentName : any = null;
  StudentLastName : any = null;
  StundentGender : any = null;
  StudentDate : any = null ;
  StudentId : any = null;
  date = new Date();
  Gender : gender[] =[
    {name : "Femenino", value : "Femenino"},
    {name : "Masculino", value : "Masculino"}
  ];
  pipe = new DatePipe('en-US');
  isShown: boolean = false ;
  isShownSave: boolean = true ;

 
  constructor(public dialog: MatDialog, public service: StudentsService, @Inject(MAT_DIALOG_DATA) public data: any,) { 

    console.log("DataSetting:",this.data);
    let d = this.data;
    if(this.data == null)
    {
        console.log("nuevo")
    }
    else
    {
        console.log("edicion");
        this.StudentName = d.name ;
        this.StudentLastName = d.apellidos ;
        this.StundentGender = d.genero ;
        this.StudentDate = this.pipe.transform(d.fechaNacimiento, 'dd/MM/yyyy'),
        this.date = d.fechaNacimiento;
        this.StudentId = d.id;
        console.log(this.StudentDate);
        this.isShown = true;
        this.isShownSave = false;
  
       
    }
  }
  closeDialog()
  {
    
    this.StudentName  = null;
    this.StudentLastName = null;
    this.StundentGender  = null;
    this.StudentDate = null;
    this.dialog.closeAll();
    this.isShown = false;
    this.isShownSave = true;
 
  }

  saveStudent()
  {
    let d = this.pipe.transform(this.StudentDate, 'yyyy-MM-dd')
      const body = {
        "name": this.StudentName,
        "apellidos" : this.StudentLastName,
        "genero" : this.StundentGender,
        "fechaNacimiento" : d
      }

      console.log(body);
      this.service.addStudents(body).subscribe((result : any)=>
      {
          let msj = result;
          console.log(msj);
          if(msj == null)
          {
            this.StudentName  = null;
            this.StudentLastName = null;
            this.StundentGender  = null;
            this.StudentDate = null;
            this.dialog.closeAll();
            this.isShown = false;
            this.isShownSave = true;
          }
      })
  }

  updateStudent()
  {
      let d = this.pipe.transform(this.date, 'dd/MM/yyyy');
      let fecha;
      console.log(d, this.StudentDate);
      if(d == this.StudentDate)
      {
        console.log("misma")
          fecha= this.date;
      }
      else{
        fecha= this.StudentDate;
      }
      const body = {
        "alumnoId": this.StudentId ,
        "name": this.StudentName,
        "apellidos" : this.StudentLastName,
        "genero" : this.StundentGender,
        "fechaNacimiento" : fecha
      }

      console.log(body);
      this.service.updateStudent(this.StudentId,body).subscribe((result : any)=>
      {
          let msj = result;
          console.log(msj);
          if(msj == null)
          {
            this.StudentName  = null;
            this.StudentLastName = null;
            this.StundentGender  = null;
            this.StudentDate = null;
            this.dialog.closeAll();
            this.StudentId  = null;
            this.isShown = false;
            this.isShownSave = true;
          }
      })
      
  }
  ngOnInit(): void {
  }

}

interface gender {
  name : string,
  value : string
}
