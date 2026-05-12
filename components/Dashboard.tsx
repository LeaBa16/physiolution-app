'use client'

import { useState } from 'react'

interface DashboardProps {
  teamName: string
}

export default function Dashboard({ teamName }: DashboardProps) {
  const [data, setData] = useState({
    rightWeight: 70,
    rightReps: 12,
    leftWeight: 65,
    leftReps: 12,
  })

  const calculatePercentage = (reps: number) => {
    return (-1.4 * reps) + 95
  }

  const calc1RM = (weight: number, reps: number) => {
    if (!weight || !reps) return 0
    const percentage = calculatePercentage(reps)
    return weight / (percentage / 100)
  }

  const calcLSI = (right: number, left: number) => {
    if (!right || !left) return 0
    const weaker = Math.min(right, left)
    const stronger = Math.max(right, left)
    return (weaker / stronger) * 100
  }

  const calcDeficit = (right: number, left: number) => {
    return 100 - calcLSI(right, left)
  }

  const updateField = (field: string, value: string) => {
    setData((prev) => ({
      ...prev,
      [field]: Number(value),
    }))
  }

  const rightRM = calc1RM(data.rightWeight, data.rightReps)
  const leftRM = calc1RM(data.leftWeight, data.leftReps)
  const lsi = calcLSI(rightRM, leftRM)
  const deficit = calcDeficit(rightRM, leftRM)
  const weakerSide = rightRM > leftRM ? 'Links' : 'Rechts'

  const getTrainingZones = (rm: number) => {
    return {
      '90% Maximalkraft': (rm * 0.9).toFixed(1),
      '80% Kraftaufbau': (rm * 0.8).toFixed(1),
      '70% Hypertrophie': (rm * 0.7).toFixed(1),
      '60% Kraftausdauer': (rm * 0.6).toFixed(1),
    }
  }

  const rightZones = getTrainingZones(rightRM)
  const leftZones = getTrainingZones(leftRM)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="flex flex-col lg:flex-row justify-between gap-6">
            <div>
              <h1 className="text-4xl font-black tracking-tight">
                RM & Symmetrie Dashboard
              </h1>
              <p className="text-slate-300 mt-3 text-lg">
                Team: <span className="font-bold text-emerald-400">{teamName}</span>
              </p>
            </div>

            <div className="bg-emerald-500/20 border border-emerald-400/20 rounded-2xl px-5 py-4 max-w-sm">
              <div className="text-sm uppercase tracking-wider text-emerald-200">
                nRM Methode
              </div>
              <div className="font-bold text-xl mt-1">
                Präzisere 1RM Berechnung
              </div>
              <div className="text-sm text-slate-300 mt-2 leading-relaxed">
                %1RM = [-1,4 × Wdh + 95]
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">Rechte Seite</h2>
                <p className="text-slate-300">Gewicht & Wiederholungen</p>
              </div>
              <div className="text-4xl">💪</div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="text-sm text-slate-400">Gewicht (kg)</label>
                <input
                  type="number"
                  value={data.rightWeight}
                  onChange={(e) => updateField('rightWeight', e.target.value)}
                  className="w-full mt-2 bg-slate-800 border border-slate-600 rounded-2xl px-4 py-4 text-xl text-white"
                />
              </div>
              <div>
                <label className="text-sm text-slate-400">Wiederholungen</label>
                <input
                  type="number"
                  value={data.rightReps}
                  onChange={(e) => updateField('rightReps', e.target.value)}
                  className="w-full mt-2 bg-slate-800 border border-slate-600 rounded-2xl px-4 py-4 text-xl text-white"
                />
              </div>
              <div className="bg-emerald-500/10 border border-emerald-400/20 rounded-2xl p-5">
                <div className="text-sm text-emerald-200 uppercase tracking-wider">
                  1RM Rechts
                </div>
                <div className="text-5xl font-black mt-2">
                  {rightRM.toFixed(1)} kg
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">Linke Seite</h2>
                <p className="text-slate-300">Gewicht & Wiederholungen</p>
              </div>
              <div className="text-4xl">🦵</div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="text-sm text-slate-400">Gewicht (kg)</label>
                <input
                  type="number"
                  value={data.leftWeight}
                  onChange={(e) => updateField('leftWeight', e.target.value)}
                  className="w-full mt-2 bg-slate-800 border border-slate-600 rounded-2xl px-4 py-4 text-xl text-white"
                />
              </div>
              <div>
                <label className="text-sm text-slate-400">Wiederholungen</label>
                <input
                  type="number"
                  value={data.leftReps}
                  onChange={(e) => updateField('leftReps', e.target.value)}
                  className="w-full mt-2 bg-slate-800 border border-slate-600 rounded-2xl px-4 py-4 text-xl text-white"
                />
              </div>
              <div className="bg-cyan-500/10 border border-cyan-400/20 rounded-2xl p-5">
                <div className="text-sm text-cyan-100 uppercase tracking-wider">
                  1RM Links
                </div>
                <div className="text-5xl font-black mt-2">
                  {leftRM.toFixed(1)} kg
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-slate-900/70 rounded-3xl p-6 border border-slate-700">
            <div className="text-slate-400 text-sm uppercase tracking-wider mb-2">
              Schwächere Seite
            </div>
            <div className="text-4xl font-black">{weakerSide}</div>
            <div className="mt-3 text-slate-300 text-sm">
              Automatische Erkennung der schwächeren Seite.
            </div>
          </div>

          <div className="bg-slate-900/70 rounded-3xl p-6 border border-slate-700">
            <div className="text-slate-400 text-sm uppercase tracking-wider mb-2">
              Limb Symmetry Index
            </div>
            <div className="text-4xl font-black">{lsi.toFixed(1)}%</div>
            <div className="mt-3 text-slate-300 text-sm">
              Zielwert im Return to Sport häufig über 90%.
            </div>
          </div>

          <div className={`rounded-3xl p-6 border ${
            deficit > 15
              ? 'bg-red-500/10 border-red-400/20'
              : deficit > 10
                ? 'bg-yellow-500/10 border-yellow-400/20'
                : 'bg-emerald-500/10 border-emerald-400/20'
          }`}>
            <div className="text-sm uppercase tracking-wider mb-2">
              Defizit
            </div>
            <div className="text-4xl font-black">{deficit.toFixed(1)}%</div>
            <div className="mt-3 text-sm text-slate-300">
              Differenz zwischen stärkerer und schwächerer Seite.
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden">
          <h2 className="text-2xl font-bold mb-6">Trainingsgewichte</h2>
          <table className="w-full text-sm">
            <thead className="bg-slate-800">
              <tr>
                <th className="text-left p-4">Trainingsziel</th>
                <th className="text-center p-4">Rechts</th>
                <th className="text-center p-4">Links</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(rightZones).map((key, index) => (
                <tr
                  key={index}
                  className="border-t border-slate-700 hover:bg-white/5 transition"
                >
                  <td className="p-4 font-medium">{key}</td>
                  <td className="p-4 text-center font-bold">{rightZones[key as keyof typeof rightZones]} kg</td>
                  <td className="p-4 text-center font-bold">{leftZones[key as keyof typeof leftZones]} kg</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold mb-6">Bedienung für Team-Member</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-slate-900/70 rounded-2xl p-5 border border-slate-700">
              <div className="text-xl font-bold mb-2">1. Gewicht eingeben</div>
              <div className="text-slate-300 text-sm">
                Rechte und linke Seite separat testen.
              </div>
            </div>
            <div className="bg-slate-900/70 rounded-2xl p-5 border border-slate-700">
              <div className="text-xl font-bold mb-2">2. Wiederholungen eingeben</div>
              <div className="text-slate-300 text-sm">
                Wiederholungen bis nahe Ausbelastung eintragen.
              </div>
            </div>
            <div className="bg-slate-900/70 rounded-2xl p-5 border border-slate-700">
              <div className="text-xl font-bold mb-2">3. Ergebnisse sofort</div>
              <div className="text-slate-300 text-sm">
                1RM, LSI und Trainingsgewichte werden automatisch berechnet.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
