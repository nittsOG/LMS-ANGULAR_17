import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  collapsed = true;
  tokenstatus: boolean = false;
  public username: any = '';
  public admin: any = '';
  public teacher: any = '';
  public student: any = '';
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loader();
  }

  ngOnChange(): void {
    this.loader();
  }

  loader() {
    if (localStorage.getItem('id_token') === null) {
      this.tokenstatus = true;
    }
    var currentUser: any = JSON.parse(localStorage.getItem('user') || '{}');
    this.username = currentUser.name;
    if (!this.username) {
      this.username = 'No User Name';
    }
    if (currentUser.role === 'Teacher') {
      this.teacher = true;
    }
    if (currentUser.role === 'Student') {
      this.student = true;
    }
    if (currentUser.role === 'Admin') {
      this.admin = true;
    }
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
