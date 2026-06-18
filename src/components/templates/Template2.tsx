import Template2Layout, { Template2Data } from './Template2Layout'

export default function Template2({ project }: { project: any }) {
  const data: Partial<Template2Data> =
    typeof project.templateData === 'string'
      ? JSON.parse(project.templateData)
      : project.templateData ?? {}
  return <Template2Layout data={data} />
}
