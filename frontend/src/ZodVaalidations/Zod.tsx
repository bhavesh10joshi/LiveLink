import { z } from "zod" ; 

//zod inference
export const Validations = z.object({
    Email : z.string().includes('@') ,
    Password : z.string().min(10).regex(/[0-9]/,{message : "The password should contain atleast one number"}) 
                .regex(/[a-zA-Z]/,{message : "The password should contain atleast one char"})
});
