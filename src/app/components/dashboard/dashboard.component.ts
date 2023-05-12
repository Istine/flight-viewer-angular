import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
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
  data!: MatTableDataSource<any>;

  begin: FormControl = new FormControl('', [Validators.required]);
  end: FormControl = new FormControl('', [Validators.required]);
  loading: boolean = false;

  constructor(private http: FlightsService, private router: Router) {}

  close(reason: string) {
    this.sidenav.close();
  }

  convertStringTimeToEpoch2 = (time: string) => {
    const date = new Date(time);
    if (isNaN(date.getTime())) {
      const today = new Date().toLocaleDateString();
      const newDate = `${today} ${time}`;
      const epoch = new Date(newDate).getTime();
      return epoch / 1000;
    } else {
      const epoch = new Date(time).getTime();
      return epoch / 1000;
    }
  };

  formatTime = (time: number) => {
    return (
      new Date(time * 1000).toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
        timeZone: 'GMT',
      }) + '  GMT'
    );
  };

  ngOnInit() {
    this.openSkyAPI(this.fiveHoursBefore, this.fourHoursBefore);
  }

  openSkyAPI(begin: string, end: string) {
    this.loading = true;
    this.http
      .getFilghts({
        start: this.convertStringTimeToEpoch2(begin),
        end: this.convertStringTimeToEpoch2(end),
      })
      .subscribe((res) => {
        this.loading = false;
        const response = res.map((record) => ({
          flight: record.callsign,
          departureAirport: record.estDepartureAirport,
          departureTime: this.formatTime(record.firstSeen),
          arrivalAirport: record.estArrivalAirport,
          arrivalTime: this.formatTime(record.lastSeen),
        }));
        this.data = new MatTableDataSource(response);
      });
  }

  getFlights() {
    if (this.begin.valid && this.end.valid) {
      this.openSkyAPI(this.begin.value, this.end.value);
    }
  }

  logout() {
    localStorage.setItem('isLoggedIn', JSON.stringify(false));
    this.router.navigateByUrl('/');
  }
}
