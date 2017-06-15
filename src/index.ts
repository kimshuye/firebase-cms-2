import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';


import { User } from './model/user/user';
export { User } from './model/user/user';

import { UserTest } from './model/user/userTest';
export { UserTest } from './model/user/userTest';



import { ForumService } from './model/forum/forum.service';
export { ForumService } from './model/forum/forum.service';
export { CATEGORY, CATEGORIES, POST } from './model/forum/forum.interface';





@NgModule({
  imports: [
    CommonModule
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
