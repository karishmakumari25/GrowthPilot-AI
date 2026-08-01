import ContactInfoCard from '../ContactInfoCard';

const details = [
  { icon: '✉️', title: 'Email us', value: 'hello@growthpilot.ai', caption: 'Replies within 1 business day' },
  { icon: '📞', title: 'Call us', value: '+91 98765 43210', caption: 'Mon–Fri • 9:00 AM to 7:00 PM' },
  { icon: '📍', title: 'Visit us', value: 'Block 18, Business Bay, Bengaluru, India', caption: 'Office address placeholder' },
  { icon: '🕒', title: 'Business hours', value: 'Monday – Friday', caption: '9:00 AM to 7:00 PM' },
];

function ContactDetails() {
  return (
    <section className="contact-details">
      <div className="info-grid">
        {details.map((item) => (
          <ContactInfoCard key={item.title} {...item} />
        ))}
      </div>
    </section>
  );
}

export default ContactDetails;
