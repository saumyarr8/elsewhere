import Template3Layout, { Template3Data } from './Template3Layout'

export default function Template3({ project }: { project: any }) {
  const data: Partial<Template3Data> =
    typeof project.templateData === 'string'
      ? JSON.parse(project.templateData)
      : project.templateData ?? {}
  return <Template3Layout data={data} />
}
