import { Component } from '@angular/core';
import { environment } from 'environments/environment';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {
  appName: string = environment.appName;
  cartCount: number = 0;
}
