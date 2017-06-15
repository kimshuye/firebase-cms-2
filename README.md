# Firebase CMS

This s a headless content management system based on Firebase.

# TODO

@see https://overv.io/~/cooperative-poultry/ at firebaes-cms issues.


# Installation

To install this library, run:

```bash
$ npm install firebase-cms --save
```

## Consuming your library

Once you have published your library to npm, you can import your library in any Angular application by running:

```bash
$ npm install firebase-cms
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { FirebaseCMSModule } from 'firebase-cms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // Specify your library as an import
    FirebaseCMSModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```



# License

MIT © [JaeHo Song](mailto:thruthesky@gmail.com)


# Variables and Function Naming

createXXXXX to create             createCategory(), createPost()
editXXXXX   to edit               editCategory(),   editPost()
setXXXXXX   to set/change data.   setCategory(),    setPost()



# Database Structure & Manipulation

## One time data submisstion

* For security reason and For reducing overhead on client, client will connect/send data one time to server and clould-functions will take care of rest.



/forum/post/$post-push-key {
            uid:
            subject:
            categories:
            timestamp:
          }
          ...

/forum/post-content/$post-push-key { content: ... }

/forum/category-post-relatoin/+ $category-id
          {
            $post-push-key
            ...
          }


/forum/category-sticky/
        + $category-id {
          $post-push-id
          ...
        }

/forum/category-all-stick/$push-push-key/






/forum/post-likes/$post-push-key/ { likes: 123 } ; to oreder by likes
/forum/post-likes\-users/$post-push-key/ { $uid: true } ; to un-like.

/forum/post-dislikes/$post-push-key/ { dislikes: 123 } ; to oreder by likes
/forum/post-dislike-users/$post-push-key { $uid: true } ; to un-dislike.


/forum/post-report/$push-push-key/ { stamp: 1234 }
