import QuestYellowBlob from '../public/Questions_view/Q_yellow_blob.svg'
import QuestBlueBlob from '../public/Questions_view/Q_blue_blob.svg'
import { nanoid } from 'nanoid'
import { clsx } from 'clsx'

export default function QuestionsView(props){
    
    const questionOneAnswerChoices = props.quizRandomizedAnswers[0].map((questionCollection, index) => 
        {   
            // const isCorrect = quizAnswerKey.includes(questionCollection)
            // className={clsx(
            //     ['correct', isCorrect && props.isAnswersChecked ]
            // )}
            return(
                <div key={nanoid()} className='answer-choice-container'>
                    <input key={nanoid()} 
                        type="radio" 
                        name="question-one"
                        id={`question-one-button: ${index}`} 
                        value={questionCollection} 
                        checked={props.selectedAnswer === `${questionCollection}`} 
                        onChange={props.handleAnswerChoiceClick}
                    />
                    <label key={nanoid()} htmlFor={`question-one-button: ${index}`}
                        >{questionCollection}
                    </label>
                </div>
            )
        }
    )

    const questionTwoAnswerChoices = props.quizRandomizedAnswers[1].map((questionCollection, index) => 
        {   
            // const isCorrect = quizAnswerKey.includes(questionCollection)
            // className={clsx(
            //     ['correct', isCorrect && props.isAnswersChecked ]
            // )}
            return(
                <div key={nanoid()} className='answer-choice-container'>
                    <input key={nanoid()} 
                        type="radio"
                        name="question-two"
                        id={`question-two-button: ${index}`} 
                        value={questionCollection} 
                        checked={props.selectedAnswer2 === `${questionCollection}`} 
                        onChange={props.handleAnswerChoiceClick2}
                    />
                    <label key={nanoid()} htmlFor={`question-two-button: ${index}`}
                        >{questionCollection}
                    </label>
                </div>
            )
        }
    )

    const questionThreeAnswerChoices = props.quizRandomizedAnswers[2].map((questionCollection, index) => 
        {   
            // const isCorrect = quizAnswerKey.includes(questionCollection)
            // className={clsx(
            //     ['correct', isCorrect && props.isAnswersChecked ]
            // )}
            return(
                <div key={nanoid()} className='answer-choice-container'>
                    <input key={nanoid()} 
                        type="radio"
                        name="question-three"
                        id={`question-three-button: ${index}`} 
                        value={questionCollection} 
                        checked={props.selectedAnswer3 === `${questionCollection}`} 
                        onChange={props.handleAnswerChoiceClick3}
                    />
                    <label key={nanoid()} htmlFor={`question-three-button: ${index}`}
                        >{questionCollection}
                    </label>
                </div>
            )
        }
    )

    const questionFourAnswerChoices = props.quizRandomizedAnswers[3].map((questionCollection, index) => 
        {   
            // const isCorrect = quizAnswerKey.includes(questionCollection)
            // className={clsx(
            //     ['correct', isCorrect && props.isAnswersChecked ]
            // )}
            return(
                <div key={nanoid()} className='answer-choice-container'>
                    <input key={nanoid()} 
                        type="radio"
                        name="question-four"
                        id={`question-four-button: ${index}`} 
                        value={questionCollection} 
                        checked={props.selectedAnswer4 === `${questionCollection}`} 
                        onChange={props.handleAnswerChoiceClick4}
                    />
                    <label key={nanoid()} htmlFor={`question-four-button: ${index}`}
                        >{questionCollection}
                    </label>
                </div>
            )
        }
    )

    const questionFiveAnswerChoices = props.quizRandomizedAnswers[4].map((questionCollection, index) => 
        {   
            // const isCorrect = quizAnswerKey.includes(questionCollection)
            // className={clsx(
            //     ['correct', isCorrect && props.isAnswersChecked ]
            // )}
            return(
                <div key={nanoid()} className='answer-choice-container'>
                    <input key={nanoid()} 
                        type="radio"
                        name="question-five"
                        id={`question-five-button: ${index}`} 
                        value={questionCollection} 
                        checked={props.selectedAnswer5 === `${questionCollection}`} 
                        onChange={props.handleAnswerChoiceClick5}
                    />
                    <label key={nanoid()} htmlFor={`question-five-button: ${index}`}
                        >{questionCollection}
                    </label>
                </div>
            )
        }
    )

    return(
        <>
            <img id="Quest-yellow-blob" src={QuestYellowBlob} alt='decorative image'/>
            <main id='Questions-and-controls-container'>
                <section className='quiz-question'>
                    <form className='question-group'>
                        <fieldset>
                            <legend>{props.quizQuestions[0]}</legend>
                            <div className='answer-choices'>
                                {questionOneAnswerChoices}
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend>{props.quizQuestions[1]}</legend>
                            <div className='answer-choices'>
                                {questionTwoAnswerChoices}
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend>{props.quizQuestions[2]}</legend>
                            <div className='answer-choices'>
                                {questionThreeAnswerChoices}
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend>{props.quizQuestions[3]}</legend>
                            <div className='answer-choices'>
                                {questionFourAnswerChoices}
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend>{props.quizQuestions[4]}</legend>
                            <div className='answer-choices'>
                                {questionFiveAnswerChoices}
                            </div>
                        </fieldset>
                    </form>
                    <hr/>
                </section>
                <button className='CTA-button' onClick={props.handleCheckClick}>Check answers</button>
            </main>
            <img id="Quest-blue-blob" src={QuestBlueBlob} alt='decorative image'/>
        </>
    )
}