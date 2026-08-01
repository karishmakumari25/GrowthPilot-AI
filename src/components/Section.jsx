function Section({ title, subtitle, children, className = '' }) {
  return (
    <section className={`section ${className}`.trim()}>
      <div className="container">
        <div className="section-heading">
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

export default Section;
