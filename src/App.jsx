import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dashboard from "./components/Personal_Assistant/Dashbord/Dashbord.jsx"
import Side_bar from './components/Personal_Assistant/PA-Side-bar/Side-bar.jsx'
// import NewPatient from './components/Personal_Assistant/NewPatientRegister/NewPatientRegister.jsx'
import NewPatient from './components/Personal_Assistant/NewPatientRegister/NewPatientRegister.jsx'
import Initialassessment from './components/Personal_Assistant/Initial_Assessment/Initial_Assessment.jsx'
import PA_setting from './components/Personal_Assistant/PA_settings/PA_settings.jsx'
import PatientHistory from './components/Personal_Assistant/Patient_History/Patient_History.jsx'
import { Route, Routes, BrowserRouter } from 'react-router-dom'


function App() {
  const [count, setCount] = useState(0)

  return (
      <Routes>
        <Route path='/' element={<Side_bar />}>
        <Route index='dashboard' element={<Dashboard />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='new_patientregister' element={<NewPatient />} />
        <Route path='pa_initial_assessment' element={<Initialassessment />} />
        <Route path='pa_setting' element={<PA_setting />} />
        <Route path='patienthistory' element={<PatientHistory />} />
        </Route>

       {/* difine component Route */}

      </Routes>
  
  )
}

export default App

