import { forwardRef, use, useEffect, useImperativeHandle, useState, useContext} from 'react'
import './App.css'
import { ThemeContext } from './context/ThemeContext'

function Piece(props) {
  //const MyPiece = forwardRef((props, ref) => {
  const [id, setId] = useState(props.id)  // setId('0')
  const [color, setColor] = useState(props.color)
  const [name, setName] = useState(props.name)
  const [location, setLocation] = useState(props.location)
  const [legitimatePaths, setLegitimatePaths] = useState([0, 8, 16, 24 ])  // array of legitimate locations for me to move
  const { theme } = useContext(ThemeContext);


  useEffect(() => {
   // console.log('Piece useEffect called with id:', props.id)
   console.log('Board in Piece useEffect:', props.board.map(p => p.name));
    setId(props.id)
    setName(props.name)
    setColor(props.color)
    setLocation(props.location)

    //check the name and set the legitimate paths .......
    if (props.name === 'Rook') {

      
      const loc = props.location;
      const row = Math.floor(loc / 8);
      const col = loc % 8;
      let paths = [];
      const directions = [
        { dr: -1, dc: 0 }, // up
        { dr: 1, dc: 0 },  // down
        { dr: 0, dc: -1 }, // left
        { dr: 0, dc: 1 },  // right
      ];

      for (const { dr, dc } of directions) {
        let r = row + dr;
        let c = col + dc;

        while (r >= 0 && r < 8 && c >= 0 && c < 8) {
          const index = r * 8 + c;
          const targetPiece = props.board[index]; // Piece object or "Empty"

          if (targetPiece.name === 'Empty') {
            paths.push(index);
          } else if (targetPiece.color !== props.color) {
            // Enemy: capture allowed
            paths.push(index);
            break;
          } else {
            // Ally: blocked
            break;
          }

          r += dr;
          c += dc;
        }
        
       
      } 

      setLegitimatePaths(paths);
    }
    else if (props.name === 'Pawn') {
      const loc = props.location;
      const row = Math.floor(loc / 8);
      const col = loc % 8;
      const board = props.board;

      let paths = [];
      const direction = props.color === 'red' ? 1 : -1; // red moves down, grey moves up

      // Forward one step
      const forwardIndex = loc + direction * 8;
      if (forwardIndex >= 0 && forwardIndex < 64 && board[forwardIndex].name === 'Empty') {
        paths.push(forwardIndex);

        // Forward two steps only if on starting row
        const startingRow = props.color === 'red' ? 1 : 6;
        const forwardTwoIndex = loc + direction * 16;
        if (row === startingRow && board[forwardTwoIndex].name === 'Empty') {
          paths.push(forwardTwoIndex);
        }
      }

      // Captures diagonally
      const captureLeft = loc + direction * 8 - 1;
      const captureRight = loc + direction * 8 + 1;

      // Check left diagonal capture
      if (
        captureLeft >= 0 &&
        captureLeft < 64 &&
        (captureLeft % 8) !== 7 && // prevent wraparound from col 0 to 7
        board[captureLeft].name !== 'Empty' &&
        board[captureLeft].color !== props.color
      ) {
        paths.push(captureLeft);
      }

      // Check right diagonal capture
      if (
        captureRight >= 0 &&
        captureRight < 64 &&
        (captureRight % 8) !== 0 && // prevent wraparound from col 7 to 0
        board[captureRight].name !== 'Empty' &&
        board[captureRight].color !== props.color
      ) {
        paths.push(captureRight);
      }

      setLegitimatePaths(paths);
    }
    else {
      setLegitimatePaths([]) // Default case or for other players
    }
  } , [props])


  
  useImperativeHandle(props.ref, () => ({
    getName: () => props.name,
    getLegitimatePaths: () => legitimatePaths,
  }))

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
