import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lockscreen',
  templateUrl: './lockscreen.component.html',
})


export class LockscreenComponent implements OnInit {
  year: number = new Date().getFullYear();

  constructor() { }

  ngOnInit(): void {
  }

}
