import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, zip } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-params-test',
  templateUrl: './params-test.component.html',
  styleUrls: ['./params-test.component.css']
})
export class ParamsTestComponent implements OnInit {
  groupId: number;
  id: number;
  counter = 0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    combineLatest([this.route.params, this.route.queryParams]) // Observables w tablicy!!!
      .pipe(map(results => ({ params: results[0], query: results[1] })))
      .subscribe(results => {
        console.log(results);
        this.id = results.params.id;
        this.groupId = results.query.groupId;
        this.counter++;
      });

    // zip(this.route.params, this.route.queryParams)
    //   .pipe(map(results => ({ params: results[0], query: results[1] })))
    //   .subscribe(results => {
    //     console.log(results);
    //     this.id = results.params.id;
    //     this.groupId = results.query.groupId;
    //     this.counter++;
    //   });
  }
}
