import { CanActivateFn } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const toast = inject(ToastrService);
  // Check if the user is logged in
  if (accountService.currentUser()) return true;
  else {
    toast.error('You shall not pass!');
    return false;
  }
};
