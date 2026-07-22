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

const REPORT_URL = '/patient_report.pdf';

const ReportsLayout = () => {
  const openReportInNewTab = () => {
    window.open(REPORT_URL, '_blank', 'noopener,noreferrer');
  };

  const downloadReport = () => {
    const link = document.createElement('a');
    link.href = REPORT_URL;
    link.download = 'patient_report.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
                  <button
                    type="button"
                    className="reports-btn"
                    onClick={openReportInNewTab}
                  >
                    View Report
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="reports-btn"
                    onClick={downloadReport}
                  >
                    Download Report
                  </button>
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
