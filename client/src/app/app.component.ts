import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../srv/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private router: Router;
  get nbMessage() {
    return this.auth.User.messages.in.length == 0 ? 0 : this.auth.User.messages.in.filter(x => !x.readed).length;
  }

  constructor(data: Router, private auth: AuthService) {
    this.router = data;
  }
}
