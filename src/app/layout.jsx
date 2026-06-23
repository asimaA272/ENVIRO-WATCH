import './globals.css'

export const metadata = {
  title: 'EnviroWatch — Multi-Agent Environmental Monitoring',
  description: 'Real-time environmental monitoring powered by LangGraph multi-agent system',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
