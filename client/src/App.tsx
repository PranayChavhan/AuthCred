import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import EmployeeVerification from "./pages/EmployeeVerification/EmployeeVerification";
import ReportsAndAnalytics from "./pages/ReportsAndAnalytics/ReportsAndAnalytics";
import Notification from "./pages/Notification/Notification";
import ProtectedRoute from "./ProtectedRoute";
import EmployeeForm from "./pages/EmployeeForm/EmployeeForm";
import EmployeeDetails from "./pages/EmployeeDetails/EmployeeDetails";
import VerificationPage from "./pages/VerificaationPage/VerificationPage";


export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
        
          {/* Dashboard Layout */}
          <Route path="/form/:id" element={<EmployeeForm/>} />

          <Route path="/:institute/:id" element={<VerificationPage/>} />
          
          <Route element={<ProtectedRoute />}>
          
          
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />
            
            <Route index path="/verification" element={<EmployeeVerification/>} />
            <Route index path="/analytics" element={<ReportsAndAnalytics/>} />
            <Route index path="/notification" element={<Notification/>} />
            {/* Others Page */}
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/employee/:id" element={<EmployeeDetails/>} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />

            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />

            {/* Tables */}
            <Route path="/basic-tables" element={<BasicTables />} />

            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />

            {/* Charts */}
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Route>
          </Route>




          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
