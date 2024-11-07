import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import PocketBase from 'pocketbase'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public pb = new PocketBase('https://demoapi.miroslavpetro.com');
  public posts = signal<Array<{title: string, content: string, created: string}>>([]);
  constructor() {
    this._loadPosts();
    this.pb.collection('posts').subscribe('*', (e)=>{
      this._loadPosts()
    });
   
  }

  private _loadPosts(){
    this.pb.collection('posts').getFullList().then((posts) => {
      this.posts.set(
        posts.map((post) => {
          return {
            title: post['title'],
            content: post['content'],
            created: new Date(post.created).toLocaleString()
          }
        })
      )
    })
  }
}
