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
  const [selectedAnswer2, setSelectedAnswer2] = useState('')
  const [selectedAnswer3, setSelectedAnswer3] = useState('')
  const [selectedAnswer4, setSelectedAnswer4] = useState('')
  const [selectedAnswer5, setSelectedAnswer5] = useState('')
  const [quizRandomizedAnswers, setQuizRandomizedAnswers] = useState([])

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
      .then(resp => resp.json())
      .then((data) => {
        const quizQuestionsAndAnswers = data.results
        const quizQuestionResponses = quizQuestionsAndAnswers.map((arrayItem) => he.decode(arrayItem.question))
        const quizAnswerKey = quizQuestionsAndAnswers.map(arrayItem => he.decode(arrayItem.correct_answer))
        const quizAnswerChoices = quizQuestionsAndAnswers.map((arrayItem, index) => {
                return arrayItem.incorrect_answers.concat(he.decode(quizAnswerKey[index]))
            }
        )
        setQuizQuestions(quizQuestionResponses)

        for(const answerChoice of quizAnswerChoices){
            for(let i = answerChoice.length - 1; i >= 1; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [answerChoice[i], answerChoice[j]] = [answerChoice[j], answerChoice[i]];
            }
        }

        // Instead of mapping each question one by one, how can we loop over them collectively, to reduce code, and keep things 
        // dry? Also don't forget that you can use the index value and template strings to incorporate the correct State variable 
        // and updating function for each input. You are really close to being done and moving on to the next lesson. I think cracking
        // this will be beneficial for future lessons which is why. I'm mentioning it, it will also be easier for you to wrap your 
        // head around your code base for now.

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

  function selectAnswerChoice2(e){
    setSelectedAnswer2(e.target.value)
  }

  function selectAnswerChoice3(e){
    setSelectedAnswer3(e.target.value)
  }

  function selectAnswerChoice4(e){
    setSelectedAnswer4(e.target.value)
  }

  function selectAnswerChoice5(e){
    setSelectedAnswer5(e.target.value)
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
            selectedAnswer2={selectedAnswer2}
            selectedAnswer3={selectedAnswer3}
            selectedAnswer4={selectedAnswer4}
            selectedAnswer5={selectedAnswer5}
            handleAnswerChoiceClick={selectAnswerChoice}
            handleAnswerChoiceClick2={selectAnswerChoice2}
            handleAnswerChoiceClick3={selectAnswerChoice3}
            handleAnswerChoiceClick4={selectAnswerChoice4}
            handleAnswerChoiceClick5={selectAnswerChoice5}
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
