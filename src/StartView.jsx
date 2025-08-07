import yellowBlob from '../public/Start_view/Yellow_blob.svg'
import blueBlob from '../public/Start_view/Blue_blob.svg'

export default function StartView(props){
    return(
        <>
            <img id="start-yellow-blob" src={yellowBlob} alt='decorative image'/>
            <header>
                <h1 id="site-header">Quizzical</h1>
                <p id="site-header-description">Quick trivia to exercise your mind.</p>
                <button onClick={props.handleClick} className='CTA-button'>Start quiz</button>
                {props.fetchError ? <p id="trivia-error">There's been an error please wait 10 seconds and refresh the page.</p> : null}
            </header>
            <img id="start-blue-blob" src={blueBlob} alt='decorative image'/>
        </>
    )
}