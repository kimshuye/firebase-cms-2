import { Injectable } from '@angular/core';

import { Database } from './../../database/database';
import * as firebase from 'firebase/app';

import { User } from './../../user/user';





//const POST_META_PATH = 'forum/post/meta';
const POST_DATA_PATH = 'forum/post/data';
//const POST_CONTENT_PATH = 'forum/post/content';
const CATEGORY_POST_RELATION_PATH = 'forum/category-post-relation';
//const POST_LIKE_PATH = 'forum/post/likes';
//const POST_DISLIKE_PATH = 'forum/post/dislikes';
export interface POST {
    uid?: string;
    subject?: string;
    content?: string;
    categories?: { [ v:string ]: boolean };
    stamp?: number;
    sticky_forum?: boolean;
    sticky_all_forum?: boolean;
};


// export interface POST_META {
//     uid: string;
//     subject: string;
//     stamp: number;
// };

// export interface POST_EDIT {
//     key?: string;
//     categories?: { [ v:string ]: boolean };
//     subject?: string;
//     content?: string;
//     sticky_forum?: boolean;
//     sticky_all_forum?: boolean;
// };

// export interface POST_CREATE extends POST_EDIT {};

@Injectable()
export class Post {

    // post: firebase.database.Reference;

    constructor(
        private database: Database,
        private user: User
    ) {
        // this.post = this.database.root.child( POST_PATH );
    }

    get postData() : firebase.database.Reference {
        return this.database.root.child( POST_DATA_PATH );
    }
    
    

    create( post: POST, success: (post:POST) => void, error: (e) => void ) {

        let ref = this.postData.push();
        console.log("push key: ", ref.key );
        this.setPostData( ref, post, success, error );

    }

    update( post: POST, success: (post:POST) => void, error: (e) => void ) {
        
        // this.setPostMeta( ref, data, success, error );
    }

    private setPostData( ref: firebase.database.ThenableReference, post: POST, success: (post:POST) => void, error: (e) => void ) {
        post.uid = this.user.uid;
        post.stamp = Math.round( (new Date()).getTime() / 1000 );
        ref.set( post ).then( success ).catch( error );
    }

    

}