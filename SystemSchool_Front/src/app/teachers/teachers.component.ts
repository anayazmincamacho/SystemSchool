import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { TeachersService } from './teachers.service';
import { Teacher } from './teachers.module';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TeacherModalComponent } from './teacher-modal/teacher-modal.component';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
  teachertsList : Teacher[] =[];
  HeaderColumns: string[] = ['name', 'apellidos', 'genero',  'actions']
  dataSource = new MatTableDataSource<any>;
  //Paginator
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<any>;


  constructor(private service : TeachersService, public dialog: MatDialog) { 
    this.getTeachers()
  }

  ngOnInit(): void {
  }

  getTeachers() : void
  {
    this.service.getTeacher().subscribe((result : any) => {
      this.teachertsList = [];
      for(var i = 0; i<result.length; i++)
      {
        this.teachertsList.push(result[i]);
      }
      console.log(this.teachertsList);
      this.dataSource.data = this.teachertsList;
    });
  }

  deleteTeachers(e : any):void
  {
    console.log(e);
  this.service.deleteTeacher(e.profesorId).subscribe((result : any) => {
    console.log(result);
    this.getTeachers()
  });
  }

  openDialog(): void {

    const dialogConfig = new MatDialogConfig();
  
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(TeacherModalComponent, dialogConfig);


  }

  updateTeacher(e : any) : void 
  {
    let dataSelect = e;
    console.log(dataSelect);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data=({id:dataSelect.profesorId});
    this.dialog.open(TeacherModalComponent, dialogConfig);
  }

ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}