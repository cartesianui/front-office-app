import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { EditProfileComponent } from './ui/edit/edit-profile.component';
import { MyProfileComponent } from './ui/profile/my-profile.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    data: {},
    children: [
      {
        path: '',
        component: MyProfileComponent,
        pathMatch: 'full',
        data: {
          title: 'Profile'
        }
      },
      {
        path: 'edit',
        component: EditProfileComponent,
        data: {
          title: 'Edit Profile'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
