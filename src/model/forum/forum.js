"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var forum_interface_1 = require("./forum.interface");
var Forum = (function () {
    function Forum(root) {
        this.root = root;
        this.debugPath = '';
    }
    Forum.prototype.createCategory = function (data, success, error) {
        return this.editCategory(data, success, error);
    };
    /**
     *
     * @param data
     * @param success
     * @param error
     *
     * @code
            this.category.create( { id: this.category_name }, () => {
            console.log("create ok")
            }, e => {
            console.error(e);
            } );
     *
     * @endcode
     */
    Forum.prototype.editCategory = function (data, success, error) {
        data = this.undefinedToNull(data);
        console.log("data: ", data);
        this.category.child(data.id).set(data)
            .then(success)
            .catch(error);
    };
    /**
     *
     * Deletes a forum category
     *
     * @param id
     * @param success
     * @param error
     *
     * @code
     *      this.category.delete( id, () => console.log("Category deleted"), e => console.error(e) );
     * @endcode
     *
     */
    Forum.prototype.deleteCategory = function (id, success, error) {
        this.category.child(id).set(null)
            .then(success)
            .catch(error);
    };
    /**
     *
     * Use this method to get all the categores. But no live-update. Only get all categories.
     *
     * @param success
     * @param error
     *
     * @code
    
                    this.gets( (categories:CATEGORIES) => {
                        console.log('categories:', categories);
                    }, e => console.error(e) );

     * @endcode
     */
    Forum.prototype.getCategories = function (success, error) {
        var categories = [];
        this.category.once('value').then(function (snapshot) {
            //console.log(snapshot.val());
            var val = snapshot.val();
            for (var _i = 0, _a = Object.keys(val); _i < _a.length; _i++) {
                var k = _a[_i];
                var v = val[k];
                //console.log(v);
                categories.push(v);
            }
            success(categories);
        }, function (e) { return error; });
    };
    //////////////
    /// POST
    //////////////
    Forum.prototype.createPost = function (post, success, error) {
        var ref = this.postData.push();
        console.log("push key: ", ref.key);
        this.setPostData(ref, post, success, error);
    };
    /**
     *
     * It sets post data on a post reference.
     *
     * 'Set post data' means to set data on a reference. So, you need 'ref' to set where.
     *
     * @param ref
     * @param post
     * @param success
     * @param error
     */
    Forum.prototype.setPostData = function (ref, post, success, error) {
        post.key = ref.key;
        post.stamp = Math.round((new Date()).getTime() / 1000);
        ref.set(post).then(function () { return success(post); }).catch(error);
    };
    //// FUNCTIONS
    /**
     *
     * @param key - is the post push key.
     * @param post
     */
    Forum.prototype.setCategoryPostRelation = function (key, post) {
        // @todo error handling
        // what is no categories?
        console.log(post);
        var categories = Object.keys(post.categories);
        var p;
        for (var _i = 0, categories_1 = categories; _i < categories_1.length; _i++) {
            var category = categories_1[_i];
            console.log("category test : " + category);
            if (post.categories[category] === true) {
                console.log("writing category: " + category);
                p = this.categoryPostRelation.child(category).child(key).set({ uid: post.uid });
            }
        }
        // @todo big problem here. return proper promise.
        return p;
    };
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
    Forum.prototype.undefinedToNull = function (obj) {
        obj = JSON.parse(JSON.stringify(obj, function (k, v) {
            if (v === undefined)
                return null;
            else
                return v;
        }));
        return obj;
    };
    Object.defineProperty(Forum.prototype, "category", {
        //// PATHS
        get: function () {
            return this.root.ref.child(this.categoryPath);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Forum.prototype, "categoryPath", {
        get: function () {
            return this.path(forum_interface_1.CATEGORY_PATH);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Forum.prototype, "postData", {
        get: function () {
            return this.root.ref.child(this.postDataPath);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Forum.prototype, "postDataPath", {
        get: function () {
            return this.path(forum_interface_1.POST_DATA_PATH);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Forum.prototype, "categoryPostRelation", {
        get: function () {
            return this.root.ref.child(this.categoryPostRelationPath);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Forum.prototype, "categoryPostRelationPath", {
        get: function () {
            return this.path(forum_interface_1.CATEGORY_POST_RELATION_PATH);
        },
        enumerable: true,
        configurable: true
    });
    Forum.prototype.path = function (p) {
        return this.debugPath + forum_interface_1.CATEGORY_PATH;
    };
    return Forum;
}());
exports.Forum = Forum;
//# sourceMappingURL=forum.js.map