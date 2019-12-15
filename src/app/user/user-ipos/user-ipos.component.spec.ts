import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserIposComponent } from './user-ipos.component';

describe('UserIposComponent', () => {
  let component: UserIposComponent;
  let fixture: ComponentFixture<UserIposComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserIposComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserIposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
