import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StudentsComponent } from './students/students.component';
import { TeachersComponent } from './teachers/teachers.component';
import { GradesComponent } from './grades/grades.component';
import { GroupsComponent } from './groups/groups.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { StudentModalComponent } from './students/student-modal/student-modal.component';
import { TeacherModalComponent } from './teachers/teacher-modal/teacher-modal.component';
import { GradeModalComponent } from './grades/grade-modal/grade-modal.component';
import { GroupsModalComponent } from './groups/groups-modal/groups-modal.component';
@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    TeachersComponent,
    GradesComponent,
    GroupsComponent,
    StudentModalComponent,
    TeacherModalComponent,
    GradeModalComponent,
    GroupsModalComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
