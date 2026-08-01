import Card from '../Card';
import Loader from '../Loader';

const reportSections = [
  {
    key: 'healthScore',
    title: 'Business Health Score',
    icon: '📊',
    render: (report) => (
      <div className="report-score">
        <div className="report-score__ring">
          <span>{report.healthScore}</span>
        </div>
        <p>{report.healthSummary}</p>
      </div>
    ),
  },
  {
    key: 'swot',
    title: 'SWOT Analysis',
    icon: '🧭',
    render: (report) => (
      <div className="report-grid report-grid--two">
        {report.swot.map((item) => (
          <div className="report-block" key={item.title}>
            <h4>{item.title}</h4>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    key: 'recommendations',
    title: 'Recommendations',
    icon: '💡',
    render: (report) => (
      <div className="report-grid report-grid--three">
        {report.recommendations.map((item) => (
          <div className="report-block" key={item.title}>
            <h4>{item.title}</h4>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    key: 'timeline',
    title: '30-60-90 Day Action Plan',
    icon: '🗓️',
    render: (report) => (
      <div className="timeline-list">
        {report.timeline.map((item) => (
          <div className="timeline-item" key={item.phase}>
            <strong>{item.phase}</strong>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    ),
  },
];

function AnalyzerReport({ report, loading }) {
  if (loading) {
    return (
      <div className="analyzer-report analyzer-report--loading">
        <Loader />
        <h3>Generating your AI business report...</h3>
        <p>We are analyzing your business profile, growth opportunities, and positioning insights.</p>
      </div>
    );
  }

  if (!report) {
    return null;
  }

  return (
    <section className="analyzer-report">
      <div className="report-header">
        <div>
          <p className="eyebrow">AI business intelligence</p>
          <h2>{report.businessName} Report</h2>
          <p>{report.summary}</p>
        </div>
        <div className="report-badge">Ready for action</div>
      </div>

      <div className="report-sections">
        {reportSections.map((section) => (
          <Card key={section.key} title={section.title}>
            <div className="report-section-icon">{section.icon}</div>
            {section.render(report)}
          </Card>
        ))}
      </div>
    </section>
  );
}

export default AnalyzerReport;
