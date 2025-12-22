import { HttpInterceptorFn } from '@angular/common/http';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
    const apiUrl = 'http://localhost:3000';


    const apiReq = req.clone({
        url: req.url.startsWith('http') ? req.url : `${apiUrl}/${req.url}`
    });

    return next(apiReq);
};