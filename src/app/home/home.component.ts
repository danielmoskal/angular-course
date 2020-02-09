import { interval, Subscription, Observable } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  // intervalSub: Subscription;
  myIntervalSub: Subscription;

  constructor() {
  }

  ngOnInit() {
    // this.intervalSub = interval(1000).subscribe(count => {
    //   console.log(count);
    // });

    // const myIntervalObservable = Observable.create(observer => { //create is deprecated
    //   let count = 0;
    //   setInterval(() => {
    //     observer.next(count);
    //     count++;
    //   }, 1000);
    // });

    const myIntervalObservable = new Observable(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        count++;
      }, 1000);
    });

    this.myIntervalSub = myIntervalObservable.subscribe(count => {
      console.log(count);
    });
  }

  ngOnDestroy(): void {
    // this.intervalSub.unsubscribe();
    this.myIntervalSub.unsubscribe();
  }

}

