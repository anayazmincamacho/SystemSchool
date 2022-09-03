import { Component, OnInit, AfterViewInit, ViewChild, Inject} from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import {StudentsService} from './students.service'
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { StudentModalComponent } from './student-modal/student-modal.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit, AfterViewInit {
  studentsList : StudentData[] =[];

  //Create table components
  HeaderColumns: string[] = ['name', 'apellidos', 'genero', 'fecha', 'actions']
  dataSource = new MatTableDataSource<any>;

  //Paginator
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  recarga : boolean = false;
  constructor(private studentservice : StudentsService, public dialog: MatDialog) { 

  }

  ngOnInit(): void {
    this.getStudents();
    
  }

  getStudents() : void
  {
    this.studentservice.getStudents().subscribe((result : any) => {
      this.studentsList = [];
      for(var i = 0; i<result.length; i++)
      {
        this.studentsList.push(result[i]);
      }
      console.log(this.studentsList);
      this.dataSource.data = this.studentsList;
    });
    
  }

openDialogEdit(): void {

  const dialogConfig = new MatDialogConfig();

  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  this.dialog.open(StudentModalComponent, dialogConfig)
}

deleteStudent(e: any)
{
  console.log(e);
  this.studentservice.deleteStudent(e.alumnoId).subscribe((result : any) => {
    console.log(result);
    this.getStudents();
    this.paginator._changePageSize(this.paginator.pageSize);
  });
  
}

editStuden(e : any)
{
  let dataSelect = e;
  console.log(dataSelect);
  const dialogConfig = new MatDialogConfig();

  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.data=({id:dataSelect.alumnoId, name: dataSelect.name, apellidos: dataSelect.apellidos, genero: dataSelect.genero, fechaNacimiento: dataSelect.fechaNacimiento});
  this.dialog.open(StudentModalComponent, dialogConfig);
}

refreshData(data : any)
{
  
}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

}

export interface StudentData {
  "alumnoId": number,
  "name": string,
  "apellidos": string,
  "genero": string,
  "fechaNacimiento": Date
}
