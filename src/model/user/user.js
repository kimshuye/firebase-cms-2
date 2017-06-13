"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/observable/fromPromise");
require("rxjs/add/observable/throw");
var User = (function () {
    function User(angularFireAuth, database) {
        var _this = this;
        this.angularFireAuth = angularFireAuth;
        this.database = database;
        this._isAdmin = false;
        this.auth = angularFireAuth.auth;
        this.auth.onAuthStateChanged(function (user) {
            console.log("Auth state changed");
            if (user) {
                console.log("User logged in");
            }
            else {
                console.log("User logged out");
            }
            _this.checkAdmin();
        }, function (e) {
        });
    }
    Object.defineProperty(User.prototype, "uid", {
        /**
         * GETTERS
         */
        get: function () {
            if (this.isLogged)
                return this.auth.currentUser.uid;
        },
        enumerable: true,
        configurable: true
    });
    /// eo GETTERS
    /**
     *
     * @param data
     */
    User.prototype.create = function (data) {
        return this.auth.createUserWithEmailAndPassword(data.email, data.password);
    };
    User.prototype.update = function (user, data) {
        return user.updateProfile({
            displayName: data.displayName,
            photoURL: data.photoUrl
        });
    };
    /**
     *
     * @note Callback style function
     *
     * @param data - user registration data.
     * @param success
     * @param error
     */
    User.prototype.register = function (data, success, error) {
        var _this = this;
        this.create(data)
            .then(function (user) { return _this.update(user, data); })
            .then(success)
            .catch(error);
    };
    User.prototype.logout = function () {
        this.auth.signOut().then(function () {
            console.log("sign out ok");
        }, function () {
            console.log("sing out error");
        });
    };
    Object.defineProperty(User.prototype, "isLogged", {
        /**
         *
         */
        get: function () {
            return this.auth.currentUser !== null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "isAdmin", {
        get: function () {
            return this._isAdmin;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * checks if the logged in user is admin.
     */
    User.prototype.checkAdmin = function () {
        var _this = this;
        if (!this.isLogged) {
            console.log("checkAdmin() not logged");
            this._isAdmin = false;
            return;
        }
        console.log("Admin check");
        this.database.root.child('admin').child(this.uid).once('value').then(function (s) {
            var re = s.val();
            console.log(_this.uid + " is admin ? " + re);
            if (re === true)
                _this._isAdmin = true;
        });
    };
    return User;
}());
User = __decorate([
    core_1.Injectable()
], User);
exports.User = User;
//# sourceMappingURL=user.js.map