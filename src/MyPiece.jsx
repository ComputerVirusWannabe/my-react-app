import { forwardRef, use, useEffect, useImperativeHandle, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function MyPiece(props) {
  //const MyPiece = forwardRef((props, ref) => {
  const [count, setCount] = useState(0)  //setCount(3)
  const [id, setId] = useState(props.id)  // setId('0')
  const [color, setColor] = useState(props.color)
  const [name, setName] = useState(props.myname)
  const [plaerName, setPlayerName] = useState('Player 1')

  const { theme } = useContext(ThemeContext);

  //console.log('MyPiece prop id', props.id)

  useEffect(() => {
    //console.log('********** Component mounted with id:', props.id)
   // console.log('MyPiece useEffect color changed, new color:', color)
  }, [color])

  useEffect(() => {
   // console.log('MyPiece useEffect called with id:', props.id)
    setId(props.id)
    setName(props.myname)
  } , [props.id, props.myname])


  
  useImperativeHandle(props.ref, () => ({
    changeColor: (newColor) => {
      console.log('Changing color to:', newColor)
      setColor(newColor)
    },
    getName: () => props.myname
  }))
  
  const handleClick = (e) => {
    //props.func()
    
    //alert('Button clicked:', props.id)
    //alert(e.target.innerText)
    console.log('Piece name clicked:', name)
    // call parent function
    props.parent_func()
   
  }

  return (
    <>
      <div className="card">
        <button style={{ backgroundColor: color, color: 'white' }}
        
           onClick={(e) => handleClick(e)}>
          {props.myname + id}
        </button>

      </div>
    </>
  )
}

export default MyPiece
