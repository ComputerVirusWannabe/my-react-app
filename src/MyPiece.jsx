import { forwardRef, use, useEffect, useImperativeHandle, useState } from 'react'
import './App.css'
import { useContext } from 'react'
import { ThemeContext } from './context/ThemeContext'

function MyPiece(props) {
  //const MyPiece = forwardRef((props, ref) => {
  const [count, setCount] = useState(0)  //setCount(3)
  const [id, setId] = useState(props.id)  // setId('0')
  const [color, setColor] = useState(props.color)
  const [name, setName] = useState(props.myname)
  const [plaerName, setPlayerName] = useState('Player 1')

  const { theme } = useContext(ThemeContext);
  /*
  const getThemeStyles = () => {
    if (theme === 'dark') {
      return {
        backgroundColor: '#333',
        color: 'white'
      };
    } else {
      return {
        backgroundColor: '#eee',
        color: 'black'
      };
    }
  };
  */
  //console.log('MyPiece prop id', props.id)

  //useEffect(() => {
    
   // console.log('MyPiece  xxxxxxx useEffect color changed, new color:', color)
 // }, [props.color])

  useEffect(() => {
   // console.log('MyPiece useEffect called with id:', props.id)
    setId(props.id)
    setName(props.myname)
    setColor(props.color)
  } , [props.id, props.myname, props.color])


  
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

  const styles = {
    //backgroundColor: theme === 'dark' ? 'orange' : 'green',
    backgroundColor: color,
    color: theme === 'dark' ? 'white' : 'black',
    width: '100%',
    height: '100%',
    border: 'none',
    fontWeight: 'bold',
    fontSize: '1rem',
  };
  
  return (
    <div className="card">
      <button
        onClick={() => props.onPieceClick(id)}
        style={styles}
      >
        {name} * {id}
      </button>
    </div>
  );  
}


export default MyPiece
