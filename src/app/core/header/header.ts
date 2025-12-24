import { Component, inject } from '@angular/core';
import { environment } from 'environments/environment';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from "@angular/common";
import { AuthService } from '@core/auth/auth.service';

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
  public authService = inject(AuthService);
  appName: string = environment.appName;
  cartCount: number = 0;
}