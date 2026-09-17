export const calculateStatistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad

  if (total === 0) {
    return null
  }

  return {
    total,
    average: (good - bad) / total,
    positive: (good / total) * 100
  }
}
