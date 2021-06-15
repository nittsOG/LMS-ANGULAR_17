import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewassignments',
  templateUrl: './viewassignments.component.html',
  styleUrls: ['./viewassignments.component.css'],
})
export class ViewassignmentsComponent implements OnInit {
  public assignments: any = [];
  public pastDueDate: boolean = false;

  constructor(
    private dataService: DataService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAssignments();
  }

  //To display due date
  dueDate(date: any) {
    var submissionDate = new Date(date);
    var currentDate = new Date();

    if (submissionDate < currentDate) {
      return (
        'Past Due ' +
        date.slice(8, 10) +
        date.slice(4, 8) +
        date.slice(0, 4) +
        '       (11 : 59 PM) '
      );
    }
    return (
      ' Due on ' +
      date.slice(8, 10) +
      date.slice(4, 8) +
      date.slice(0, 4) +
      '       (11 : 59 PM) '
    );
  }

  //To change due date style
  changeDueDateStyle(date: any) {
    let styles = {
      color: date.slice(0, 8) === 'Past Due' ? 'red' : 'black',
    };
    return styles;
  }

  //To get all assignments
  getAssignments(): void {
    this.dataService.getAssignments().subscribe(
      (data) => {
        this.assignments = data;
      },
      (err) => {
        this.flashMessage.show('Server error, please try again.', {
          cssClass: 'alert-danger',
          timeout: 3000,
        });
        console.error(err);
      }
    );
  }

  //Ti view any specific assignment
  viewAssignment(id: string): void {
    this.router.navigate([`viewassignment/${id}`]);
  }
}
