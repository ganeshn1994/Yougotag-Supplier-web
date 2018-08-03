//uncomment after check below is working code

import { Injectable } from '@angular/core';
import { HttpRequest,HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';



// @Injectable()
// export class I1 implements HttpInterceptor {
//     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         let deviceId = localStorage.getItem('deviceId')
//         const mHeaderClone = req.clone({setHeaders: {'X-com-ygt-device-id': ''}});
//         console.log("mHeaderClone:"+ JSON.stringify(mHeaderClone));
//         return next.handle(mHeaderClone);
//     }
// }

@Injectable()
export class I1 implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let deviceId = sessionStorage.getItem('deviceId')
        let XdeviceId = req.clone({ headers: req.headers.set('X-com-ygt-device-id', deviceId) });
        // console.log(JSON.stringify(req.headers));
        return next.handle(XdeviceId);

       
    }
}

@Injectable()
export class I2 implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authToken = sessionStorage.getItem('authToken');
        if(authToken == null && authToken == undefined){
        let mHeaderClone = req.clone({setHeaders: {'X-com-ygt-auth-token':''}});
        // console.log("mHeaderClone1:"+ JSON.stringify(mHeaderClone));
        return next.handle(mHeaderClone);
    }else{
        let mHeaderClone = req.clone({setHeaders: {'X-com-ygt-auth-token':authToken}});
        // console.log("mHeaderClone1:"+ JSON.stringify(mHeaderClone));
        return next.handle(mHeaderClone);
    }
}
}

@Injectable()
export class I3 implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let loginId = sessionStorage.getItem('loginId');
        if(loginId == null && loginId == undefined){
        const mHeaderClone = req.clone({setHeaders: {'X-com-ygt-login-id': ''}});
        // console.log("mHeaderClone2:"+ JSON.stringify(mHeaderClone));
        return next.handle(mHeaderClone);
    }else{
        const mHeaderClone = req.clone({setHeaders: {'X-com-ygt-login-id': loginId}});
        // console.log("mHeaderClone2:"+ JSON.stringify(mHeaderClone));
        return next.handle(mHeaderClone);
    }
}
}

@Injectable()
export class I4 implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const modified = req.clone({setHeaders: {'X-com-ygt-ip-address': ''}});
        return next.handle(modified);
    }
}

@Injectable()
export class I5 implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const modified = req.clone({setHeaders: {'X-com-ygt-lattitude': ''}});
        return next.handle(modified);
    }
}


@Injectable()
export class I8 implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let tenantid = localStorage.getItem('tenantid');
        console.log('tenantIdAuth:'+ tenantid);
        if(tenantid == null && tenantid == undefined){
        const modified = req.clone({setHeaders: {'X-com-ygt-tenant-id': ''}});
        return next.handle(modified);
        }else if(tenantid == localStorage.getItem('tenantid')){
            console.log('tenantId:'+ sessionStorage.getItem('tenantid'));
            const modified = req.clone({setHeaders: {'X-com-ygt-tenant-id': tenantid}});
        return next.handle(modified);
         }
    }
}

@Injectable()
export class I6 implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const modified = req.clone({setHeaders: {'X-com-ygt-logitude': ''}});
        return next.handle(modified);
    }
}

@Injectable()
export class I7 implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const modified = req.clone({setHeaders: {'Content-Type': 'application/json'}});
        return next.handle(modified);
    }
}


// @Injectable()
// export class AuthInterceptor implements HttpInterceptor{

//     constructor(private api:ApiService){}

//     intercept(req: HttpRequest<any>,next: HttpHandler):Observable<HttpEvent<any>>{
//         console.log("Hi i am interceptor");
//         console.log(req);
//         var authToken = localStorage.getItem('authToken');
//         console.log("authTokeninterceptor:" + authToken);
//         const authReq = req.clone({setHeaders: {'X-com-ygt-auth-token': authToken}});
//         return next.handle(authReq);
//     }
// }
