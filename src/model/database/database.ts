/**
 * 
 * 
 * @code How to push
 * 
        this.database.root.child('admin')
            .push( { 'myid': true } )
            .then( r => console.log('success') )
            .catch( e => console.error(e) );

 * @endcode
 * 
 * 
 * @code How to read
 * 
        this.database.root.child('admin').child( this.uid ).once('value')
            .then( s => {
            let re = s.val();
            console.log(`${this.uid} is admin ? ${re}`);
                if ( re === true ) this._isAdmin = true;
            });
 * 
 * @endcode
 * 
 */
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
@Injectable()
export class Database {

    root: firebase.database.Reference;
    constructor(
        public af: AngularFireDatabase) {
        //
        this.root = af.database.ref('/');
    }

    /**
     * 
     * Turns undefined into null to avoid "first argument contains undefined in property firebase" error.
     * 
     * @param obj 
     * 
     * @code
     *              data = this.database.undefinedToNull( data );
     * @endcode
     * 
     */
    undefinedToNull(obj) {
        obj = JSON.parse(JSON.stringify(obj, function (k, v) {
                if ( v === undefined ) return null;
                else return v;
            } ) );
        return obj;
    }
}