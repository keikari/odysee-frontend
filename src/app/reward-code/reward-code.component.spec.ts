import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardCodeComponent } from './reward-code.component';

describe('RewardCodeComponent', () => {
  let component: RewardCodeComponent;
  let fixture: ComponentFixture<RewardCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
