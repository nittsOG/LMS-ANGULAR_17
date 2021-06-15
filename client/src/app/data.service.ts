import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { $ } from 'protractor';
//import { text } from '@fortawesome/fontawesome-svg-core';
const httpOptions = {
  headers: new HttpHeaders({
    Authorization: `Bearer ${JSON.parse(
      localStorage.getItem('id_token') || '{}'
    )}`,
    // responseType: 'text',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class DataService {
  baseUrl = 'http://localhost:3000/admin/';
  constructor(private http: HttpClient) {}

  viewteachers() {
    let url = this.baseUrl + 'teachers';
    return this.http.get(url, httpOptions);
  }
  addteacher(teacher: any) {
    let body = JSON.stringify(teacher);
    let url = this.baseUrl + 'addteacher';
    return this.http.post(url, body, httpOptions);
  }
  viewstudents() {
    let url = this.baseUrl + 'students';
    return this.http.get(url, httpOptions);
  }
  addstudent(student: any) {
    let body = JSON.stringify(student);
    let url = this.baseUrl + 'addstudent';
    return this.http.post(url, body, httpOptions);
  }
  viewclasses() {
    console.log(httpOptions);
    let url = this.baseUrl + 'classes';
    return this.http.get(url, httpOptions);
  }
  userslist() {
    console.log(httpOptions);
    let url = 'http://localhost:3000/users';
    return this.http.get(url, httpOptions);
  }

  //NEW METHODS

  //To add assignment
  addAssignment(assignment: any) {
    let body = assignment;
    let url = 'http://localhost:3000/assignments/addassignment';
    return this.http.post(url, body, httpOptions);
  }

  //To get all assignments
  getAssignments() {
    let url = 'http://localhost:3000/assignments';
    return this.http.get(url, httpOptions);
  }

  //To get details of a specific assignment
  getAssignmentDetails(assignmentid: any) {
    let url = `http://localhost:3000/assignments/assignmentdetails/${assignmentid}`;
    return this.http.get(url, httpOptions);
  }

  //To submit assignment
  submitAssignment(submissionData: any) {
    let body = submissionData;
    let url = 'http://localhost:3000/assignments/submitassignment';
    return this.http.put(url, body, httpOptions);
  }
}
