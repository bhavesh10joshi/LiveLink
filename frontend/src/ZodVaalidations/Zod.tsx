import { z } from "zod" ; 

//zod inference
export const Validations = z.object({
    Email : z.string().includes('@') ,
    Password : z.string().min(3,{message : "The password should be atleast 3 characters long"})
});
