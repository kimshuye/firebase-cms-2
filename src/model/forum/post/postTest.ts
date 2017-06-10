import { Injectable } from '@angular/core';
import { Post, POST_EDIT } from './post';

@Injectable()
export class PostTest {

    private d: Date;
    constructor(private post: Post) {
        this.d = new Date();
    }


    run() {

        this.createPost( () => { });


    }

    createPost( callback ) {

        let name = 'category' + this.d.getDate() + this.d.getHours() + this.d.getMinutes() + this.d.getSeconds();
        
        this.post.create( {}, () => {
           console.log("createCateogry: ok");
        },
        e => {
            console.error(e);
        });

    }


}