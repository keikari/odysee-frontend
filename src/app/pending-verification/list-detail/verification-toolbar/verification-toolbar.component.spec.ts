import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationToolbarComponent } from './verification-toolbar.component';

describe('VerificationToolbarComponent', () => {
  let component: VerificationToolbarComponent;
  let fixture: ComponentFixture<VerificationToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
