import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateDeliveryComponent } from './admin-create-delivery.component';

describe('AdminCreateDeliveryComponent', () => {
  let component: AdminCreateDeliveryComponent;
  let fixture: ComponentFixture<AdminCreateDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminCreateDeliveryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCreateDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
