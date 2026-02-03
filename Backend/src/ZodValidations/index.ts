import { z } from "zod" ; 

//zod inference
export const UserObject = z.object({
    email : z.string().includes('@') ,
    password : z.string().min(10).regex(/[0-9]/,{message : "The password should contain atleast one number"}) 
                .regex(/[a-z]/,{message : "The password should contain atleast one char"})
});
export type SignUpInput = z.infer<typeof UserObject>;

//zod inference for upadting password 
export const passwordObject = z.object({
    password : z.string().min(10).regex(/[0-9]/,{message : "The password should contain atleast one number"}) 
                .regex(/[a-z]/,{message : "The password should contain atleast one char"})
});
export type passInput = z.infer<typeof passwordObject>;