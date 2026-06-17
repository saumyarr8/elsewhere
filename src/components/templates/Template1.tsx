import Template1Layout, { Template1Data } from './Template1Layout'

export default function Template1({ project }: { project: any }) {
  const data: Partial<Template1Data> =
    typeof project.templateData === 'string'
      ? JSON.parse(project.templateData)
      : project.templateData ?? {}

  return <Template1Layout data={data} />
}
