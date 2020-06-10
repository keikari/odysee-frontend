import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LbryIncComponent } from './lbry-inc.component';

describe('LbryIncComponent', () => {
  let component: LbryIncComponent;
  let fixture: ComponentFixture<LbryIncComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LbryIncComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LbryIncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
