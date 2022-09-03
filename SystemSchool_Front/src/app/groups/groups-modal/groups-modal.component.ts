import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig,MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentsService } from 'src/app/students/students.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-groups-modal',
  templateUrl: './groups-modal.component.html',
  styleUrls: ['./groups-modal.component.css']
})
export class GroupsModalComponent implements OnInit {
  isShownSave = true;
  isShown = false;
  list : any[] = []; 
  datoget : any[] = [] ;
  dataSource = new MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  HeaderColumns: string[] = ['nombre', 'actions']
  constructor(public dialogRef: MatDialogRef<GroupsModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public studentService : StudentsService) {
    this.datoget = data.lista;
    console.log(this.datoget);
    this.getStuden();
   }
  onNoClick(): void {
    this.dialogRef.close();
  }
  getStuden()
  {

      this.studentService.getStudents().subscribe((result : any) => {
        console.log(result);
        if(this.datoget.length == 0)
        {
            this.list = result;
        }
        else
        {
          for(var i = 0; i<result.length; i++)
          {
              for(var j = 0; j <this.datoget.length; j++)
              {
    
                  if(result[i].alumnoId != this.datoget[j].alumnoId)
                  {
                    console.log(this.datoget[j].alumnoId);
                    console.log(result[i].alumnoId);
                    this.list.push(result[i]);
                  }
    
              }
          }
        }

        console.log(this.list);
        this.dataSource.data = this.list;
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
