import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom'

//  PA_Pages
import Pa_Side_bar from './components/Personal_Assistant/PA-Side-bar/Side-bar.jsx'
import Pa_Dashboard from "./components/Personal_Assistant/Dashbord/Dashbord.jsx"
import NewPatient from './components/Personal_Assistant/NewPatientRegister/NewPatientRegister.jsx'
import Initialassessment from './components/Personal_Assistant/Initial_Assessment/Initial_Assessment.jsx'
import PA_setting from './components/Personal_Assistant/PA_settings/PA_settings.jsx'
import PatientHistory from './components/Personal_Assistant/Patient_History/Patient_History.jsx'


// Doctor_Pages
import Dr_Side_bar from './components/Doctor/Dr_sidebar/Dr_sidebar.jsx'
import Dr_Dashboard from './components/Doctor/Dr_Dashboard/Dashboard.jsx'
import Consultation_Queue from './components/Doctor/Dr_Consultation_Queue/Consultation_Queue.jsx'
import PatientRecords from './components/Doctor/Dr_Patient_Record/Patient_Record.jsx'
import PrescriptionManagement from './components/Doctor/Dr_Priscription/Priscription.jsx'
import Settings from './components/Doctor/Dr_Settings/Settings.jsx'


//Medical_Director
import MD_side_bar from "./components/Medical_Director/MD_Side_bar/md_side_bar.jsx"


// Login page
import Loginpage from './components/Loginpage/LoginPage.jsx'
import RedirectToDashboard from './components/Handler.jsx'


function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>

      {/* Loginpage-Routes */}
      <Route path='/' element={<RedirectToDashboard></RedirectToDashboard>}></Route>
      <Route path='/login' element={<Loginpage />}></Route>

      {/* PA-Routes */}
      <Route path='/pa' element={<Pa_Side_bar />}>
        <Route index='dashboard' element={<Pa_Dashboard />} />
        <Route path='dashboard' element={<Pa_Dashboard />} />
        <Route path='new_patientregister' element={<NewPatient />} />
        <Route path='pa_initial_assessment' element={<Initialassessment />} />
        <Route path='pa_setting' element={<PA_setting />} />
        <Route path='patienthistory' element={<PatientHistory />} />
      </Route>

      {/* Dr-Routes */}
      <Route path='/dr' element={<Dr_Side_bar />}>

        <Route index element={<Dr_Dashboard />} />
        <Route path='dashboard' element={<Dr_Dashboard />} />
        <Route path='consultation_Queue' element={<Consultation_Queue />} />
        <Route path='patientRecord' element={<PatientRecords />} />
        <Route path='prescription' element={<PrescriptionManagement />} />
        <Route path='setting' element={<Settings />} />

      </Route>

      {/* MD-Routes */}
      {/* <Route index element={<Dr_Dashboard/>}/>
         <Route path='Dr_dashboard' element={<Dr_Dashboard/>}/>
         <Route path='Consultation_Queue' element={<Consultation_Queue/>}/>
         <Route path='PatientRecord' element={<PatientRecords/>}/>
         <Route path='Prescription' element={<PrescriptionManagement/>}/>
         <Route path='Setting' element={<Settings/>}/> */}



    </Routes>

  )
}

export default App

