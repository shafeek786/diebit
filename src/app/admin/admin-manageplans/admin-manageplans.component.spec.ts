import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageplansComponent } from './admin-manageplans.component';

describe('AdminManageplansComponent', () => {
  let component: AdminManageplansComponent;
  let fixture: ComponentFixture<AdminManageplansComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminManageplansComponent]
    });
    fixture = TestBed.createComponent(AdminManageplansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
