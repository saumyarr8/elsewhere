import SiteNav from '@/components/public/nav/SiteNav'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteNav />
      <main>{children}</main>
    </>
  )
}
