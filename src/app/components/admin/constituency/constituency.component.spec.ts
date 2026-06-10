import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstituencyComponent } from './constituency.component';

describe('ConstituencyComponent', () => {
  let component: ConstituencyComponent;
  let fixture: ComponentFixture<ConstituencyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConstituencyComponent]
    });
    fixture = TestBed.createComponent(ConstituencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
