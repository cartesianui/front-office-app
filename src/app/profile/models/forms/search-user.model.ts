import { Injectable } from '@angular/core';
import { WhereItem } from '@cartesianui/ng-axis';

@Injectable()
export class SearchUserForm {
  name: WhereItem = { column: 'name', operator: '=', value: null };
  email: WhereItem = { column: 'email', operator: '=', value: null };
}
