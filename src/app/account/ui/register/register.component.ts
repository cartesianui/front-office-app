import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '@cartesianui/common';
import { accountModuleAnimation } from '@cartesianui/common';
import { AuthService } from '../../shared';

import { AccountSandbox } from '../../account.sandbox';
import { UserRegistrationForm } from '../../models/form/user-registration.model';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './register.component.html',
  animations: [accountModuleAnimation()]
})
export class RegisterComponent extends BaseComponent implements OnInit, OnDestroy {
  formGroup = new FormGroup({
    email: new FormControl('', [Validators.required, this.formValidator.emailValidator()]),
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    gender: new FormControl('Gender...', [Validators.required, this.formValidator.genderValidator()]),
    dob: new FormControl('', [Validators.required, this.formValidator.dateFormatValidator(), this.formValidator.dobValidator(12)])
  });

  loading: boolean;
  loaded: boolean;
  failed: boolean;

  constructor(injector: Injector, private _router: Router, private authService: AuthService, public _sandbox: AccountSandbox) {
    super(injector);
  }

  ngOnInit(): void {
    this.registerEvents();
  }

  ngOnDestroy(): void {
    this.unregisterEvents();
  }

  save(): void {
    if (this.loading) {
      this.notify.warn('Please wait for previous request', 'Warning!');
    } else if (this.formGroup.valid) {
      const form = new UserRegistrationForm();
      form.email = this.formGroup.controls.email.value;
      form.name = this.formGroup.controls.name.value;
      form.password = this.formGroup.controls.password.value;
      form.gender = this.formGroup.controls.gender.value;
      form.birth = this.formGroup.controls.dob.value;
      this._sandbox.register(form);
    } else {
      this.notify.warn('Invalid form data', 'Warning!');
    }
    // this.saving = true;
    // this._accountService
    //  .register(this.model)
    //  .pipe(
    //    finalize(() => {
    //      this.saving = false;
    //    })
    //  )
    //  .subscribe((result: RegisterOutput) => {
    //    if (!result.canLogin) {
    //      this.notify.success(this.l('SuccessfullyRegistered'));
    //      this._router.navigate(['/login']);
    //      return;
    //    }

    // Autheticate
    // this.saving = true;
    // this.authService.authenticateModel.userNameOrEmailAddress = this.model.userName;
    // this.authService.authenticateModel.password = this.model.password;
    // this.authService.authenticate(() => {
    //   this.saving = false;
    // });
    // });
  }

  registerEvents(): void {
    this.subscriptions.push(
      this._sandbox.authLoading$.subscribe((loading) => {
        if (loading) {
          this.notify.info('Registering');
        }
        this.loading = loading;
      }),
      this._sandbox.authLoaded$.subscribe((loaded) => {
        if (loaded) {
          this.notify.success('Registered successfully', 'Success!');
          this._router.navigate(['account', 'login']);
        }
        this.loaded = loaded;
      }),
      this._sandbox.authFailed$.subscribe((failed) => {
        this.failed = failed;
      })
    );
  }

  getFormClasses = (e: AbstractControl): string => {
    return this.formValidator.getFormClasses(e);
  };

  getError = (e: any): string => {
    return this.formValidator.getErrorMessage(e);
  };
}
