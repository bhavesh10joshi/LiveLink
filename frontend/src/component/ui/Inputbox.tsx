interface Inputboxstyles 
{
    size : "sm" | "md" | "lg" , 
    Reference ?: any ,
    placeholder ?: string , 
    color ?: string
};
const inputStyles = {
    "sm" : "" ,
    "md" : "w-[35rem] h-[2rem] p-[1rem]" ,
    "lg" : "w-[38rem] h-[3rem] p-[1rem] placeholder-black"
};
const defaultstyles:string = "rounded"; 

export function InputBox(props : Inputboxstyles)
{
    return <>
        <input placeholder={props.placeholder} ref={props.Reference} type="text" className={`${inputStyles[props.size]} ${defaultstyles} ${props.color}`} />
    </>
}