import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-docs',
  styleUrls: ['docs.component.css'],
  templateUrl: 'docs.component.html',
})
export class DocsComponent {
  constructor(private router: Router) {}

  backToLogin() {
    this.router.navigateByUrl('/');
  }
}
