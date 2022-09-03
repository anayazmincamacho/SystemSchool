import { Component, OnInit, ViewChild } from '@angular/core';
import { GroupsService } from './groups.service';
import { TeachersService } from '../teachers/teachers.service';
import { GradesService } from '../grades/grades.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GroupsModalComponent } from './groups-modal/groups-modal.component';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
list : any[] = [];
listTeacher : any[] = [];
listStudent : any[] = [];
teacher : any = null;
dato : any[] = []; 
grupo : any;
dataSource = new MatTableDataSource<any>;
@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatTable) table!: MatTable<any>;
@ViewChild("grupo", {static: true}) Selected! : MatSelect;
HeaderColumns: string[] = ['nombre', 'actions']
  constructor(private group : GroupsService, private grade : GradesService, public dialog : MatDialog) {
    this.getGrades();
   }


  getGrades()
  {
    this.grade.getGradesTeacher().subscribe((result : any) =>{
        this.list = result;
        this.listTeacher = result;
        console.log(this.list);
    });
  }

  selectChange(e : any)
  {
      let dato = this.listTeacher.filter(x => x.id == e.value);
      this.teacher = "Teacher : "+ dato[0].profesor;
      this.grupo = dato[0].nombre;
      this.getGroup(e.value)
  }

  getGroup(id : number)
  {
    console.log(id);
    this.listStudent = [];
    this.group.getStudents().subscribe((result : any) =>{
      let dato = result;
      this.listStudent = dato.filter((x : any) => x.gradoId == id);
      console.log(this.listStudent);
      this.dataSource.data = this.listStudent;
      this.paginator._changePageSize(this.paginator.pageSize);
  });

  }
  openDialog()
  {
    const dialogConfig = this.dialog.open(GroupsModalComponent,{
      data: ({lista:this.listStudent, grupo: this.grupo, profesor : this.teacher})
    });
    dialogConfig.disableClose = true;
    dialogConfig.afterClosed().subscribe(result => {
      this.getGroup(this.Selected.value )
        console.log(this.Selected.value)

    });

  }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.paginator._changePageSize(this.paginator.pageSize);
  }

}


