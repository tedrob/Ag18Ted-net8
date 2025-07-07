import { CanActivateFn } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const adminGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const toast = inject(ToastrService);

  if (
    accountService.currentUser()?.roles.includes('Admin') ||
    accountService.currentUser()?.roles.includes('Moderator') ||
    (accountService.roles() as string[]).includes('Helper')
  ) {
    return true;
  } else {
    toast.error('You cannot enter this area');
    return false;
  }
};
