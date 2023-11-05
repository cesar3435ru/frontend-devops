import { CanActivateFn } from '@angular/router';

export const agremiadoGuard: CanActivateFn = (route, state) => {
  return true;
};
