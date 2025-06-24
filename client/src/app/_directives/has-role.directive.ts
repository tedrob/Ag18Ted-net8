import { Directive, inject, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/user';

@Directive({
  selector: '[appHasRole]', //*appHasRole
  standalone: true
})
export class HasRoleDirective implements OnInit {
  @Input() appHasRole: string[] = [];
  private accountService = inject(AccountService);
  private viewContainerRef = inject(ViewContainerRef);
  private templateRef = inject(TemplateRef);
  user: User = {} as User;

  constructor () {
    const user = this.accountService.currentUser();
    if (user) {
      this.user = user;
    }
    // No need to use .pipe() with WritableSignal; initialization logic can go here if needed
  }

  ngOnInit(): void {

      if (this.accountService.roles()?.some((r: string) => this.appHasRole.includes(r))) {
        this.viewContainerRef.createEmbeddedView(this.templateRef)
      } else {
        this.viewContainerRef.clear();
      }
  }
}
