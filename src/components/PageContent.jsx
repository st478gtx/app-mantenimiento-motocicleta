export default function PageContent({ title, description }) {
  return (
    <section className="p-4 md:p-8">
      <article className="rounded-xl bg-[var(--card-bg)] p-6 shadow-[0_10px_24px_-18px_rgba(0,0,0,0.45)]">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">{description}</p>
      </article>
    </section>
  )
}
