import { useEffect, useRef, useState } from "react";
import { generate } from "random-words";
import Base from "../components/Base";
import { Card, CardBody} from "reactstrap";
import '../App.css';

const NUMB_OF_WORD = 100
const SECONDS = 60 //under development 

function Index() {
  
  const [words, setWords] = useState([])
  const [countDown, setCountDown] = useState([SECONDS])
  const [currInput, setCurrInput] = useState("")
  const [currWordIndex, setCurrWordIndex] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [currCharIndex, setCurrCharIndext] = useState(-1)
  const [currChar, setcurrChar] = useState("")
  const [incorrect, setIncorrect] = useState(0)
  const [status, setStatus] = useState("Waiting")
  const textInput = useRef(null)

  useEffect(() => {
    document.title = "Typing App"
    setWords(generateWords())
  }, [])

  useEffect(() => {
    
    if(status === 'started')
    textInput.current.focus()
  }, [status])
  function generateWords(){
    return new Array(NUMB_OF_WORD).fill(null).map(() => generate())
  }
  function start(){
    if(status === 'finished'){
      setWords(generateWords())
      setCurrWordIndex(0)
      setCorrect(0)
      setIncorrect(0)
      setCurrCharIndext(-1)
      setcurrChar("")
    }

    if(status !== 'started')
      setStatus('started')
    let interval = setInterval(() => {
      setCountDown((prevCountDown) => {
        if(prevCountDown === 0){
          clearInterval(interval)
          setStatus('finished')
          setCurrInput("")
          return SECONDS

        } else{
          return prevCountDown -1
        }
        
      })
    },   1000)
  }
function handleKeyDown({keyCode, key}){
  //console.log(event.key)
  //Spacebar ===32
  if(keyCode ===32){
    checkMatch()
    setCurrInput("")
    setCurrWordIndex(currWordIndex + 1)
    setCurrCharIndext(-1)
    //Backspace == 8 
  }else if(keyCode===8){
    setCurrCharIndext(currCharIndex - 1)
    setcurrChar("")
  }
  
  else{
    setCurrCharIndext(currCharIndex + 1)
    setcurrChar(key)
  }
}
  

function checkMatch(){
  const wordToCompare = words[currWordIndex]
  const doesItMatch = wordToCompare===currInput.trim()
  // console.log({doesItMatch})
  if(doesItMatch){
    setCorrect(correct +1)
  }else{
    setIncorrect(incorrect + 1)
  }
}

function getCharClass(wordIdx, charIdx, char){
  
  if(wordIdx=== currWordIndex && charIdx === currCharIndex && currChar && status !== 'finished'){
    if(char===currChar){
      return 'background-green' ;
    }else{
      return 'background-red'
    }
    }else if(wordIdx === currWordIndex && currCharIndex >= words[currWordIndex].length){
      return 'background-red'
    }
    else{
      return ''
    }
}


  return (
    <Base>
      
        <div className="container text-center">
          <h2>{countDown}</h2>
        </div>
      
      <div className="container text-center">
        <input ref={textInput} disabled={status !== "started"} type="text" className="input"
         onKeyDown={handleKeyDown} 
         value={currInput} 
         onChange={(e)=> setCurrInput(e.target.value)}>
         </input>
      </div>

      <div className="container text-center">
        <button className="btn btn-primary mt-3"
        onClick={start}>
           Start
        </button>
      </div>
      {status === 'started' && (

      

<div className="container mt-5 mb-5" style={{fontFamily:'verdana', fontSize:'20px' , textAlign:'left',padding:'5px'}}>
        <Card>
          <CardBody>
      
        {words.map((word, i) => (
          <span key={i}>
          <span>
            {word.split("").map((char, idx) =>(
              <span className={getCharClass(i, idx, char)} key={idx}>{char}</span>
            ))}
          </span>
          <span> </span>
          </span>
        ))}
        
        </CardBody>
        </Card>
        </div>
    )}

    {status === 'finished' && (

    
    
      
      <div className="container">
        
              <h5 className="text-center mt-3">WPM: {correct} </h5>
              <h5 className="text-center mt-3">ACCURACY:  {Math.round((correct / (correct + incorrect)) * 100)} %</h5>
              
              
              
        </div>
       
      
    )}
    </Base>
  );
}

export default Index;
