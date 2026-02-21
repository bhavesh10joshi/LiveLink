import './App.css'
import { IntroPage } from './Pages/Intropage'
import { PricingPage } from './Pages/PricingPage'
import { SecurityPage } from './Pages/SecurityPage'
import { FeaturesPage } from './Pages/FeaturesPage'
import { CreateAccount } from './Pages/CreateAnAccount'
import { SignInPage } from './Pages/SignInPage'
import { SuccessCreatedAccount } from './Pages/SuccessCreatedAccount'
import { UserToGroupChatDashboard } from './Components/ChattingDashboards/UserToGroupChatDashboard'
import { MainDashboard } from './Pages/MainDashboard'
import {BrowserRouter , Routes , Route , Link , useNavigate} from "react-router-dom"

function App() {
  return <>
    <BrowserRouter>
      <Routes>
        <Route path="/LiveLink/Introduction" element={<IntroPage/>}/>
        <Route path="/LiveLink/Application/Pricing" element={<PricingPage/>}/>
        <Route path="/LiveLink/Application/Security" element={<SecurityPage/>}/>
        <Route path="/LiveLink/Features" element={<FeaturesPage/>}/>
        <Route path="/LiveLink/User/Create/Account" element={<CreateAccount/>}/>
        <Route path="/LiveLink/User/SignIn" element={<SignInPage/>}/>
        <Route path="/LiveLink/User/Dashboard/Chat" element={<MainDashboard/>}/>
        <Route path="/LiveLink/Created/Account/Success" element={<SuccessCreatedAccount/>}/>
      </Routes>
    </BrowserRouter>
  </>
}

export default App
