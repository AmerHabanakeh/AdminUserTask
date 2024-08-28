import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';



export const adminGuard: CanActivateChildFn = (childRoute, state) => {


  let router = inject(Router)

  if ('token' in localStorage) {
    return true;
  }
  else {
    router.navigate(['/login']);
    return false;
  }
};
