import { use, useState } from 'react'
import { useEffect } from 'react'
import StartView from './StartView.jsx'
import QuestionsView from "./QuestionView.jsx"
import he from "he"

function App() {
  const [quizStart, setQuizStart] = useState(true)
  const [currentRound, setCurrentRound] = useState(1)
  const [playerScore, setPlayerScore] = useState(5)
  const [quizQuestions, setQuizQuestions] = useState([])
  const [triviaAnswerKey, setTriviaAnswerKey] = useState([])
  const [isAnswersChecked, setIsAnswersChecked] = useState(false)
  const [selectedAnswer0, setSelectedAnswer0] = useState('')
  const [selectedAnswer1, setSelectedAnswer1] = useState('')
  const [selectedAnswer2, setSelectedAnswer2] = useState('')
  const [selectedAnswer3, setSelectedAnswer3] = useState('')
  const [selectedAnswer4, setSelectedAnswer4] = useState('')
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
        setTriviaAnswerKey(quizAnswerKey)

        for(const answerChoice of quizAnswerChoices){
            for(let i = answerChoice.length - 1; i >= 1; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [answerChoice[i], answerChoice[j]] = [answerChoice[j], answerChoice[i]];
            }
        }
        setQuizRandomizedAnswers(quizAnswerChoices)
      }
    )
  },[currentRound])

  function startGame(){
    quizStart && setQuizStart(false)
  }

  function answerChecker(value){
    setIsAnswersChecked(true)
    setPlayerScore((prevPlayerScore) => {
      if(prevPlayerScore >= value){
        return (prevPlayerScore - value)
      }else{
        return(prevPlayerScore)
      }
    })
    console.log(`The player's score is: ${playerScore}`)
  }

  function selectAnswerChoice0(e){
    setSelectedAnswer0(e.target.value)
  }

  function selectAnswerChoice1(e){
    setSelectedAnswer1(e.target.value)
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

  function playAgain() {
    setIsAnswersChecked(false)
    setCurrentRound(prevNewRound => prevNewRound + 1)
    setSelectedAnswer0('')
    setSelectedAnswer1('')
    setSelectedAnswer2('')
    setSelectedAnswer3('')
    setSelectedAnswer4('')
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
            selectedAnswer0={selectedAnswer0}
            selectedAnswer1={selectedAnswer1}
            selectedAnswer2={selectedAnswer2}
            selectedAnswer3={selectedAnswer3}
            selectedAnswer4={selectedAnswer4}
            handleAnswerChoiceClick0={selectAnswerChoice0}
            handleAnswerChoiceClick1={selectAnswerChoice1}
            handleAnswerChoiceClick2={selectAnswerChoice2}
            handleAnswerChoiceClick3={selectAnswerChoice3}
            handleAnswerChoiceClick4={selectAnswerChoice4}
            setQuizRandomizedAnswers={setQuizRandomizedAnswers}
            quizRandomizedAnswers={quizRandomizedAnswers}
            quizQuestions={quizQuestions}
            triviaAnswerKey={triviaAnswerKey}
            playerScore={playerScore}
            setPlayerScore={setPlayerScore}
            handlePlayAgainClick={playAgain}
            currentRound={currentRound}
        />
        ) 
      }
    </>
  )
}

export default App
