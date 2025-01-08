import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from "@angular/router";
import { PhotoService } from "../services/photo.service";
import { catchError, map, of } from "rxjs";

export const routeGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    const id = route.paramMap.get('id');

    if(!isNaN(Number(id))){
        const photoService = inject(PhotoService)

        return photoService.getPhoto(Number(id)).pipe(
            map(photo => {
              return !!photo;
            }),
            catchError(() => of(false))
          );
    }
  
    return false;
  };