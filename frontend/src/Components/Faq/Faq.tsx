interface style{
    Question : String ,
    Answer : String 
} 
export function question(props:style)
{
    return <>
        <div>
            <div>{props.Question}</div>
            <div>{props.Answer}</div>
        </div>
    </>
}