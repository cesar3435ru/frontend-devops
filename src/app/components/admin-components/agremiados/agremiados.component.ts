import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminService } from 'src/app/services/admin.service';
import { CustomValidators } from 'src/app/validations/custom-validator';

@Component({
  selector: 'app-agremiados',
  templateUrl: './agremiados.component.html',
  styleUrls: ['./agremiados.component.scss']
})
export class AgremiadosComponent implements OnInit{

  constructor(private theForm: FormBuilder, private user: AdminService, private rou: Router) {

    this.user.getAgresObservable().subscribe(() => {
      this.showAgres();
    });

    this.user.getAgresDeletedObservable().subscribe(() => {
      this.showAgres();
    });




  }
  showForm = false;
  p: number = 1;
  searchTerm: string = '';

  agremiados: any[] = [];
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
    this.agrForm.valueChanges.subscribe(() => {
      this.showProgressBar = true;
    });
    this.showAgres();
  }

  showAgres() {
    this.user.getAllAgres().subscribe(
      (data: any) => {
        this.agremiados = data;
        console.log('my data', this.agremiados);
        this.getFilteredAgremiados();
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  updateProgress() {
    const totalFields = 3;
    const completedFields = Object.values(this.agrForm.controls).filter(control => control.valid).length;
    this.progress = (completedFields / totalFields) * 100;
  }

  filterAgres() {
    if (this.agremiados && this.agremiados.length > 0) {
      return this.agremiados.filter(admin =>
        admin.nue.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      return [];
    }
  }
  getFilteredAgremiados() {
    const filteredAdmins = this.filterAgres();
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

  agrForm: FormGroup = this.theForm.group({
    nue: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    password: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(20)]],
    cpassword: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(20)]],
  },
    { validators: CustomValidators.passwordsMatching });

  validateInput(input: string) {
    const control = this.agrForm.controls[input];

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

  saveAgr() {
    const formData = new FormData();

    formData.append('nue', this.agrForm.get('nue')?.value);
    formData.append('password', this.agrForm.get('password')?.value);

    this.user.addAgre(formData).subscribe(
      (response) => {
        console.log('Backend responds:', response);
        this.goodNot();
        this.user.agresSubject.next();

      },
      (error) => {
        console.error('Error backend:', error);
      }
    );
    this.agrForm.reset();
    this.updateProgress();
    this.showProgressBar = false;
  }

  deleteAgre(id: number) {
    this.user.deleteAdminById(id).subscribe(
      () => {
        this.goodNoti();
        this.user.deleteAgrSubject.next();
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
        this.deleteAgre(id);
      }
    });
  }



  editAgremiado(id: number) {
    console.log('TESING', id);
    this.rou.navigateByUrl(`admin/editagre/${id}`);
  }

}
