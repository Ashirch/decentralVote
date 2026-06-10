import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCandidatesComponent } from './add-candidates.component';

describe('AddCandidatesComponent', () => {
  let component: AddCandidatesComponent;
  let fixture: ComponentFixture<AddCandidatesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCandidatesComponent]
    });
    fixture = TestBed.createComponent(AddCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
