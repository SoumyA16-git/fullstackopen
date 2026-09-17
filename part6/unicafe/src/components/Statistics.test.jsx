import { describe, expect, test } from 'vitest'
import { calculateStatistics } from '../statistics'

describe('calculateStatistics', () => {
  test('returns null when no feedback exists', () => {
    expect(calculateStatistics({ good: 0, neutral: 0, bad: 0 })).toBeNull()
  })

  test('calculates total, average, and positive percentage', () => {
    expect(calculateStatistics({ good: 2, neutral: 1, bad: 1 })).toEqual({
      total: 4,
      average: 0.25,
      positive: 50
    })
  })
})
