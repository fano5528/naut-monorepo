'use client'

export const dynamic = 'force-dynamic'

export default function Custom404() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="text-2xl font-bold">404 - Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
    </div>
  )
} 