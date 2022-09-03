import { Component, OnInit, AfterViewInit, ViewChild, Inject} from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Grades } from './grades.module';
import { GradesService } from './grades.service';
import { TeachersService } from '../teachers/teachers.service';
import { GradeModalComponent } from './grade-modal/grade-modal.component';
@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css']
})
export class GradesComponent implements OnInit, AfterViewInit{
  gradesList : any[]= [];
  List : any[]= [];
  HeaderColumns: string[] = ['grado', 'profesor',  'actions']
  dataSource = new MatTableDataSource<any>;
  profesor : any = null;
  idGrado : any = null;
  close = false;
  //Paginator
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<any>;
  constructor(private service : GradesService, private serviceTeacher : TeachersService, public dialog : MatDialog) {
    this.getGrades()
    this.getGradesTeacher()
    
   }

  getGrades() : void
  {
    this.service.getGrades().subscribe((result : any) => {
      this.gradesList = [];
      for(var i = 0; i<result.length; i++)
      {
        this.gradesList.push(result[i]);
      }
      console.log(this.gradesList);
    });
  }

  getGradesTeacher() : void
  {
    this.service.getGradesTeacher().subscribe((result : any) => {
      this.List = [];
      for(var i = 0; i<result.length; i++)
      {
        this.List.push(result[i]);
      }
      this.dataSource.data = this.List;
      console.log(this.dataSource.data);
    });
  }

  openDialog()
  {
    const dialogConfig = this.dialog.open(GradeModalComponent,{
      data: ({id: this.idGrado})
    });
    dialogConfig.disableClose = true;
    dialogConfig.afterClosed().subscribe(result => {
      this.getGradesTeacher();
      this.paginator._changePageSize(this.paginator.pageSize);

    });
  }
  editDialog(e : any)
  {
    console.log(e);
    this.idGrado = e.id;
    const dialogConfig = this.dialog.open(GradeModalComponent,{
      data: ({id: this.idGrado})
    });
    dialogConfig.disableClose = true;
    dialogConfig.afterClosed().subscribe(result => {
      this.getGradesTeacher();
      this.paginator._changePageSize(this.paginator.pageSize);

    });
  }

  deleteGrade(e : any)
  {
    this.idGrado = e.id;
    this.service.deleteGrade(this.idGrado).subscribe(result => {
      this.getGradesTeacher();
      this.paginator._changePageSize(this.paginator.pageSize);

    });
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.paginator._changePageSize(this.paginator.pageSize);
  }

}

