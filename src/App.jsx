import { use, useState } from 'react'
import { useEffect } from 'react'
import StartView from './StartView.jsx'
import QuestionsView from "./QuestionView.jsx"

function App() {
  const [quizStart, setQuizStart] = useState(true)
  const [quizContents, setQuizContents] = useState('')
  const [newRound, setNewRound] = useState(false)
  const [isAnswersChecked, setIsAnswersChecked] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState('')

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
      .then(resp => resp.json())
      .then(data => setQuizContents(data))
  },[ ])

  function startGame(){
    quizStart && setQuizStart(false)
  }

  function answerChecker(){
    setIsAnswersChecked(true)
  }

  function selectAnswerChoice(e){
    setSelectedAnswer(e.target.value)
  }

  // function startNewRound(){
  //   setNewRound(true)
  // }

  return (
    <>
     {quizStart ? 
      (<StartView handleClick={startGame}/>) : 
      (<QuestionsView 
            quizContents={quizContents} 
            isAnswersChecked={isAnswersChecked} 
            handleCheckClick={answerChecker}
            selectedAnswer={selectedAnswer}
            handleAnswerChoiceClick={selectAnswerChoice}
        />
        ) 
      }
    </>
  )
}

export default App
