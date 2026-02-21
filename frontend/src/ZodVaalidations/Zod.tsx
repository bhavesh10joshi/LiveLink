import { z } from "zod" ; 

//zod inference
export const Validations = z.object({
    email : z.string().includes('@') ,
    password : z.string().min(10).regex(/[0-9]/,{message : "The password should contain atleast one number"}) 
                .regex(/[a-z]/,{message : "The password should contain atleast one char"})
});
