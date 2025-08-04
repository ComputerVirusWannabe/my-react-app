import { forwardRef, use, useEffect, useImperativeHandle, useState } from 'react'
import './App.css'
import { useContext } from 'react'
import { ThemeContext } from './context/ThemeContext'

function Piece(props) {
  //const MyPiece = forwardRef((props, ref) => {
  const [count, setCount] = useState(0)  //setCount(3)
  const [id, setId] = useState(props.id)  // setId('0')
  const [color, setColor] = useState(props.color)
  const [name, setName] = useState(props.myname)
  const [location, setLocation] = useState(props.location)
  const [playerName, setPlayerName] = useState('Player 1')
  const [myLegitimatePaths, setMyLegitimatePaths] = useState([0, 8, 16, 24 ])  // array of legitimate locations for me to move

  const { theme } = useContext(ThemeContext);
  
  //console.log('MyPiece prop id', props.id)

  useEffect(() => {
   // console.log('Piece useEffect called with id:', props.id)
    setId(props.id)
    setName(props.myname)
    setColor(props.color)
    //check the name and set the legitimate paths .......
    if (props.myname === 'Rook') {
      setMyLegitimatePaths([0, 8, 16, 24]) // Player 1's legitimate paths
    } else if (props.myname === 'Player 2') {
      setMyLegitimatePaths([1, 9, 17, 25]) // Player 2's legitimate paths
    } else {
      setMyLegitimatePaths([]) // Default case or for other players
    }
  } , [props.id, props.myname, props.color])


  
  useImperativeHandle(props.ref, () => ({
    changeColor: (newColor) => {
      console.log('Changing color to:', newColor)
      setColor(newColor)
    },
    getName: () => props.myname,
    getLegitimatePaths: () => myLegitimatePaths,
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
        onClick={() => props.onPieceClick(id, location)}
        style={styles}
      >
        {name}, {id} At {location} 
      </button>
    </div>
  );  
}


export default Piece
