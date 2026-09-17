import Button from './components/Button'
import Statistics from './components/Statistics'
import { useBad, useGood, useNeutral, useFeedbackActions } from './store'

const App = () => {
  const good = useGood()
  const neutral = useNeutral()
  const bad = useBad()
  const { giveGood, giveNeutral, giveBad } = useFeedbackActions()

  return (
    <main>
      <h1>give feedback</h1>

      <Button onClick={giveGood}>good</Button>
      <Button onClick={giveNeutral}>neutral</Button>
      <Button onClick={giveBad}>bad</Button>

      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </main>
  )
}

export default App
