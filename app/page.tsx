'use client'

import { useState } from 'react'
import Dashboard from '@/components/Dashboard'

export default function Home() {
  const [teamName, setTeamName] = useState('')
  const [isDashboard, setIsDashboard] = useState(false)

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault()
    if (teamName.trim()) {
      setIsDashboard(true)
    }
  }

  if (isDashboard) {
    return <Dashboard teamName={teamName} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black tracking-tight mb-2">PhysioLution³</h1>
            <p className="text-slate-300 text-lg">Team Training Dashboard</p>
          </div>

          <form onSubmit={handleStart} className="space-y-6">
            <div>
              <label className="text-sm text-slate-400 block mb-2">Dein Name oder Team-Name</label>
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="z.B. CrossFit Elite"
                className="w-full bg-slate-800 border border-slate-600 rounded-2xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-2xl transition duration-200"
            >
              Dashboard Starten 🚀
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-700 space-y-3">
            <div className="flex items-start gap-3">
              <div className="text-2xl">📊</div>
              <div>
                <div className="font-semibold text-sm">1RM Berechnung</div>
                <div className="text-xs text-slate-400">Präzise Maximalkraft-Berechnung</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-2xl">⚖️</div>
              <div>
                <div className="font-semibold text-sm">Symmetrie-Tracking</div>
                <div className="text-xs text-slate-400">LSI & Defizit automatisch erkannt</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-2xl">👥</div>
              <div>
                <div className="font-semibold text-sm">Team-Zugang</div>
                <div className="text-xs text-slate-400">Kostenlos für dein ganzes Team</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
