import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService, GET, Body, DefaultHeaders, Path, PATCH, Criteria, RequestCriteria } from '@cartesianui/core';
import { User } from './models/entities/user.model';
import { SearchUserForm } from './models';

@Injectable()
@DefaultHeaders({
  Accept: 'application/json',
  'Content-Type': 'application/json'
})
export class ProfileHttpService extends HttpService {
  /**
   * Update user
   *
   * @param id id of the user to update
   * @param data data of the user to update
   */
  @PATCH('/users/{id}')
  public updateUser(@Path('id') id: string, @Body form: User): Observable<any> {
    return null;
  }

  /**
   * Fetch user details
   *
   * @param id Id of the user to fetch
   */
  @GET('/users/{id}')
  public user(@Path('id') id: string): Observable<any> {
    return null;
  }

  /**
   * Fetch user details based on a criteria
   *
   * @param id Id of the user to fetch
   * @param criteria Request Criteria to filter response
   */
  @GET('/users/{id}')
  public filteredUser(@Path('id') id: string, @Criteria criteria: RequestCriteria<SearchUserForm>): Observable<any> {
    return null;
  }

  /**
   * Fetch authenticated user details
   *
   */
  @GET('/user/profile')
  public profile(@Body token: string): Observable<any> {
    return null;
  }
}
