import { Component } from '@angular/core';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class Footer {
  currentYear: number = environment.currentYear;
}
