import { Component, Inject } from '@angular/core';
import { HttpService, ToasterInjectableService } from './shared/services';
import { SessionService } from './shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
  
export class AppComponent {
  public toasterConfig;

  constructor(private httpService: HttpService, toasterService: ToasterInjectableService, private sessionService: SessionService) {
    let header = this.sessionService.getSessionObj('access_token') ? 'Bearer ' + this.sessionService.getSessionObj('access_token') : '';
    this.httpService.setHttpDefaultsHeadersCommonAuthorization(header);
    this.toasterConfig = toasterService.getConfig();
  }
}
