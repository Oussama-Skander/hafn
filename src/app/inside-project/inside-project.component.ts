import { collectExternalReferences } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inside-project',
  templateUrl: './inside-project.component.html',
  styleUrls: ['./inside-project.component.css'],
})
export class InsideProjectComponent implements OnInit {
  constructor(private _http: HttpService, private router: Router) {}

  objData: any = [];
  delObj: any = [];
  upObj: any = [];
  feat: any = [];
  iss: any = [];

  ngOnInit(): void {
    this.objData = {
      projectID: 1,
    };
    this.getData();
  }
  getData() {
    this._http.getFeatures(this.objData).subscribe((data) => {
      this.feat = data;
      console.log(data);
    });
    this._http.getIssues(this.objData).subscribe((data) => {
      this.iss = data;
      console.log(data);
    });
  }
  delFeat(title) {
    this._http.deleteFeatures({ title: title }).subscribe((data) => {
      console.log(data);
      alert(`is deleted`);
    });
    this.getData();
  }

  delIss(title) {
    this._http.deleteIssues({ title: title }).subscribe((data) => {
      console.log(data);
      alert(`${title} is deleted`);
    });
    this.getData();
  }
  updateFeat(projectID, newState, title) {
    this.upObj = {
      projectID: projectID,
      newState: newState,
      title: title,
    };
    this._http.upFeat(this.upObj).subscribe((data) => {
      console.log(data);
    });
    this.getData();
  }
  updateIss(projectID, newState, title) {
    this.upObj = {
      projectID: projectID,
      newState: newState,
      title: title,
    };
    this._http.upIss(this.upObj).subscribe((data) => {
      console.log(data);
    });
    this.getData();
  }
}
