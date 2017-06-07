import { Injectable } from '@angular/core';
import { User, USER_REGISTER } from './user';

@Injectable()
export class UserTest {

    private d: Date;
    constructor(private user: User) {
        this.d = new Date();
    }


    run() {

        this.createUser( () => {

        });

    }

    createUser( callback ) {

        let name = 'user' + this.d.getDate() + this.d.getHours() + this.d.getMinutes() + this.d.getSeconds();
        let email = name + '@gmail.com';
        let data: USER_REGISTER = { email: email, password: '12345a', displayName: name, photoUrl: '' };



        this.user.register( data, () => {
            console.log("displayName: ", this.user.auth.currentUser.displayName);
        },
        e => {
            console.error(e);
        });

    }
}