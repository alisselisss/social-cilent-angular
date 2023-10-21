import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendNewsComponent } from './friend-news.component';

describe('FriendNewsComponent', () => {
  let component: FriendNewsComponent;
  let fixture: ComponentFixture<FriendNewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FriendNewsComponent]
    });
    fixture = TestBed.createComponent(FriendNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
