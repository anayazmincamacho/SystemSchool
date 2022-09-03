import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TeachersService } from '../teachers.service';

@Component({
  selector: 'app-teacher-modal',
  templateUrl: './teacher-modal.component.html',
  styleUrls: ['./teacher-modal.component.css']
})
export class TeacherModalComponent implements OnInit {
  isShownSave = true;
  isShown = false;
  name : any = null;
  apellidos : any = null;
  genero : any = null;
  id: any = null;
  Gender : gender[] =[
    {name : "Femenino", value : "Femenino"},
    {name : "Masculino", value : "Masculino"}
  ];
  constructor(public dialog: MatDialog, private service : TeachersService, @Inject(MAT_DIALOG_DATA) public data: any) 
  { 
      let d = this.data;
      console.log(d);
      if(d != null)
      {
        this.getTeacher(d.id);
      }
  }
  closeDialog()
  {
    
    this.dialog.closeAll();
    this.isShown = false;
    this.isShownSave = true;
 
  }

  saveTeacher(): void
  {
    const body ={
      "nombre": this.name,
      "apellidos": this.apellidos,
      "genero": this.genero
    };
    console.log(body);
    this.service.addTeacher(body).subscribe((result : any)=>
    {
        let msj = result;
        console.log(msj);
        if(msj == null)
        {
          this.dialog.closeAll();
          this.isShown = false;
          this.isShownSave = true;
        }
    })
  }

  getTeacher(id : number): void
  {
    this.service.getDataTeacher(id).subscribe((result : any)=>
    {
        let msj = result;
        console.log(msj);
        this.name = msj.nombre;
        this.apellidos = msj.apellidos;
        this.genero = msj.genero;
        this.id = msj.profesorId;
        this.isShownSave = false;
        this.isShown = true;
    })
  } 

updateTeacher(): void
{
  const body ={
    "profesorId":this.id,
    "nombre": this.name,
    "apellidos": this.apellidos,
    "genero": this.genero
  };
  console.log(body);
  this.service.updateTeacher(this.id,body).subscribe((result : any)=>
  {
      let msj = result;
      console.log(msj);
      if(msj == null)
      {
        this.dialog.closeAll();
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
