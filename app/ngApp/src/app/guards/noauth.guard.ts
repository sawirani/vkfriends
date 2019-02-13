import {CanActivate, Router} from '@angular/router';
import { Injectable } from "@angular/core";
import { ConnectService } from "../services/connect.service";

@Injectable()
export class NoAuthGuard implements CanActivate {

    constructor(
        private connectServ: ConnectService,
        private router: Router
    ){}

    canActivate() {
        if (this.connectServ.isToken()) {
            this.router.navigate(['/app/users']);
            return false;
          } else {
            return true;
          }
    }

}