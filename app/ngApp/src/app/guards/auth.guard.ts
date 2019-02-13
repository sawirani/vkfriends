import { CanActivate, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { ConnectService } from "../services/connect.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private connectServ: ConnectService,
        private router: Router,
    ) {}

    canActivate() {
        if (!this.connectServ.isToken()) {
            this.router.navigate(['/app']);
            return false;
          } else {
            return true;
          }
    }
}
