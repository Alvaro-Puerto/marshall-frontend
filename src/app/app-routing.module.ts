import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  {
    path: '', component: IndexComponent
  },
  {
    path: 'new', component: FormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
