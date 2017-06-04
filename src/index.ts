import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';


import { User } from './model/user/user';
export { User } from './model/user/user';

@NgModule({
  imports: [
    CommonModule,
    AngularFireModule, // 여기서 초기화를 하지 않는다. 그냥 사용만하고, 부모 프로젝트에서 초기화를 한다.
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
      providers: [ User ]
    };
  }
}
