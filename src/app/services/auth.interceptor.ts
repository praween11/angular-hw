import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const user = localStorage.getItem('Token');
  var userData = user ? JSON.parse(user) : null;
  // Clone the request and add the authorization header
  req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${userData?.token}`
    }
  });

  // Pass the cloned request with the updated header to the next handler
  return next(req).pipe(catchError((err: any) => {
    if (err instanceof HttpErrorResponse) {
      // Handle HTTP errors
      if (err.status === 401) {
        // Specific handling for unauthorized errors         
        console.error('Unauthorized request:', err);
        localStorage.removeItem('Token');
        // You might trigger a re-authentication flow or redirect the user here
      } else {
        // Handle other HTTP error codes
        console.error('HTTP error:', err);
      }
    } else {
      // Handle non-HTTP errors
      console.error('An error occurred:', err);
    }

    // Re-throw the error to propagate it further
    return throwError(() => err); 
  }));
};
