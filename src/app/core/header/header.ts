import { Component } from '@angular/core';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {
  appName: string = environment.appName;  // тепер із environment
}
