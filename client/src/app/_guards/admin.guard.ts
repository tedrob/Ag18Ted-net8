import { CanActivateFn } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const adminGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const toastr = inject(ToastrService);

  if (
    (accountService.roles() as string[]).includes('Admin') ||
    (accountService.roles() as string[]).includes('Moderator') ||
    (accountService.roles() as string[]).includes('Helper')
  ) {
    return true;
  } else {
    toastr.error('You cannot enter this area');
    return false;
  }
};
