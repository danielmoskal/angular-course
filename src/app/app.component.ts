import { Subscription } from 'rxjs';
import { UserService } from './user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  userActivated = false;
  activatedSub: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.activatedSub = this.userService.activatedEmitter.subscribe((isActivated) => {
      this.userActivated = isActivated;
    });
  }

  ngOnDestroy() {
    this.activatedSub.unsubscribe();
  }
}
