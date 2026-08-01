/**
 * Generic card component used across sections.
 */
function Card({ title, children }) {
  return (
    <article className="card">
      {title && <h3>{title}</h3>}
      {children}
    </article>
  );
}

export default Card;
