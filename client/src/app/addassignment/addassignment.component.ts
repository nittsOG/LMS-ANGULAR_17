import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-addassignment',
  templateUrl: './addassignment.component.html',
  styleUrls: ['./addassignment.component.css'],
})
export class AddassignmentComponent implements OnInit {
  public date = new Date();

  public name: string = '';
  public class: string = '';
  public course: string = '';
  public title: string = '';
  public marks: any = '';
  public instructions: string = '';
  public referenceMaterial: string = '';
  public day: any = '';
  public month: any = '';
  public year: any = '';
  public submissionDate: any = '';
  public serverResponse: any = '';

  constructor(
    private router: Router,
    private dataService: DataService,
    private flashMessage: FlashMessagesService
  ) {}

  ngOnInit(): void {
    var currentUser: any = JSON.parse(localStorage.getItem('user') || '{}');
    this.name = currentUser.name;
  }

  //For form validation
  validate(): boolean {
    if (!this.class) {
      return false;
    }
    if (!this.course) {
      return false;
    }
    if (!this.title) {
      return false;
    }
    if (!this.marks) {
      return false;
    }
    if (!this.instructions) {
      return false;
    }
    if (!this.referenceMaterial) {
      return false;
    }
    if (!this.day) {
      return false;
    }
    if (!this.month) {
      return false;
    }
    if (!this.year) {
      return false;
    }
    return true;
  }

  //To reload component
  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  //To add assignment
  addAssignment(): void {
    if (this.validate()) {
      let assignment = {
        teacherName: this.name,
        className: this.class,
        courseName: this.course,
        assignmentTitle: this.title,
        assignmentMarks: this.marks,
        assignmentInstructions: this.instructions,
        referenceMaterial: this.referenceMaterial,

        //new Date(Year, Month, Date, Hr, Min, Sec);
        submissionDate: new Date(
          this.year,
          this.month - 1,
          this.day,
          23,
          59,
          59
        ),
      };

      this.dataService.addAssignment(assignment).subscribe(
        (data) => {
          this.serverResponse = data;
          this.flashMessage.show('Assignment ' + this.serverResponse.Success, {
            cssClass: 'alert-success',
            timeout: 3000,
          });
          setTimeout(() => {
            this.reloadComponent();
          }, 3000);
        },
        (err) => {
          this.flashMessage.show('Server error, please try again.', {
            cssClass: 'alert-danger',
            timeout: 3000,
          });
          console.error(err);
        }
      );
    } else {
      this.flashMessage.show('Kindly Fill All Required Details', {
        cssClass: 'alert-danger',
        timeout: 3000,
      });
    }
  }
}
