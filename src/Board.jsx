import React from 'react';
import Piece from './Piece.jsx';
import { ThemeContext } from './context/ThemeContext';
import { useContext } from 'react';

const Board = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [selectedId, setSelectedId] = React.useState(null);
  const [legalMoves, setLegalMoves] = React.useState([]);


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
        { id: '0', name: 'Rook', color: 'red' },
        { id: '1', name: 'Knight', color: 'red' },
        { id: '2', name: 'Bishop', color: 'red' },
        { id: '3', name: 'Queen', color: 'red' },
        { id: '4', name: 'King', color: 'red' },
        { id: '5', name: 'Bishop', color: 'red' },
        { id: '6', name: 'Knight', color: 'red' },
        { id: '7', name: 'Rook', color: 'red' },
      
        // Row 2 (Red pawns)
        { id: '8', name: 'Pawn', color: 'red' },
        { id: '9', name: 'Pawn', color: 'red' },
        { id: '10', name: 'Pawn', color: 'red' },
        { id: '11', name: 'Pawn', color: 'red' },
        { id: '12', name: 'Pawn', color: 'red' },
        { id: '13', name: 'Pawn', color: 'red' },
        { id: '14', name: 'Pawn', color: 'red' },
        { id: '15', name: 'Pawn', color: 'red' },
      
        // Rows 3-6 (Empty spaces)
        ...Array(32).fill(null).map((_, index) => ({
          id: `${16 + index}`,
          name: 'Empty',
          color: 'green',
        })),
      
        // Row 7 (Grey pawns)
        { id: '48', name: 'Pawn', color: 'grey' },
        { id: '49', name: 'Pawn', color: 'grey' },
        { id: '50', name: 'Pawn', color: 'grey' },
        { id: '51', name: 'Pawn', color: 'grey' },
        { id: '52', name: 'Pawn', color: 'grey' },
        { id: '53', name: 'Pawn', color: 'grey' },
        { id: '54', name: 'Pawn', color: 'grey' },
        { id: '55', name: 'Pawn', color: 'grey' },
      
        // Row 8 (Grey pieces)
        { id: '56', name: 'Rook', color: 'grey' },
        { id: '57', name: 'Knight', color: 'grey' },
        { id: '58', name: 'Bishop', color: 'grey' },
        { id: '59', name: 'Queen', color: 'grey' },
        { id: '60', name: 'King', color: 'grey' },
        { id: '61', name: 'Bishop', color: 'grey' },
        { id: '62', name: 'Knight', color: 'grey' },
        { id: '63', name: 'Rook', color: 'grey' },
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



    const handleChildClick = (clicked_id) => {
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
      if (legalMoves.includes(clickedId)) {
        const newPieces = [...pieces];
        newPieces[clickedId] = pieces[selectedId];
        newPieces[selectedId] = { id: `${selectedId}`, name: 'Empty', color: 'green' };
    
        setPieces(newPieces);
      }
    
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
    <div>
      <h1>Chess Board</h1>
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
            id={index}
            myname={piece.name}
            color={piece.color}
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
    
  );
};

export default Board;