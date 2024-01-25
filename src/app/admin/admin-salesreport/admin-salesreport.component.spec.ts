import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSalesreportComponent } from './admin-salesreport.component';

describe('AdminSalesreportComponent', () => {
  let component: AdminSalesreportComponent;
  let fixture: ComponentFixture<AdminSalesreportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminSalesreportComponent]
    });
    fixture = TestBed.createComponent(AdminSalesreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
