"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
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
var core_1 = require("@angular/core");
var Database = (function () {
    function Database(af) {
        this.af = af;
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
    Database.prototype.undefinedToNull = function (obj) {
        obj = JSON.parse(JSON.stringify(obj, function (k, v) {
            if (v === undefined)
                return null;
            else
                return v;
        }));
        return obj;
    };
    return Database;
}());
Database = __decorate([
    core_1.Injectable()
], Database);
exports.Database = Database;
//# sourceMappingURL=database.js.map