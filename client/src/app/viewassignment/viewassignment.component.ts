import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-viewassignment',
  templateUrl: './viewassignment.component.html',
  styleUrls: ['./viewassignment.component.css'],
})
export class ViewassignmentComponent implements OnInit {
  public assignmentid: any = '';
  public assignmentDetails: any = '';
  public submissionMaterial: string = '';
  public studentRollNumber: string = '';
  public submissionDate: any = '';
  public serverResponse: any = '';
  public pastDueDate: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private flashMessage: FlashMessagesService
  ) {}

  ngOnInit() {
    this.getAssignmentDetails();
  }

  //To reload component
  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  //To slice date
  sliceDate(date: any): void {
    this.submissionDate =
      date.slice(8, 10) +
      date.slice(4, 8) +
      date.slice(0, 4) +
      '       (11 : 59 PM) ';
  }

  //To check due/submission date
  checkSubmissionDate(date: Date): void {
    var submissionDate = new Date(date);
    var currentDate = new Date();

    if (submissionDate < currentDate) {
      this.pastDueDate = true;
      this.flashMessage.show(
        'Past Due Date, please contact your teacher for submission.',
        {
          cssClass: 'alert-danger',
          timeout: 3600000 * 24,
        }
      );
    }
  }

  //To get assignment details
  getAssignmentDetails(): void {
    var student: any = JSON.parse(localStorage.getItem('user') || '{}');
    this.studentRollNumber = student.username;
    this.assignmentid = this.activatedRoute.snapshot.paramMap.get('id');
    this.dataService.getAssignmentDetails(this.assignmentid).subscribe(
      (data) => {
        var returnedData: any = data;
        this.assignmentDetails = returnedData[0];
        this.sliceDate(this.assignmentDetails.submissionDate); //To Slice Date
        this.checkSubmissionDate(this.assignmentDetails.submissionDate); //To check Submission Date
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

  //To validate submission link
  validate(): boolean {
    if (!this.submissionMaterial) {
      return false;
    }
    return true;
  }

  //TO submit assignment
  submitAssignment(): void {
    if (this.validate()) {
      var submissionData = {
        id: this.assignmentid,
        rollNumber: this.studentRollNumber,
        submittedMaterial: this.submissionMaterial,
      };

      this.dataService.submitAssignment(submissionData).subscribe(
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
      this.flashMessage.show('Kindly Provide Your Submission Link', {
        cssClass: 'alert-danger',
        timeout: 3000,
      });
    }
  }
}
