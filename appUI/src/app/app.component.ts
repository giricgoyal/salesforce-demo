import { Component, Inject } from '@angular/core';
import { HttpService } from './shared/services';
import { SessionService } from './shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
  
export class AppComponent {
  public toasterConfig;

  constructor(private httpService: HttpService, private sessionService: SessionService) {
    
  }
}
