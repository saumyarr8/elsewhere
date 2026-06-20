import Template4Layout from './Template4Layout'
import type { TemplateData } from '@/components/admin/template-editor/shared'

type TemplateProject = { templateData: unknown }

export default function Template4({ project }: { project: TemplateProject }) {
  const data: Partial<TemplateData> =
    typeof project.templateData === 'string'
      ? JSON.parse(project.templateData)
      : (project.templateData as Partial<TemplateData>) ?? {}
  return <Template4Layout data={data} />
}
