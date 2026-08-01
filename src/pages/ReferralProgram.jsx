import ReferralHero from '../components/ReferralHero';
import ReferralForm from '../components/ReferralForm';
import ReferralEarnings from '../components/ReferralEarnings';
import ReferralSteps from '../components/ReferralSteps';
import ReferralBenefits from '../components/ReferralBenefits';
import ReferralFAQ from '../components/ReferralFAQ';
import Button from '../components/Button';

function ReferralProgram() {
  return (
    <main className="page referral-page">
      <div className="container">
        <ReferralHero />

        <div className="referral-grid">
          <div className="referral-column">
            <ReferralForm />
            <div style={{ marginTop: '1rem' }}>
              <ReferralEarnings />
            </div>
          </div>

          <div className="referral-column">
            <ReferralSteps />
            <div style={{ marginTop: '1rem' }}>
              <ReferralBenefits />
            </div>
            <div style={{ marginTop: '1rem' }}>
              <ReferralFAQ />
            </div>
          </div>
        </div>

        <section className="referral-cta">
          <div>
            <p className="eyebrow">Become a partner</p>
            <h3>Turn warm introductions into recurring revenue.</h3>
            <p>Join the GrowthPilot AI referral network and help ambitious companies scale faster.</p>
          </div>
          <Button variant="primary">Start earning today</Button>
        </section>
      </div>
    </main>
  );
}

export default ReferralProgram;
