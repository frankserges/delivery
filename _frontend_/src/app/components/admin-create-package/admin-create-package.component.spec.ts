import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreatePackageComponent } from './admin-create-package.component';

describe('AdminCreatePackageComponent', () => {
  let component: AdminCreatePackageComponent;
  let fixture: ComponentFixture<AdminCreatePackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminCreatePackageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCreatePackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
