import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'post-list',
    pathMatch: 'full'
  },
  {
    path: 'user-list',
    loadChildren: () => import('./Master/user-list/user-list.module').then( m => m.UserListPageModule)
  },
  {
    path: 'user-details',
    loadChildren: () => import('./Master/user-details/user-details.module').then( m => m.UserDetailsPageModule)
  },
  {
    path: 'post-list',
    loadChildren: () => import('./Master/post-list/post-list.module').then( m => m.PostListPageModule)
  },
  {
    path: 'post-details',
    loadChildren: () => import('./Master/post-details/post-details.module').then( m => m.PostDetailsPageModule)
  },
  {
    path: 'view-post/:id',
    loadChildren: () => import('./Master/view-post/view-post.module').then( m => m.ViewPostPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
