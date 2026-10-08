'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { QUIZ_QUESTIONS, type QuizAnswers } from '@/lib/quiz'

interface Props {
  initialAnswers: QuizAnswers
}

export function QuizFlow({ initialAnswers }: Props) {
  const router = useRouter()
  const params = useSearchParams()
  const [answers, setAnswers] = useState<QuizAnswers>(initialAnswers)
  const [currentStep, setCurrentStep] = useState(() => {
    // Resume at first unanswered question (or 0 if all empty)
    const firstUnanswered = QUIZ_QUESTIONS.findIndex(
      (q) => !initialAnswers[q.field as keyof QuizAnswers],
    )
    return firstUnanswered === -1 ? QUIZ_QUESTIONS.length - 1 : firstUnanswered
  })

  const totalSteps = QUIZ_QUESTIONS.length
  const currentQ = QUIZ_QUESTIONS[currentStep]
  const isLast = currentStep === totalSteps - 1

  const updateAnswer = (field: string, value: string) => {
    const next = { ...answers, [field]: value }
    setAnswers(next)

    if (isLast) {
      // Submit — push URL with all answers, server renders results
      const qs = new URLSearchParams()
      Object.entries(next).forEach(([k, v]) => {
        if (v) qs.set(k, v)
      })
      router.push(`/find-your-watch?${qs.toString()}&done=1`)
    } else {
      setCurrentStep(currentStep + 1)
    }
  }

  const goBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1)
  }

  const goSkip = () => {
    updateAnswer(currentQ.field, 'any')
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs uppercase tracking-widest text-patina-text3">
            Question {currentStep + 1} of {totalSteps}
          </span>
          <span className="text-xs text-patina-gold">
            {Math.round(((currentStep + 1) / totalSteps) * 100)}%
          </span>
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-patina-bg3">
          <div
            className="h-full bg-patina-gold transition-all duration-300"
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div key={currentStep} className="animate-fade-in">
        <h2 className="font-playfair text-2xl md:text-3xl font-bold text-patina-text mb-2">
          {currentQ.question}
        </h2>
        <p className="text-sm text-patina-text2 mb-6">{currentQ.helper}</p>

        {/* Options */}
        <div className="space-y-2">
          {currentQ.options.map((opt) => {
            const isSelected = answers[currentQ.field as keyof QuizAnswers] === opt.value
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => updateAnswer(currentQ.field, opt.value)}
                className={`w-full text-left rounded-xl border p-4 transition-all hover:border-patina-gold/50 hover:bg-patina-bg3 ${
                  isSelected
                    ? 'border-patina-gold bg-patina-bg3'
                    : 'border-patina-border bg-patina-bg2'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="font-medium text-patina-text">{opt.label}</p>
                    {opt.description && (
                      <p className="mt-1 text-xs text-patina-text2">{opt.description}</p>
                    )}
                  </div>
                  {isSelected && (
                    <span className="mt-1 shrink-0 text-patina-gold">✓</span>
                  )}
                </div>
              </button>
            )
          })}
        </div>

        {/* Nav */}
        <div className="mt-8 flex items-center justify-between">
          <button
            type="button"
            onClick={goBack}
            disabled={currentStep === 0}
            className="text-sm text-patina-text2 hover:text-patina-gold disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            ← Back
          </button>
          <button
            type="button"
            onClick={goSkip}
            className="text-sm text-patina-text3 hover:text-patina-text transition-colors"
          >
            Skip this question
          </button>
        </div>
      </div>
    </div>
  )
}
