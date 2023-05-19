import { PostsService } from './posts.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from './post.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts = [];
  isFetching = false;
  error = null;
  private errorSub : Subscription;

  constructor( private postsService: PostsService) {}
  ngOnInit() {
    this.onFetchPosts();

    this.errorSub =  this.postsService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });

  }

  onCreatePost(postData: Post) {
    this.postsService.createAndStorePost(postData.title, postData.content);
  }


  onFetchPosts() {
    this.isFetching = true;
    // Send Http request
    this.postsService.fetchPosts().subscribe(
      (posts)=>{
        this.isFetching=false;
        this.loadedPosts = posts;
      }, (error)=>{
        this.isFetching = false;
        this.error = error.message;
      }
    );

  }

  onClearPosts() {
    // Send Http request
    this.postsService.deletePosts().subscribe(
      ()=>{
        this.loadedPosts = [];
      }
    );
  }

  onHandleError(){
    this.error = null;
  }

  ngOnDestroy(){
    this.errorSub.unsubscribe();
  }
}
