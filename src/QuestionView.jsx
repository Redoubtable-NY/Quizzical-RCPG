import QuestYellowBlob from '../public/Questions_view/Q_yellow_blob.svg'
import QuestBlueBlob from '../public/Questions_view/Q_blue_blob.svg'
import { nanoid } from 'nanoid'
import { clsx } from 'clsx'

export default function QuestionsView(props){
    const quizQuestionsAndAnswers = props.quizContents.results
    const quizQuestions = quizQuestionsAndAnswers.map((arrayItem) => arrayItem.question)
    const quizAnswerKey = []
    const quizAnswerChoices = [] 
    const quizAnswers = quizQuestionsAndAnswers.map((arrayItem) => {
        quizAnswerChoices.push(arrayItem.incorrect_answers)
        quizAnswerKey.push(arrayItem.correct_answer)
    })

    console.log(quizQuestionsAndAnswers)
    console.log(quizQuestions)
    console.log(quizAnswerChoices)
    console.log(quizAnswerKey)
    
    for(let i = 0 ; i < quizAnswerChoices.length; i++){
        const randomValue = Math.floor(quizAnswerKey[i].length * Math.random())
        quizAnswerChoices[i].splice(randomValue, 0, quizAnswerKey[i])
    }
    
    const questionOneAnswerChoices = quizAnswerChoices[0].map((questionCollection, index) => 
        {   
            // const isCorrect = quizAnswerKey.includes(questionCollection)
            // className={clsx(
            //     ['correct', isCorrect && props.isAnswersChecked ]
            // )}
            return(
                <div key={nanoid()} className='answer-choice-container'>
                    <input key={nanoid()} type="radio" id={`button: ${index}`} name="question-one" value={questionCollection} checked={props.selectedAnswer} onChange={props.handleAnswerChoiceClick}/>
                    <label key={nanoid()} htmlFor={`button: ${index}`}
                        >{questionCollection}
                    </label>
                </div>
            )
        }
    )
    

    console.log(quizAnswerChoices)
    return(
        <>
            <img id="Quest-yellow-blob" src={QuestYellowBlob} alt='decorative image'/>
            <main id='Questions-and-controls-container'>
                <section className='quiz-question'>
                    <form className='question-group'>
                        <p>{quizQuestions[0]}</p>
                        <div className='answer-choices'>
                            {questionOneAnswerChoices}
                        </div>
                    </form>
                    <hr/>
                </section>
                <button className='CTA-button'>Check answers</button>
            </main>
            <img id="Quest-blue-blob" src={QuestBlueBlob} alt='decorative image'/>
        </>
    )
}