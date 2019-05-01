import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadPostsComponent } from './read-posts.component';

describe('ReadPostsComponent', () => {
  let component: ReadPostsComponent;
  let fixture: ComponentFixture<ReadPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadPostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
