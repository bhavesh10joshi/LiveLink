import { z } from "zod" ; 

//zod inference
export const UserObject = z.object({
    email : z.string().includes('@') ,
    password : z.string().min(3,{message : "The password should be atleast 5 characters long"})
});
export type SignUpInput = z.infer<typeof UserObject>;

//zod inference for upadting password 
export const passwordObject = z.object({
    password : z.string().min(3,{message : "The password should be atleast 3 characters long"})
});
export type passInput = z.infer<typeof passwordObject>;