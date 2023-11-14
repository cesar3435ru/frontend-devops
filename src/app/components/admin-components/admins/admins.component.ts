import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { CustomValidators } from 'src/app/validations/custom-validator';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent implements OnInit {

 

  constructor(private theForm: FormBuilder, private user: AdminService, private rou: Router) {

    this.user.getAdminsObservable().subscribe(() => {
      this.showAdmins();
    });

    this.user.getAdminsDeletedObservable().subscribe(() => {
      this.showAdmins();
    });




  }
  showForm = false;
  p: number = 1;
  searchTerm: string = '';

  admins: any[] = [];
  toggleForm() {
    this.showForm = !this.showForm;
  }
  progress: number = 0;
  showProgressBar = false;

  showPassword: boolean = false;
  showPasswordTwo: boolean = false;
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  togglePasswordTwo() {
    this.showPasswordTwo = !this.showPasswordTwo;
  }

  ngOnInit(): void {
    this.adminForm.valueChanges.subscribe(() => {
      this.showProgressBar = true;
    });
    this.showAdmins();
  }

  showAdmins() {
    this.user.getAllAdmins().subscribe(
      (data: any) => {
        this.admins = data;
        console.log('my data', this.admins);
        this.getFilteredAdmins();
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  updateProgress() {
    const totalFields = 3;
    const completedFields = Object.values(this.adminForm.controls).filter(control => control.valid).length;
    this.progress = (completedFields / totalFields) * 100;
  }

  filterAdmins() {
    if (this.admins && this.admins.length > 0) {
      return this.admins.filter(admin =>
        admin.nue.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      return [];
    }
  }
  getFilteredAdmins() {
    const filteredAdmins = this.filterAdmins();
    return filteredAdmins.slice();
  }



  goodNot() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Admin created successfully!!!',
      showConfirmButton: false,
      timer: 1500
    })
  }

  goodNoti() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Admin deleted successfully!!!',
      showConfirmButton: false,
      timer: 1500
    })
  }

  badNot() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something is wrong!'
    })
  }

  adminForm: FormGroup = this.theForm.group({
    nue: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    password: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(20)]],
    cpassword: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(20)]],
  },
    { validators: CustomValidators.passwordsMatching });

  validateInput(input: string) {
    const control = this.adminForm.controls[input];

    if (!control) {
      return false; // The control does not exist and no errors
    }

    if (input === 'password' && control.errors) {
      if (control.errors && control.touched) {
        return true; // Password is required and has been touched
      }

      if (control.errors && control.touched) {
        return true; // Password is too short and has been touched
      }
    }

    return control.errors && control.touched;
  }

  saveAdmin() {
    const formData = new FormData();

    formData.append('nue', this.adminForm.get('nue')?.value);
    formData.append('password', this.adminForm.get('password')?.value);

    this.user.addAdmin(formData).subscribe(
      (response) => {
        console.log('Backend responds:', response);
        this.goodNot();
        this.user.adminsSubject.next();

      },
      (error) => {
        console.error('Error backend:', error);
      }
    );
    this.adminForm.reset();
    this.updateProgress();
    this.showProgressBar = false;
  }

  deleteAdmin(id: number) {
    this.user.deleteAdminById(id).subscribe(
      () => {
        this.goodNoti();
        this.user.deleteAdminsSubject.next();
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  confirmAlert(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, do it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteAdmin(id);
      }
    });
  }



  editAdmin(id: number) {
    console.log('TESING', id);
    this.rou.navigateByUrl(`h-admin/editadmin/${id}`);
  }

}
