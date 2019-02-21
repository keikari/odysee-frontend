import { TestBed } from '@angular/core/testing';

import { RestService } from './rest.service';
import {AppModule} from './app.module';
import {APP_BASE_HREF} from '@angular/common';

describe('RestService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [AppModule],
    declarations: [],
    providers: [{provide: APP_BASE_HREF, useValue: '/'}]
  }));

  it('should be created', () => {
    const service: RestService = TestBed.get(RestService);
    expect(service).toBeTruthy();
  });
});
