import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig,MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TeachersService } from 'src/app/teachers/teachers.service';
import { GradesService } from '../grades.service';
@Component({
  selector: 'app-grade-modal',
  templateUrl: './grade-modal.component.html',
  styleUrls: ['./grade-modal.component.css']
})
export class GradeModalComponent implements OnInit {
name : any = null;
teacher : any = null;
id : any = null;
teachertsList : any[] = [];
isShownSave = true;
isShown = false;
  constructor(  public dialogRef: MatDialogRef<GradeModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private services : TeachersService, private serviceGrado : GradesService) {
    this.getTeacher()
    console.log(this.data);
    let d = this.data.id;
    if(d != null)
    {
      this.getGrade(d);
    }
  }

getTeacher()
{
  this.services.getTeacher().subscribe((result : any) => {
    this.teachertsList = [];
    for(var i = 0; i<result.length; i++)
    {
      this.teachertsList.push({"id":result[i].profesorId, "name": result[i].nombre + ' '+ result[i].apellidos});
    }
    console.log(this.teachertsList);
  });
}

  onNoClick(): void {
    this.dialogRef.close();
    this.isShownSave = true;
    this.isShown = false;
  }

  getGrade(id : any)
  {
    this.serviceGrado.getGrade(id).subscribe((result : any) => {
      let msj = result;
      console.log(msj);
      this.name = msj.nombre;
     this.teacher = msj.profesorId;
     this.id = msj.id;
     this.isShownSave = false;
     this.isShown = true;

  }); 
  }

  saveGrade()
  {
    const body ={
      "nombre": this.name,
      "profesorId": this.teacher,
    };
    this.serviceGrado.addGrade(body).subscribe((result : any) => {
        let msj = result;
        console.log(msj);
        this.onNoClick();
    }); 
  }

  updateGrade()
  {
    const body ={
      "id": this.id,
      "nombre": this.name,
      "profesorId": this.teacher,
    };
    this.serviceGrado.updateGrade(this.id, body).subscribe((result : any) => {
      let msj = result;
      console.log(msj);
      this.onNoClick();
  }); 

  }
  ngOnInit(): void {
  }

}
