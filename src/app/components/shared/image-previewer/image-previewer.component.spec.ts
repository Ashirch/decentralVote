import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagePreviewerComponent } from './image-previewer.component';

describe('ImagePreviewerComponent', () => {
  let component: ImagePreviewerComponent;
  let fixture: ComponentFixture<ImagePreviewerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImagePreviewerComponent]
    });
    fixture = TestBed.createComponent(ImagePreviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
