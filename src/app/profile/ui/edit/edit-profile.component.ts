import { Component, ElementRef, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ListHelper, BaseComponent } from '@cartesianui/common';
import { RequestCriteria } from '@cartesianui/ng-axis';
import { User, Role, UserRoles, SearchUserForm, SearchRoleForm } from '../../models';
import { ProfileSandbox } from '../../profile.sandbox';
import * as moment from 'moment';

@Component({
  selector: 'edit-profile',
  templateUrl: './edit-profile.component.html'
})
export class EditProfileComponent extends BaseComponent implements OnInit, OnDestroy {
  formGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    gender: new FormControl('Gender...', [Validators.required, this.formValidator.genderValidator()]),
    birth: new FormControl('', [Validators.required, this.formValidator.dateFormatValidator(), this.formValidator.dobValidator(12)])
  });

  updatingRoles = false;
  updatingDetail = false;

  loading: boolean;
  loaded: boolean;
  failed: boolean;
  roleCriteria = new RequestCriteria<SearchRoleForm>(new SearchRoleForm());
  userCriteria = new RequestCriteria<SearchUserForm>(new SearchUserForm());
  subscriptions: Array<Subscription> = [];

  userId: string;
  user: User;

  selectedRoles: Role[] = [];
  allRoles: Role[] = [];
  userRoles: Role[] = [];

  constructor(protected injector: Injector, protected _sandbox: ProfileSandbox, protected route: ActivatedRoute) {
    super(injector);
  }

  ngOnInit(): void {
    this.registerEvents();
    this.fetchUser();
    this.fetchRoles();
  }

  ngOnDestroy() {
    this.unregisterEvents();
  }

  registerEvents() {
    this.subscriptions.push(
      this.route.params.subscribe((params) => {
        this.userId = params.id;
      })
    );
    this.subscriptions.push(
      this._sandbox.profile$.subscribe((user: any) => {
        if (user) {
          this.user = new User(user);
          const dob = moment(this.user.birth);
          this.user.birth = dob.format('YYYY-MM-DD');
          this.formGroup.patchValue(this.user);
          const roles = [];
          if (user.roles) {
            for (const i in user.roles.data) {
              if (user.roles.data.hasOwnProperty(i)) {
                roles.push(user.roles.data[i]);
              }
            }
          }
          this.userRoles = roles;
        }
      })
    );
    this.subscriptions.push(
      this._sandbox.rolesFetchData$.subscribe((roles: Role[]) => {
        this.allRoles = roles;
        // if (this.user) {
        //   this.resetValidators();
        // }
      })
    );

    this.subscriptions.push(
      this._sandbox.rolesLoaded$.subscribe((loaded: boolean) => {
        if (loaded) {
          if (this.updatingRoles && this.updatingDetail) {
            this.notify.success('User roles and details updated.', 'Success!');
            this.updatingRoles = false;
            this.updatingDetail = false;
          } else if (this.updatingRoles) {
            this.notify.success('User roles updated.', 'Success!');
            this.updatingRoles = false;
          } else if (this.updatingDetail) {
            this.notify.success('User detail updated.', 'Success!');
            this.updatingDetail = false;
          }
          if (this.user) {
            this.user.roles = this.userRoles;
          }
        }
        this.loaded = loaded;
      })
    );
    this.subscriptions.push(
      this._sandbox.rolesLoading$.subscribe((loading: boolean) => {
        this.loading = loading;
      })
    );
    this.subscriptions.push(
      this._sandbox.rolesFailed$.subscribe((failed: boolean) => {
        if (failed) {
          if (this.updatingRoles && this.updatingDetail) {
            this.notify.error('Could not update user roles and detail.', 'Error!');
            this.updatingRoles = false;
            this.updatingDetail = false;
          } else if (this.updatingRoles) {
            this.notify.error('Could not update user roles', 'Error!');
            this.updatingRoles = false;
          } else if (this.updatingDetail) {
            this.notify.error('Could not update user detail.', 'Error!');
            this.updatingDetail = false;
          }
        }
        this.failed = failed;
      })
    );
  }

  fetchUser() {
    this._sandbox.fetchFilteredUserById(this.userId, this.userCriteria.with('roles').limit(1));
  }

  fetchRoles() {
    this._sandbox.fetchRoles(this.roleCriteria);
  }

  sync() {
    if (this.loading) {
      this.notify.warn('Please wait for the previous request', 'Warning!');
      return;
    }
    this.updatingRoles = this.isRoleListChanged();
    this.updatingDetail = this.isUserDataChanged();
    if (this.updatingRoles && this.updatingDetail) {
      if (this.formGroup.valid) {
        this.updateRoles();
        this.update();
        this.notify.info('Updating User and Roles');
      } else {
        this.notify.warn('User details are invalid');
      }
    } else if (this.updatingRoles) {
      this.updateRoles();
    } else if (this.updatingDetail) {
      this.update();
      this.notify.info('Updating User');
    } else {
      this.notify.info('No changes to update');
    }
  }

  updateRoles() {
    const roleIds = this.userRoles.map((role) => role.id);
    const roleNames = this.userRoles.map((role) => role.name);
    const form = new UserRoles({
      userId: this.userId,
      rolesIds: roleIds
    });
    const message = this.userRoles.length === 0 ? 'Are you sure you want to remove all roles?' : 'Are you sure you want to save the following roles?\n\t- ' + roleNames.join('\n\t- ');
    this.message.confirm(message, 'Confirm Action', (res) => {
      if (res) {
        this._sandbox.syncRolesOnUser(form);
        this.notify.info('Updating Roles');
      }
    });
  }

  update() {
    if (this.formGroup.valid) {
      const form = new User({
        name: this.formGroup.controls.name.value,
        password: this.formGroup.controls.password.value,
        gender: this.formGroup.controls.gender.value,
        birth: moment(this.formGroup.controls.birth.value).format('YYYYMMDD')
      });

      this._sandbox.updateUser(this.userId, form);
    }
  }

  getFormClasses(controlName: string): string {
    const control = this.formGroup.controls[controlName];
    if (control.value === '') {
      return '';
    }
    if (control.valid) {
      return 'is-valid';
    } else if (control.dirty && control.touched) {
      return 'is-invalid';
    }
  }

  addRole(event) {
    // if (this.loading) {
    //   this.notify.warn('Please wait for the previous request', 'Warning!');
    //   return;
    // }
    // this.addItem(this.getRoleByName(this.control.value, this.items));
  }

  /**
   *
   * @param roleName Name of the role to find
   * @param roles List of roles to look in
   * @returns Role object matching the given name
   */
  getRoleByName(roleName: string, roles: Role[]): Role {
    let role: Role;
    roles.every((r: Role) => {
      if (r.name === roleName) {
        role = r;
        return false;
      }
      return true;
    });
    return role;
  }

  // removeRole(index: number) {
  //   this.removeItem(index);
  // }

  isRoleListChanged(): boolean {
    return !ListHelper.compareListData(this.user.roles, this.userRoles, 'id');
  }

  isUserDataChanged(): boolean {
    if (
      this.formGroup.controls.name.value === '' &&
      this.formGroup.controls.password.value === '' &&
      this.formGroup.controls.gender.value === 'Gender...' &&
      this.formGroup.controls.birth.value === ''
    ) {
      return false;
    } else if (this.formGroup.controls.name.value === '') {
      return false;
    } else if (this.formGroup.controls.password.value === '') {
      return false;
    } else if (this.formGroup.controls.gender.value === 'Gender...') {
      return false;
    } else if (this.formGroup.controls.birth.value === '') {
      return false;
    } else {
      return true;
    }
  }

  getError = (e: any): string => {
    return this.formValidator.getErrorMessage(e);
  };
}
