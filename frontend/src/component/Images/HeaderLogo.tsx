import LiveLink from "../Media/LiveLink.png"
const HeaderLogoStyles = "w-[4rem]";

export function HeaderLogo()
{
    return<>
        <img src={LiveLink} className={HeaderLogoStyles} alt="MainLogo" />
    </>
}