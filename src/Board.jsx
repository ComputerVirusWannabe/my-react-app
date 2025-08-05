import React from 'react';
import Piece from './Piece.jsx';
import { ThemeContext } from './context/ThemeContext';
import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Board = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [selectedId, setSelectedId] = React.useState(null);
  const [legalMoves, setLegalMoves] = React.useState([]);

  const [pair, setPair] = React.useState({source: null, target: null, player_name: null});


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
    
      // Clear previous highlights
      setSelectedId(null);
      setLegalMoves([]);
    
      if (pair.source === null) {
        console.log('First piece clicked:', clicked_id);
    
        // Save the selected piece
        setPair({ source: { id: clicked_id, location: clicked_location }, target: null , name: });
    
        // Highlight selected square
        setSelectedId(clicked_location);
    
        // Get and highlight legal move squares
        const legal = arrayOfChildRefs.current[clicked_location].getLegitimatePaths();
        setLegalMoves(legal);
    
      } else if (pair.target === null) {
        console.log('Second piece clicked, current pair = ', pair);
        setPair({ ...pair, target: { id: clicked_id, location: clicked_location } });
    
        const legitimatePaths = arrayOfChildRefs.current[pair.source.location].getLegitimatePaths();
        console.log('Legitimate paths:', legitimatePaths);
    
        if (legitimatePaths.includes(clicked_location)) {
          console.log('Valid move, updating board...');
          const newPieces = [...pieces];
          newPieces[clicked_location] = pieces[pair.source.location];
          newPieces[pair.source.location] = {
            id: `${pair.source.location}`,
            name: 'Empty',
            color: 'green',
          };
          setPieces(newPieces);
        } else {
          console.log('Invalid move');
        }
    
        // Reset everything
        setPair({ source: null, target: null });
        setSelectedId(null);
        setLegalMoves([]);
      }
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