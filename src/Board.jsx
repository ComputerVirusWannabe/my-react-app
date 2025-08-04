import React from 'react';
import Piece from './Piece.jsx';
import { ThemeContext } from './context/ThemeContext';
import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Board = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [selectedId, setSelectedId] = React.useState(null);
  const [legalMoves, setLegalMoves] = React.useState([]);

  const [pair, setPair] = React.useState({source: null, target: null});

  const boardStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(8, 1fr)',
    width: 'fit-content',
    margin: 'auto',
    padding: '10px',
    backgroundColor: theme === 'dark' ? '#222' : '#f8f8f8',
    border: `2px solid ${theme === 'dark' ? '#444' : '#ccc'}`
  };

  console.log('Board component rendered with theme:', theme);
    const arrayOfChildRefs = React.useRef([]); // Create a ref to store child component references
    const [pieces, setPieces] = React.useState([
        // Row 1 (Red pieces)
        { id: uuidv4(), name: 'Rook', color: 'red' },
        { id: uuidv4(), name: 'Knight', color: 'red' },
        { id: uuidv4(), name: 'Bishop', color: 'red' },
        { id: uuidv4(), name: 'Queen', color: 'red' },
        { id: uuidv4(), name: 'King', color: 'red' },
        { id: uuidv4(), name: 'Bishop', color: 'red' },
        { id: uuidv4(), name: 'Knight', color: 'red' },
        { id: uuidv4(), name: 'Rook', color: 'red' },
        { id: uuidv4(), name: 'Pawn', color: 'red' },
        { id: uuidv4(), name: 'Pawn', color: 'red' },
        { id: uuidv4(), name: 'Pawn', color: 'red' },
        { id: uuidv4(), name: 'Pawn', color: 'red' },
        { id: uuidv4(), name: 'Pawn', color: 'red' },
        { id: uuidv4(), name: 'Pawn', color: 'red' },
        { id: uuidv4(), name: 'Pawn', color: 'red' },
        { id: uuidv4(), name: 'Pawn', color: 'red' },
      
        // Rows 3-6 (Empty spaces)
        ...Array(32).fill(null).map((_, index) => ({
          id: uuidv4(),
          name: 'Empty',
          color: 'green',
        })),
      
        // Row 7 (Grey pawns)
        { id: uuidv4(), name: 'Pawn', color: 'grey' },
        { id: uuidv4(), name: 'Pawn', color: 'grey' },
        { id: uuidv4(), name: 'Pawn', color: 'grey' },
        { id: uuidv4(), name: 'Pawn', color: 'grey' },
        { id: uuidv4(), name: 'Pawn', color: 'grey' },
        { id: uuidv4(), name: 'Pawn', color: 'grey' },
        { id: uuidv4(), name: 'Pawn', color: 'grey' },
        { id: uuidv4(), name: 'Pawn', color: 'grey' },
        { id: uuidv4(), name: 'Rook', color: 'grey' },
        { id: uuidv4(), name: 'Knight', color: 'grey' },
        { id: uuidv4(), name: 'Bishop', color: 'grey' },
        { id: uuidv4(), name: 'Queen', color: 'grey' },
        { id: uuidv4(), name: 'King', color: 'grey' },
        { id: uuidv4(), name: 'Bishop', color: 'grey' },
        { id: uuidv4(), name: 'Knight', color: 'grey' },
        { id: uuidv4(), name: 'Rook', color: 'grey' },
      ]);

      const getSquareColor = (index) => {
        if (index === selectedId) return 'yellow';
        if (legalMoves.includes(index)) return 'lightgreen';
      
        const row = Math.floor(index / 8);
        const col = index % 8;
        const isLightSquare = (row + col) % 2 === 0;
      
        return theme === 'dark'
          ? (isLightSquare ? '#769656' : '#EEEED2')
          : (isLightSquare ? '#f0d9b5' : '#b58863');
      };
      
      
      
      
    const boardGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(8, 1fr)',
    gridTemplateRows: 'repeat(8, 1fr)',
    width: '1500px',
    height: '1500px',
    border: '2px solid black',
    gap: '1px',
    };


    const handleChildClick = (clicked_id, clicked_location) => {
        console.log('Clicked piece with id:', clicked_id, ' at location:', clicked_location);
        if (pair.source === null) {  // clicked first piece
            console.log('First piece clicked:', clicked_id);
            //setPair({ source: clicked_id, target: null });
            setPair({ source: {id: clicked_id, location: clicked_location}, target: null });
            // highlight the clicked piece
            arrayOfChildRefs.current[clicked_location].changeColor('yellow');
        }
        else if (pair.target === null) {  // clicked second piece
            console.log('Second piece clicked, current pair = ', pair);
            setPair({...pair, target: {id: clicked_id, location: clicked_location} });
            arrayOfChildRefs.current[clicked_location].changeColor('cyan');
            // Call the parent function to handle the move
            // look in the source piece and get the legitimate paths
            const legitimatePaths = arrayOfChildRefs.current[pair.source.location].getLegitimatePaths();
            console.log('Legitimate paths for source piece:', legitimatePaths);
        

            if (legitimatePaths.includes(clicked_location)) {
                console.log('Legitimate: Moving piece from', pair.source.location, 'to', clicked_location);
                    //
            // if target is in the legitimate paths of source,, then move the source piece to target location
            // by  moving the piece in the pieces state (array) and update its location acordingly
            // in the pieces state, move the piece from pair.source.location to clicked_location
            const newPieces = [...pieces];
            
            newPieces[clicked_location] = pieces[pair.source.location];
            newPieces[pair.source.location] = { id: `${pair.source.location}`, name: 'Empty', color: 'green' };
            setPieces(newPieces);
                // reset the pair
                setPair({ source: null, target: null });
            } else {
                console.log('Illegimate, Invalid move, target location not in legitimate paths');
            }
        }
        //console.log('Current pair:', pair);
    };

    const handleChildClick_old = (clicked_id) => {
      const clickedId = parseInt(clicked_id);
      console.log('Clicked piece at index:', clickedId);
    
      // Deselect if clicking the selected piece
      if (selectedId === clickedId) {
        setSelectedId(null);
        setLegalMoves([]);
        return;
      }
    
      // If no piece selected yet
      if (selectedId === null) {
        if (pieces[clickedId].name !== 'Empty') {
          setSelectedId(clickedId);
    
          // If it's a pawn, calculate legal moves
          const piece = pieces[clickedId];
          if (piece.name === 'Pawn') {
            const forwardDir = piece.color === 'red' ? 1 : -1;
            const oneStep = clickedId + 8 * forwardDir;
            const twoStep = clickedId + 16 * forwardDir;
            const legal = [];
    
            if (pieces[oneStep] && pieces[oneStep].name === 'Empty') {
              legal.push(oneStep);
              // Allow 2-step if on initial rank
              const startRow = piece.color === 'red' ? 1 : 6; //1 for red pawn line, 6 for grey pawn line
              const row = Math.floor(clickedId / 8);
              if (row === startRow && pieces[twoStep] && pieces[twoStep].name === 'Empty') {
                legal.push(twoStep);
              }
            }
    
            setLegalMoves(legal);
          } else if (piece.name === 'Rook') {
            const legal = [];
            const directions = [-1, 1, -8, 8]; // left, right, up, down
            const startRow = Math.floor(clickedId / 8);
          
            for (const step of directions) {
              let nextId = clickedId;
          
              while (true) {
                nextId += step;
          
                // Stop if out of bounds
                if (nextId < 0 || nextId >= 64) break;
          
                // Prevent left/right wrap-around
                const nextRow = Math.floor(nextId / 8);
                if ((step === -1 || step === 1) && nextRow !== Math.floor((nextId - step) / 8)) break;
          
                const target = pieces[nextId];
          
                if (target.name === 'Empty') {
                  legal.push(nextId);
                } else {
                  if (target.color !== piece.color) {
                    legal.push(nextId); // Can capture opponent piece
                  }
                  break; // Stop on any piece
                }
              }
            }
          
            setLegalMoves(legal);
          }
          
        }
        return;
      }
    
      // Handle move
      //if (legalMoves.includes(clickedId)) {
      console.log('Moving piece from', selectedId, 'to', clickedId);
        const newPieces = [...pieces];
        newPieces[clickedId] = pieces[selectedId];
        newPieces[selectedId] = { id: `${selectedId}`, name: 'Empty', color: 'green' };
    
        setPieces(newPieces);
     // }
    
      setSelectedId(null);
      setLegalMoves([]);
    };
    
    


    const testfunction = () => {
        console.log('testfunction called');
        // iterate through the pieces state and change the names of the pieces
        const updatedPieces = pieces.map((piece, index) => ({
            ...piece,
            name: `Piece ${index + 1}` // Change the name of each piece
        }));
        console.log('****** Updated pieces:', updatedPieces);
        setPieces(updatedPieces);
    }
  return (
    <>
    <div>DEBUG AREA
      Pair: {JSON.stringify(pair)}
      <br />
    </div>
    <div>
      <h3>Chess Board</h3>
      <div style={boardGridStyle}>
      {pieces.map((piece, index) => (
        <div
          key={index}
          style={{
            backgroundColor: getSquareColor(index),
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Piece
            id={piece.id}
            myname={piece.name}
            color={piece.color}
            location={index}
            onPieceClick={handleChildClick}
            ref={(el) => (arrayOfChildRefs.current[index] = el)}
          />
        </div>
      ))}
      
      </div>
      <button onClick = {testfunction}>Test Function</button>
      <button onClick={toggleTheme}>
        Toggle Theme (current: {theme})
      </button>
    </div>
    </>
  );
};

export default Board;