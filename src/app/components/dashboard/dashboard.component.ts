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

  constructor(private http: FlightsService) {}

  close(reason: string) {
    this.sidenav.close();
  }

  ngOnInit(): void {}
}
