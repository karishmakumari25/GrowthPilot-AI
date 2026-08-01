function ContactInfoCard({ icon, title, value, caption }) {
  return (
    <article className="contact-info-card">
      <div className="contact-info-card__icon">{icon}</div>
      <div>
        <h3>{title}</h3>
        <p>{value}</p>
        {caption && <span>{caption}</span>}
      </div>
    </article>
  );
}

export default ContactInfoCard;
