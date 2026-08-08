import './PageContent.css'

export default function PageContent({ title, description }) {
  return (
    <section className="page-content">
      <article className="page-content__card">
        <h2 className="page-content__title">{title}</h2>
        <p className="page-content__description">{description}</p>
      </article>
    </section>
  )
}
