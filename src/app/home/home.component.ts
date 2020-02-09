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
        if (count > 3) {
          observer.error(new Error('Count is grater 3'));
        }
        if (count === 2) {
          observer.complete();
        }
        count++;
      }, 1000);
    });

    this.myIntervalSub = myIntervalObservable.subscribe(count => {
      console.log(count);
    }, (error) => {
      console.log(error);
    }, () => {
      console.log('completed!');
      alert('completed!');
    });
  }

  ngOnDestroy(): void {
    // this.intervalSub.unsubscribe();
    this.myIntervalSub.unsubscribe();
  }

}

