import { Component } from '@angular/core';
import {
  GuardsCheckEnd,
  GuardsCheckStart,
  NavigationCancel,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  loading: boolean = true;

  constructor(private router: Router, public authService: AuthService) {
    this.router.events.subscribe((event) => {
      if (event instanceof GuardsCheckStart) this.loading = true;

      if (event instanceof GuardsCheckEnd || event instanceof NavigationCancel)
        this.loading = false;
    });
  }


  title = 'tiendaSass';
}
