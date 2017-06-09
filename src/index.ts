import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';


import { Database } from './model/database/database';
export { Database } from './model/database/database';


import { User } from './model/user/user';
export { User } from './model/user/user';

import { UserTest } from './model/user/userTest';
export { UserTest } from './model/user/userTest';


import { Category } from './model/forum/category/category';
export { Category, CATEGORIES } from './model/forum/category/category';
import { CategoryTest } from './model/forum/category/categoryTest';
export { CategoryTest } from './model/forum/category/categoryTest';

import { Post } from './model/forum/post/post';
export { Post } from './model/forum/post/post';


import { Comment } from './model/forum/comment/comment';
export { Comment } from './model/forum/comment/comment';



@NgModule({
  imports: [
    CommonModule,
    AngularFireModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class FirebaseCMSModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FirebaseCMSModule,
      providers: [ User, UserTest, Database, Category, CategoryTest, Post, Comment ]
    };
  }
}
