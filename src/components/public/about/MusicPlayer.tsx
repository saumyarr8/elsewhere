export default function MusicPlayer({ style }: { style?: React.CSSProperties }) {
  return (
    <button style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center', width: 183, cursor: 'pointer', background: 'none', border: 'none', ...style }}>
      <div style={{ height: 118, position: 'relative', width: 160 }}>
        <div style={{ position: 'absolute', height: 117.958, left: 14.52, top: -0.14, width: 119.266, overflow: 'hidden' }}>
          <img alt="" style={{ position: 'absolute', height: '124.3%', left: '-11.12%', maxWidth: 'none', top: '-12.15%', width: '122.94%' }} src="/images/vinyl-record.png" />
        </div>
        <div style={{ position: 'absolute', height: 10.953, left: 'calc(50% - 5.85px)', top: 54.4, width: 88.613 }}>
          <img alt="" style={{ position: 'absolute', display: 'block', inset: 0, maxWidth: 'none', width: '100%', height: '100%' }} src="/icons/vinyl-controls.svg" />
        </div>
      </div>
      <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 12, color: '#1c1c1c', display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center', width: '100%', whiteSpace: 'nowrap', fontWeight: 400 }}>
        <p style={{ textTransform: 'uppercase', margin: 0 }}>Angel (feat. horace andy)</p>
        <p style={{ margin: 0 }}>Massive Attack . Mezzanine</p>
      </div>
    </button>
  )
}
