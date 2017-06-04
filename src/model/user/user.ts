import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

export interface USER_REGISTER {
    name: string;
    email: string;
    password: string;
}

export interface USER_REGISTER_RESONSE {
}

@Injectable()
export class User {
    auth;
    constructor( private angularFireAuth: AngularFireAuth ) {

        /**
         * angularFireAuth.auth 는 Firebase SDK 의 auth 와 같은 것이다.
         * 
         * Firebase SDK 의 auth 를 사용하면, 초기화가 되지 않았다고 뭐라고하는데, 아래와 같이 하면, 초기화 되지 않아도 (부모 프로젝트에서 나중에 초기화 하므로) 사용가능하다.
         */
        this.auth = angularFireAuth.auth;
    }
    register( data: USER_REGISTER ) : Observable<firebase.User> {
        let promise = this.auth.createUserWithEmailAndPassword( data.email, data.password );
        /**
         * Firebase SDK 의 Promise 를 받아서 Observable 로 리턴한다.
         */
        return Observable.fromPromise( promise );
    }


}