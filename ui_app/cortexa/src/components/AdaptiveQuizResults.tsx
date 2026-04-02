import React from 'react'
import { Card } from './ui/card'
import { AdaptiveAnalysisResult, TopicFrequency } from '../types/quiz'
import {
  TrendingUp,
  BookMarked,
  Target,
  AlertCircle,
  CheckCircle2,
  Brain,
} from 'lucide-react'

interface AdaptiveQuizResultsProps {
  result: AdaptiveAnalysisResult
  filename: string
}

export const AdaptiveQuizResults: React.FC<AdaptiveQuizResultsProps> = ({
  result,
  filename,
}) => {
  const getImportanceColor = (importance: 'High' | 'Medium' | 'Low') => {
    switch (importance) {
      case 'High':
        return 'text-red-600 bg-red-50'
      case 'Medium':
        return 'text-orange-600 bg-orange-50'
      case 'Low':
        return 'text-green-600 bg-green-50'
    }
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">Adaptive Learning Analysis</h2>
        <p className="text-gray-600">File: {filename}</p>
        <div className="inline-block px-4 py-2 bg-blue-100 text-blue-900 rounded-full font-semibold">
          Exam: {result.exam_type}
        </div>
      </div>

      {/* Summary */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="p-6 space-y-4">
          <div className="flex items-start gap-4">
            <Brain className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-900">Summary</h3>
              <p className="text-gray-700 mt-2">{result.summary}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Detected Topics and Frequencies */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Topics */}
        <Card>
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-2">
              <BookMarked className="w-5 h-5 text-purple-600" />
              <h3 className="font-bold text-lg text-gray-900">Detected Topics</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {result.detected_topics.map((topic, idx) => (
                <span
                  key={idx}
                  className="inline-block px-3 py-1 bg-purple-100 text-purple-900 rounded-full text-sm font-medium"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </Card>

        {/* Topic Frequencies */}
        <Card>
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-orange-600" />
              <h3 className="font-bold text-lg text-gray-900">Topic Frequency</h3>
            </div>
            <div className="space-y-3">
              {result.topic_frequencies.map((tf: TopicFrequency, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-900">{tf.topic}</span>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${getImportanceColor(tf.importance)}`}>
                      {tf.importance}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full"
                      style={{ width: `${tf.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-600">{tf.frequency} mentions ({tf.percentage}%)</p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Personalized Questions Count */}
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
            <div>
              <h3 className="font-bold text-lg text-gray-900">Personalized Questions Generated</h3>
              <p className="text-gray-700 mt-1">
                {result.personalized_questions.length} questions created based on your exam type ({result.exam_type})
                and the detected topics
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Learning Feedback */}
      <Card>
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-lg text-gray-900">Learning Feedback</h3>
          </div>
          <div className="space-y-2">
            {result.learning_feedback.map((feedback, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                <p className="text-gray-700">{feedback}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Recommendations */}
      <Card className="border-l-4 border-yellow-500 bg-yellow-50">
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-600" />
            <h3 className="font-bold text-lg text-gray-900">Learning Recommendations</h3>
          </div>
          <ol className="space-y-2 list-decimal list-inside">
            {result.recommendations.map((rec, idx) => (
              <li key={idx} className="text-gray-700">
                {rec}
              </li>
            ))}
          </ol>
        </div>
      </Card>

      {/* Questions Preview */}
      <Card>
        <div className="p-6 space-y-4">
          <h3 className="font-bold text-lg text-gray-900">
            Sample Generated Questions ({result.personalized_questions.length})
          </h3>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {result.personalized_questions.slice(0, 3).map((question, idx) => (
              <div key={idx} className="space-y-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="font-medium text-gray-900">{idx + 1}. {question.question}</p>
                <div className="ml-4 space-y-1">
                  {question.options.map((option, optIdx) => (
                    <p
                      key={optIdx}
                      className={`text-sm ${
                        optIdx === question.correctAnswer ? 'text-green-700 font-medium' : 'text-gray-600'
                      }`}
                    >
                      {String.fromCharCode(65 + optIdx)}) {option}
                      {optIdx === question.correctAnswer && ' ✓'}
                    </p>
                  ))}
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  <span className="inline-block px-2 py-1 bg-gray-200 rounded">
                    {question.difficulty}
                  </span>
                </p>
              </div>
            ))}
            {result.personalized_questions.length > 3 && (
              <p className="text-center text-gray-600 text-sm py-4">
                +{result.personalized_questions.length - 3} more questions available...
              </p>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
