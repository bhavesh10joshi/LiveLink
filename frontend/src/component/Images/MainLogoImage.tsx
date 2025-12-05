import logoSignoinup from "../Media/logoSignoinup.png"
const MainLogoStyles = "w-[91rem]";

export function MainLogo()
{
    return<>
        <img src={logoSignoinup} className={MainLogoStyles} alt="MainLogo" />
    </>
}