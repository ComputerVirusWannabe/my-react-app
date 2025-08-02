import React from 'react';
import MyPiece from './MyPiece.jsx';
import { ThemeContext } from './context/ThemeContext';
import { useContext } from 'react';

const Board = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [selectedId, setSelectedId] = React.useState(null);

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
        if (index === selectedId) return 'yellow'; // highlight selected square
      
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

    /*
    const handleGetId = (index) => {
        if (arrayOfChildRefs.current[index]) {
          const id = arrayOfChildRefs.current[index].getId();
          console.log('ID of child at index', index, 'is:', id);
        } else {
          console.log('No ref found for index', index);
        }
      };
      */

      /*
      const handleGetId = (index) => {
        if (arrayOfChildRefs.current[index]) {
          const id = arrayOfChildRefs.current[index].getId();
          console.log('ID of child at index', index, 'is:', id);
        } else {
          console.log('No ref found for index', index);
        }
      };
      */

      /*
    const handleChildClick = (clickedId) => {
        console.log('child called this function  .....:');
        console.log('Piece clicked with id:', clickedId);
        // look for empty spaces and change their color to yellow
        const updatedPieces = pieces.map(piece =>
            piece.name === 'Empty' ? { ...piece, color: 'yellow' } : piece  
        );
        // go through the arrayOfChildRefs and change the color of the
        // empty pieces to yellow
        arrayOfChildRefs.current.forEach((childRef, index) => {
            if (childRef && pieces[index].name === 'Empty') {
                childRef.changeColor('yellow');
            }
        });

        //console.log('Updated pieces:', updatedPieces);
        // filter out the pieces with yellow color
        //setPieces(updatedPieces); 
        
        if (arrayOfChildRefs.current[3]) {
           arrayOfChildRefs.current[3].changeColor("yellow");
             
        }
        

         // For example, you could change the color of the piece or perform some action
    }   // iterate over the pieces and update the color of all the pieces to yellow
    // console.log('set_Pieces called with pieces:', pieces);
   
    */



    const handleChildClick = (clicked_id) => {
      console.log('Child clicked with id:', clicked_id);
      console.log('Selected ID before click:', selectedId);
      if (selectedId !== null) {
        if (clicked_id === selectedId) {
          console.log('Clicked the same piece, deselecting it.');
          setSelectedId(null);
          return;
        }
        console.log('Selected ID after click:', selectedId);
      }

      const clickedId = parseInt(clicked_id);
    
      if (selectedId === null) {
        // First click — select the piece if it's not empty
        if (pieces[clickedId].name !== 'Empty') {
          setSelectedId(clickedId);
        }
      } else {
        // Second click — move the piece
        const newPieces = [...pieces];
        //check clickedId for postion legitimacy
        
        // Move the piece
        newPieces[clickedId] = pieces[selectedId];
        
        // Clear the original square
        newPieces[selectedId] = { id: `${selectedId}`, name: 'Empty', color: 'orange' };
    
        setPieces(newPieces);
        setSelectedId(null);
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
          <MyPiece
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