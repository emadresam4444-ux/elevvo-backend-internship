import type { Request, Response, NextFunction } from "express";
declare const getUsers: (req: Request, res: Response, next: NextFunction) => void;
declare const getUser: (req: Request, res: Response, next: NextFunction) => void;
declare const addUser: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
declare const updateUser: (req: Request, res: Response, next: NextFunction) => void;
declare const deleteUser: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>>;
export { getUsers, getUser, addUser, updateUser, deleteUser };
//# sourceMappingURL=userController.d.ts.map