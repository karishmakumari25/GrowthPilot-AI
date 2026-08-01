import Card from '../Card';
import Loader from '../Loader';

const scoreCards = [
  { key: 'overall', label: 'Overall Business Score', icon: '📈' },
  { key: 'website', label: 'Website Quality', icon: '🖥️' },
  { key: 'seo', label: 'SEO Score', icon: '🔎' },
  { key: 'mobile', label: 'Mobile Friendliness', icon: '📱' },
  { key: 'performance', label: 'Performance Score', icon: '⚡' },
  { key: 'social', label: 'Social Media Presence', icon: '📣' },
  { key: 'gbp', label: 'Google Business Profile', icon: '📍' },
  { key: 'content', label: 'Content Quality', icon: '✍️' },
];

const recommendationCards = [
  { key: 'strengths', label: 'Strengths', icon: '✅' },
  { key: 'weaknesses', label: 'Weaknesses', icon: '⚠️' },
  { key: 'opportunities', label: 'Opportunities', icon: '💡' },
  { key: 'threats', label: 'Threats', icon: '🛡️' },
];

const suggestions = [
  { key: 'website', label: 'Website Improvements', icon: '🛠️' },
  { key: 'seo', label: 'SEO Improvements', icon: '🔍' },
  { key: 'marketing', label: 'Marketing Recommendations', icon: '📢' },
  { key: 'leads', label: 'Lead Generation Ideas', icon: '🎯' },
];

function CompetitorReport({ report, loading }) {
  if (loading) {
    return (
      <section className="competitor-report competitor-report--loading">
        <Loader />
        <h3>Analyzing the competitor landscape...</h3>
        <p>We are reviewing digital signals, positioning, and growth opportunities.</p>
      </section>
    );
  }

  if (!report) {
    return null;
  }

  return (
    <section className="competitor-report">
      <div className="report-header">
        <div>
          <p className="eyebrow">Competitive insight</p>
          <h2>{report.competitorName} Analysis</h2>
          <p>{report.summary}</p>
        </div>
        <span className="report-badge">AI Review Ready</span>
      </div>

      <div className="report-grid report-grid--four">
        {scoreCards.map((item) => (
          <Card key={item.key} title={item.label}>
            <div className="metric-pill">{item.icon}</div>
            <p className="metric-value">{report[item.key]}</p>
          </Card>
        ))}
      </div>

      <div className="report-grid report-grid--two">
        {recommendationCards.map((item) => (
          <Card key={item.key} title={item.label}>
            <div className="metric-pill">{item.icon}</div>
            <p>{report[item.key]}</p>
          </Card>
        ))}
      </div>

      <div className="report-grid report-grid--two">
        {suggestions.map((item) => (
          <Card key={item.key} title={item.label}>
            <div className="metric-pill">{item.icon}</div>
            <p>{report[item.key]}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default CompetitorReport;
