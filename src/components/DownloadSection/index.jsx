function DownloadSection() {
  return (
    <section className="dashboard-panel">
      <div className="dashboard-panel__head">
        <h3>Download Section</h3>
      </div>
      <div className="download-list">
        <div className="download-item">
          <div>
            <h4>PDF Reports</h4>
            <p>Quarterly strategy reports and export-ready insights.</p>
          </div>
          <a href="/dashboard">Download</a>
        </div>
        <div className="download-item">
          <div>
            <h4>Analysis History</h4>
            <p>Review all completed business and competitor analyses.</p>
          </div>
          <a href="/dashboard">Open</a>
        </div>
      </div>
    </section>
  );
}

export default DownloadSection;
