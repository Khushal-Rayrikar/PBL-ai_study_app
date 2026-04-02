import React from 'react'
import { Card } from './ui/card'
import { BookOpen, TestTube, Microscope } from 'lucide-react'
import { cn } from '../lib/utils'

export type ExamType = 'HSC' | 'JEE' | 'NEET' | null

interface ExamSelectorProps {
  selected: ExamType
  onSelect: (exam: ExamType) => void
}

export const ExamSelector: React.FC<ExamSelectorProps> = ({ selected, onSelect }) => {
  const exams = [
    {
      id: 'HSC',
      name: 'HSC',
      description: 'Higher Secondary Certificate',
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'JEE',
      name: 'JEE',
      description: 'Joint Entrance Examination (Numerical Focus)',
      icon: TestTube,
      color: 'from-orange-500 to-orange-600',
    },
    {
      id: 'NEET',
      name: 'NEET',
      description: 'National Eligibility cum Entrance Test (Conceptual Focus)',
      icon: Microscope,
      color: 'from-green-500 to-green-600',
    },
  ]

  return (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Select Your Exam</h2>
        <p className="text-gray-600">Choose your exam type to personalize the learning experience</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {exams.map((exam) => {
          const Icon = exam.icon
          return (
            <Card
              key={exam.id}
              onClick={() => onSelect(exam.id as ExamType)}
              className={cn(
                'cursor-pointer transition-all duration-300 border-2',
                selected === exam.id
                  ? 'border-gray-900 shadow-lg scale-105'
                  : 'border-gray-200 hover:border-gray-400 hover:shadow-md'
              )}
            >
              <div className="p-6 text-center space-y-4">
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${exam.color}`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                <div className="space-y-1">
                  <h3 className="font-bold text-lg text-gray-900">{exam.name}</h3>
                  <p className="text-sm text-gray-600">{exam.description}</p>
                </div>

                {selected === exam.id && (
                  <div className="inline-block px-3 py-1 bg-gray-900 text-white text-xs font-semibold rounded-full">
                    Selected
                  </div>
                )}
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
