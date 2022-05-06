import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { revenueBarChart, statData } from './data';

import { ChartType } from './profile.model';
import { MustMatch } from './validation.mustmatch';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

/**
 * Contacts-profile component
 */
export class ProfileComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;

  revenueBarChart: ChartType;
  statData;

  typesubmit: boolean;


  typeValidationForm: FormGroup; // type validation form
  constructor(public formBuilder: FormBuilder) { }

  ngOnInit() {


      this.typeValidationForm = this.formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmpwd: ['', Validators.required]
      }, {
          validator: MustMatch('password', 'confirmpwd'),
        });
        this.typesubmit = false;
    this.breadCrumbItems = [{ label: 'Contacts' }, { label: 'Profile', active: true }];

    // fetches the data
    this._fetchData();
  }
  get type() {
    return this.typeValidationForm.controls;
  }

  typeSubmit() {
    this.typesubmit = true;
  }
  /**
   * Fetches the data
   */
  private _fetchData() {
    this.revenueBarChart = revenueBarChart;
    this.statData = statData;
  }
}
