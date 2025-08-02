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
                        id={`button: ${index}`} 
                        value={questionCollection} 
                        checked={props.selectedAnswer === `${questionCollection}`} 
                        onChange={props.handleAnswerChoiceClick}
                    />
                    <label key={nanoid()} htmlFor={`button: ${index}`}
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
                        <p>{props.quizQuestions[0]}</p>
                        <div className='answer-choices'>
                            {questionOneAnswerChoices}
                        </div>
                    </form>
                    <hr/>
                </section>
                <button className='CTA-button' onClick={props.handleCheckClick}>Check answers</button>
            </main>
            <img id="Quest-blue-blob" src={QuestBlueBlob} alt='decorative image'/>
        </>
    )
}