import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { FlightsService } from 'src/app/services/flights.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('sidenav')
  sidenav!: MatSidenav;
  fourHoursBefore: string = new Date(Date.now() - 13200000).toUTCString();
  fiveHoursBefore: string = new Date(Date.now() - 16800000).toUTCString();

  data: any[] = [];

  constructor(private http: FlightsService) {}

  close(reason: string) {
    this.sidenav.close();
  }

  convertStringTimeToEpoch2 = (time: string) => {
    const newDate = `${time}`;
    const epoch = new Date(newDate).getTime();
    return epoch / 1000;
  };

  ngOnInit(): void {
    this.http
      .getFilghts({
        start: this.convertStringTimeToEpoch2(this.fiveHoursBefore),
        end: this.convertStringTimeToEpoch2(this.fourHoursBefore),
      })
      .subscribe((res) => {
        this.data = res;
      });
  }
}
