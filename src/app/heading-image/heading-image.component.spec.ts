import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeadingImageComponent } from './heading-image.component';

describe('HeadingImageComponent', () => {
  let component: HeadingImageComponent;
  let fixture: ComponentFixture<HeadingImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadingImageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeadingImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
