import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Dashbord.css"
import { faClipboard, faClipboardList, faEdit, faEye, faFolder, faList, faSyncAlt, faUserMd, faUserPlus } from "@fortawesome/free-solid-svg-icons";
function Personalassitant() {

  return (
    <div className="section active" id="dashboardSection">
      {/* UPDATED: Date Filter */}
      <div className="date-filter">
        <h3>Dashboard Overview</h3>
        <div className="filter-controls">
          <input type="date" className="date-input" id="startDate" defaultValue="2023-10-01" />
          <span>to</span>
          <input type="date" className="date-input" id="endDate" defaultValue="2023-10-15" />
          <button className="filter-btn" id="applyFilterBtn">
            <i className="fas fa-filter"></i> Apply Filter
          </button>
        </div>
      </div>

      {/* UPDATED: Dashboard Cards - Smaller */}
      <div className="dashboard-cards">
        <div className="card" id="newPatientCard">
          <div className="card-header">
            <div className="card-alignment">
              <div className="card-count">12</div>
              <div className="card-title">New Patients Today</div>
            </div>
            <div className="card-icon patient">
              <FontAwesomeIcon icon={faUserPlus} />
            </div>
          </div>
          <div className="card-trend">+2 from yesterday</div>
        </div>

        <div className="card" id="pendingAssessmentsCard">
          <div className="card-header">
            <div className="card-alignment">
              <div className="card-count">8</div>
              <div className="card-title">Pending Assessments</div>
            </div>
            <div className="card-icon assessment">
              <FontAwesomeIcon icon={faClipboardList} />
            </div>
          </div>
          <div className="card-trend down">-3 from yesterday</div>
        </div>

        <div className="card" id="patientRecordsCard">
          <div className="card-header">
            <div className="card-alignment">
              <div className="card-count">142</div>
              <div className="card-title">Total Patient Records</div>
            </div>
            <div className="card-icon records">
              <FontAwesomeIcon icon={faFolder} />
            </div>
          </div>
          <div className="card-trend">+12 this week</div>
        </div>

        <div className="card" id="doctorQueueCard">
          <div className="card-header">
            <div className="card-alignment">
              <div className="card-count">5</div>
              <div className="card-title">In Doctor Queue</div>
            </div>
            <div className="card-icon queue">
              <FontAwesomeIcon icon={faUserMd} />
            </div>
          </div>
          <div className="card-trend">+1 in queue</div>
        </div>
      </div>

      {/* UPDATED: Recent Patients Table */}
      <div className="recent-patients">
        <div className="recent-patients-header">
          <h2 className="recent-patients-title">Recent Patient Registrations</h2>
          <button style={{ display: "flex", gap: "5px" }} className="view-all-btn" id="viewAllPatientsBtn">
            <FontAwesomeIcon icon={faList} />
            View All
          </button>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Patient ID</th>
                <th>Patient Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Registration Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="recentPatientsTable">
              {/* Added Static Data Rows */}
              <tr>
                <td>PID-1001</td>
                <td>Rajesh Kumar</td>
                <td>45</td>
                <td>Male</td>
                <td>09:30 AM</td>
                <td><span className="status-badge active">Active</span></td>
                <td className="action-handler">
                  <button className="action-btn"><FontAwesomeIcon icon={faEdit} />Edit</button>
                  <button className="action-btn"><FontAwesomeIcon icon={faEye} />view</button>
                </td>              </tr>
              <tr>
                <td>PID-1002</td>
                <td>Suman Singh</td>
                <td>32</td>
                <td>Female</td>
                <td>10:15 AM</td>
                <td><span className="status-badge pending">Pending</span></td>
                <td className="action-handler">
                  <button className="action-btn"><FontAwesomeIcon icon={faEdit} />Edit</button>
                  <button className="action-btn"><FontAwesomeIcon icon={faEye} />view</button>
                </td>
              </tr>
              <tr>
                <td>PID-1003</td>
                <td>Amit Sharma</td>
                <td>28</td>
                <td>Male</td>
                <td>11:00 AM</td>
                <td><span className="status-badge completed">Completed</span></td>
                <td className="action-handler">
                  <button className="action-btn"><FontAwesomeIcon icon={faEdit} />Edit</button>
                  <button className="action-btn"><FontAwesomeIcon icon={faEye} />view</button>
                </td>              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Doctor Queue Section */}
      <div className="section active">
        <div className="section-header">
          <h2 className="section-title">Doctor Consultation Queue</h2>
          <button className="btn btn-outline" id="refreshQueueBtn">
            <i className="fas fa-sync-alt"></i>
            <FontAwesomeIcon icon={faSyncAlt} />
            Refresh Queue
          </button>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Queue No.</th>
                <th>Patient Name</th>
                <th>Doctor Assigned</th>
                <th>Chief Complaint</th>
                <th>Wait Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody id="doctorQueueTable">
              {/* Added Static Data Rows */}
              <tr>
                <td>01</td>
                <td>Vikram Malhotra</td>
                <td>Dr. A. Gupta</td>
                <td>Fever & Headache</td>
                <td>15 mins</td>
                <td><span className="queue-status waiting">Waiting</span></td>
              </tr>
              <tr>
                <td>02</td>
                <td>Priya Desai</td>
                <td>Dr. S. Khan</td>
                <td>Back Pain</td>
                <td>5 mins</td>
                <td><span className="queue-status in-consultation">With Doctor</span></td>
              </tr>
              <tr>
                <td>03</td>
                <td>Rahul Verma</td>
                <td>Dr. A. Gupta</td>
                <td>Cough / Cold</td>
                <td>20 mins</td>
                <td><span className="queue-status waiting">Waiting</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

}

export default Personalassitant;