import { Injectable } from '@angular/core';
import { WhereItem } from '@cartesianui/core';

@Injectable()
export class SearchUserForm {
  name: WhereItem = { column: 'name', operator: '=', value: null };
  email: WhereItem = { column: 'email', operator: '=', value: null };
}
