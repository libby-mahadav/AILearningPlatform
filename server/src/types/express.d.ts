import * as express from 'express';
import { User } from '../models/User'; // ודאי שהנתיב למודל המשתמש שלך נכון

declare global {
  namespace Express {
    interface Request {
      user: any; // נוכל לשנות לטיפוס המדויק אחרי שהשרת יעלה
    }
  }
}