import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';


import { User } from './model/user/user';
export { User } from './model/user/user';

import { UserTest } from './model/user/userTest';
export { UserTest } from './model/user/userTest';


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
      providers: [ User, UserTest ]
    };
  }
}
