import { Component } from "@angular/core";

@Component({
    selector:'app-post-create',
    templateUrl:'./post-create.component.html',
    styleUrls:['./post-create.component.scss']
})

export class PostCreateCompoent {
    enteredValue = '';
    newPost = 'No Content';

    // onAddPost(postInput:HTMLTextAreaElement){
    //     this.newPost = postInput.value;
    // }

    onAddPost(){
        this.newPost = this.enteredValue;
    }
}
