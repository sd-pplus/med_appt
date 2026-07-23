import './ReportsLayout.css';

const reports = [
  {
    id: 1,
    doctorName: 'Dr. John Doe',
    speciality: 'Cardiology',
  },
  {
    id: 2,
    doctorName: 'Dr. Jane Smith',
    speciality: 'Dermatology',
  },
];

const REPORT_URL = `${import.meta.env.BASE_URL}patient_report.pdf`;

const ReportsLayout = () => {
  return (
    <div className="reports-page">
      <h1 className="reports-page__title">Reports</h1>

      <div className="reports-table-wrapper">
        <table className="reports-table">
          <thead>
            <tr>
              <th>Serial Number</th>
              <th>Doctor Name</th>
              <th>Doctor Speciality</th>
              <th>View Report</th>
              <th>Download Report</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td>{report.id}</td>
                <td>{report.doctorName}</td>
                <td>{report.speciality}</td>
                <td>
                  <a
                    className="reports-btn"
                    href={REPORT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Report
                  </a>
                </td>
                <td>
                  <a
                    className="reports-btn"
                    href={REPORT_URL}
                    download="patient_report.pdf"
                  >
                    Download Report
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportsLayout;
