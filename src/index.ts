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



import { ForumService } from './model/forum/forum.service';
export { ForumService } from './model/forum/forum.service';
export { CATEGORY, CATEGORIES } from './model/forum/forum.interface';





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
      providers: [
        User,
        UserTest,
        ForumService
      ]
    };
  }
}
