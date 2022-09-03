import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students/students.component';
import { TeachersComponent } from './teachers/teachers.component';
import { GradesComponent } from './grades/grades.component';
import { GroupsComponent } from './groups/groups.component';

const routes: Routes = [
  {path:'students',
component: StudentsComponent},
{
  path: 'teachers',
  component: TeachersComponent
},
{
  path: 'grades',
  component: GradesComponent
},
{
  path: 'groups',
  component: GroupsComponent
}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
