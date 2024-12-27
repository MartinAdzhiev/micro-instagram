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
              // If photo exists, return true, otherwise false
              return !!photo;  // Ensures photo is truthy, meaning it exists
            }),
            catchError(() => of(false))  // If there's an error, return false (photo not found)
          );
    }
  
    return false;
  };