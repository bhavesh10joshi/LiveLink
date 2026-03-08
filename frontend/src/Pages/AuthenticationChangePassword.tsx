import { ConfirmPasswordChange } from "./ConfirmPasswordChange"

interface AuthStyle
{
    SetChangePasswordFunction : ()=>void
}

export function EmailAuthChangePassword(props:AuthStyle)
{
    return<>
        <ConfirmPasswordChange SetChangePasswordFunction={() => props.SetChangePasswordFunction()}/> 
    </>
}