import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkspaceComponent } from './workspace/workspace.component';
import { WorkspaceDashboardComponent } from './workspace-dashboard/workspace-dashboard.component';
import { AuthGuard } from '../_helpers/guards/auth.guard';


const routes: Routes = [
    {
      path: 'myworkspace',
      component: WorkspaceComponent,
      canActivate: [AuthGuard],
      children: [
        {
          path: '',
          children: [
            { path: '', component: WorkspaceDashboardComponent }
          ]
        }
      ]
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspaceRoutingModule { }
