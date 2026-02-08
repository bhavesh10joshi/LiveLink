interface DotStyle{
    Status : "Online" | "Offline"
}
export function StatusDot(props:DotStyle)
{
    return<>
        {
            props.Status == "Online" 
            ?<svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 122.88 122.88"
                width="122px" 
                height="122px"
            >
            <g>
            <path
            fillRule="evenodd"
            clipRule="evenodd"
            fill="#6BBE66"
            d="M61.44,0c33.93,0,61.44,27.51,61.44,61.44c0,33.93-27.51,61.44-61.44,61.44C27.51,122.88,0,95.37,0,61.44 C0,27.51,27.51,0,61.44,0L61.44,0z"
            />
            </g>
            </svg> 
            :<svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 122.88 122.88"
            >   
            <g>
            <path
            fillRule="evenodd"
            clipRule="evenodd"
            fill="#6BBE66"
            d="M61.44,0c33.93,0,61.44,27.51,61.44,61.44c0,33.93-27.51,61.44-61.44,61.44C27.51,122.88,0,95.37,0,61.44 C0,27.51,27.51,0,61.44,0L61.44,0z"
            />
            </g>
            </svg>
        }
    </>
}