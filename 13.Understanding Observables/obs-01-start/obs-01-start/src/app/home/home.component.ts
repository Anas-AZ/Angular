import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe(
    //    {next: count=>{
    //     console.log(count);
    //    }
    //   }
    // );

    const customIntervalObs = new Observable(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if(count === 2){{
          observer.complete();
        }}
        if(count>3){
          observer.error(new Error('count is greater than 3'));
        }
        count++;
      }, 1000);
    });

    const transformedData = customIntervalObs.pipe(filter(
      (data: number) => {
        return data > 0
      }
    )
     , map(
       (data: number) => {
        return 'Round '+( data + 1);
      }
    ));

    this.firstObsSubscription =  transformedData.subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
      alert(error.message);
    }, ()=>{
      console.log('completed');
    });

  }

  ngOnDestroy(): void {
      this.firstObsSubscription.unsubscribe();
  }

}
