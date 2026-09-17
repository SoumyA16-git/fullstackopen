import { calculateStatistics } from '../statistics'

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad }) => {
  const statistics = calculateStatistics({ good, neutral, bad })

  if (!statistics) {
    return <p>No feedback given</p>
  }

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={statistics.total} />
        <StatisticLine text="average" value={statistics.average} />
        <StatisticLine text="positive" value={`${statistics.positive} %`} />
      </tbody>
    </table>
  )
}

export default Statistics
