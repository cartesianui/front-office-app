import { Injectable } from '@angular/core';
import { AppConstants } from '@cartesianui/core';
import { SessionService } from './session.service';

@Injectable()
export class UrlService {
  static tenancyNamePlaceHolder = '{TENANCY_NAME}';

  constructor(private readonly _sessionService: SessionService) {}
}
