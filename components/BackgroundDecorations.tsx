export default function BackgroundDecorations() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div 
        className="absolute inset-0 opacity-100 dark:opacity-50"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(139, 92, 246, 0.08) 2px, transparent 2px),
            linear-gradient(to bottom, rgba(139, 92, 246, 0.08) 2px, transparent 2px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
    </div>
  )
}
