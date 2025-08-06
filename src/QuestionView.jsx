import QuestYellowBlob from '../public/Questions_view/Q_yellow_blob.svg'
import QuestBlueBlob from '../public/Questions_view/Q_blue_blob.svg'
import { nanoid } from 'nanoid'
import { clsx } from 'clsx'

export default function QuestionsView(props){
    console.log(`New Rounds value is: ${props.currentRound}`)
    console.log(props)
    let wrongAnswerCount = 0
    
    const quizAnswerCollections = props.quizRandomizedAnswers.map((answerCollection, answerSetIndex) => {
        return(answerCollection.map((answerChoice, answerIndex) => {
                // const isCorrect = props.triviaAnswerKey.includes(answerChoice)
                const isCorrect = props.triviaAnswerKey[answerSetIndex] === props[`selectedAnswer${answerSetIndex}`]
                const selectedAnswerChoice = props[`selectedAnswer${answerSetIndex}`] === answerChoice
                const notSelected = !selectedAnswerChoice
                const isIncorrect = !props.triviaAnswerKey.includes(props[`selectedAnswer${answerSetIndex}`])
                if(selectedAnswerChoice & isIncorrect ){
                    wrongAnswerCount = ++wrongAnswerCount
                }
                    return(
                        <div key={nanoid()} className='answer-choice-container'>
                                <input key={nanoid()}
                                    type="radio" 
                                    name={`answer-collection-${answerSetIndex}`}
                                    id={`answer-${answerSetIndex}-choice: ${answerIndex}`} 
                                    value={answerChoice}
                                    checked={props[`selectedAnswer${answerSetIndex}`] === `${answerChoice}`} 
                                    onChange={props[`handleAnswerChoiceClick${answerSetIndex}`]}
                                />
                                <label 
                                    key={nanoid()}  
                                    className={clsx({
                                        'selected': selectedAnswerChoice,
                                        'not-selected': (notSelected && props.isAnswersChecked),
                                        'correct-answer-choice': (isCorrect && props.isAnswersChecked && selectedAnswerChoice),
                                        'incorrect-answer-choice': (isIncorrect && props.isAnswersChecked && selectedAnswerChoice)
                                        }                                        
                                    )}
                                    htmlFor={`answer-${answerSetIndex}-choice: ${answerIndex}` }
                                >{answerChoice}
                                </label>
                        </div>
                    )
                }
            )
        )
    })

    console.log(wrongAnswerCount)

    return(
        <>
            <img id="Quest-yellow-blob" src={QuestYellowBlob} alt='decorative image'/>
            <main id='Questions-and-controls-container'>
                <section className='trivia-questions'>
                    <form className='question-group'>
                        <fieldset>
                            <legend>{props.quizQuestions[0]}</legend>
                            <div className='answer-choices'>
                                {quizAnswerCollections[0]}
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend>{props.quizQuestions[1]}</legend>
                            <div className='answer-choices'>
                                {quizAnswerCollections[1]}
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend>{props.quizQuestions[2]}</legend>
                            <div className='answer-choices'>
                                {quizAnswerCollections[2]}
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend>{props.quizQuestions[3]}</legend>
                            <div className='answer-choices'>
                                {quizAnswerCollections[3]}
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend>{props.quizQuestions[4]}</legend>
                            <div className='answer-choices'>
                                {quizAnswerCollections[4]}
                            </div>
                        </fieldset>
                    </form>
                    <hr/>
                </section>
                {props.isAnswersChecked ? 
                    <div className='new-game-container'>
                        <p>{`You scored ${props.playerScore}/5 correct answers`}</p>
                        <button className='CTA-button' onClick={props.handlePlayAgainClick}>Play again</button>
                    </div> : 
                    <button className='CTA-button' onClick={() => props.handleCheckClick(wrongAnswerCount)}>Check answers</button>}
                    
            </main>
            <img id="Quest-blue-blob" src={QuestBlueBlob} alt='decorative image'/>
        </>
    )
}