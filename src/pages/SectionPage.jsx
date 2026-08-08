import PageContent from '../components/PageContent'

const SHARED_TITLE = 'Módulo en construcción'
const SHARED_DESCRIPTION =
  'Esta sección utiliza el mismo contenido base mientras se habilitan funciones específicas.'

export default function SectionPage() {
  return <PageContent title={SHARED_TITLE} description={SHARED_DESCRIPTION} />
}
