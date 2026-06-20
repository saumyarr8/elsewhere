import MusicPlayer from '@/components/public/about/MusicPlayer'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <div style={{
        position: 'fixed',
        bottom: 32,
        right: 32,
        zIndex: 50,
      }}>
        <MusicPlayer />
      </div>
    </>
  )
}
