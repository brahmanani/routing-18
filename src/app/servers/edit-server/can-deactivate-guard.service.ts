import { Observable } from "rxjs/Observable";
import { CanDeactivate,ActivatedRouteSnapshot } from "@angular/router";
import { RouterStateSnapshot } from "@angular/router/src/router_state";


export interface CanCamponentDeactivate {
    canDeactivate:()=> Observable<boolean> | Promise<boolean> | boolean;
}

export class CanDeactivateGuard implements CanDeactivate<CanCamponentDeactivate> {
    canDeactivate(component:CanCamponentDeactivate,
    currentRoute:ActivatedRouteSnapshot,
    currentState:RouterStateSnapshot,
    nextState?:RouterStateSnapshot):Observable<boolean> | Promise<boolean> | boolean{
        return component.canDeactivate();
    }
}