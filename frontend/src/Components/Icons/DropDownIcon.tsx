interface Props{
    onClick : ()=>void
};
const deafultStyles:String = "bg-blue-800 w-10 h-10 rounded flex justify-center items-center hover:shadow-blue-800/80";
export function Drop(props:Props)
{
    return <>
    <button  onClick={props.onClick} className={`${deafultStyles}`} aria-label="Open menu">
                <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M3 5H21" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3 12H21" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3 19H21" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
    </button>
    </>
}