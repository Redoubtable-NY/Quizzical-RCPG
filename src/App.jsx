import { use, useState } from 'react'
import { useEffect } from 'react'
import StartView from './StartView.jsx'
import QuestionsView from "./QuestionView.jsx"
import he from "he"

function App() {
  const [quizStart, setQuizStart] = useState(true)
  const [newRound, setNewRound] = useState(false)
  const [quizQuestions, setQuizQuestions] = useState([])
  const [isAnswersChecked, setIsAnswersChecked] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [quizRandomizedAnswers, setQuizRandomizedAnswers] = useState([])

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
      .then(resp => resp.json())
      .then((data) => {
        const quizQuestionsAndAnswers = data.results
        const quizQuestionResponses = quizQuestionsAndAnswers.map((arrayItem) => he.decode(arrayItem.question))
        const quizAnswerKey = quizQuestionsAndAnswers.map(arrayItem => arrayItem.correct_answer)
        const quizAnswerChoices = quizQuestionsAndAnswers.map((arrayItem, index) => {
                return arrayItem.incorrect_answers.concat(quizAnswerKey[index])
            }
        )
        setQuizQuestions(quizQuestionResponses)

        for(const answerChoice of quizAnswerChoices){
            for(let i = answerChoice.length - 1; i >= 1; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [answerChoice[i], answerChoice[j]] = [answerChoice[j], answerChoice[i]];
            }
        }

        setQuizRandomizedAnswers(quizAnswerChoices)
      }
    )
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
            isAnswersChecked={isAnswersChecked} 
            handleCheckClick={answerChecker}
            selectedAnswer={selectedAnswer}
            handleAnswerChoiceClick={selectAnswerChoice}
            setQuizRandomizedAnswers={setQuizRandomizedAnswers}
            quizRandomizedAnswers={quizRandomizedAnswers}
            quizQuestions={quizQuestions}
        />
        ) 
      }
    </>
  )
}

export default App
