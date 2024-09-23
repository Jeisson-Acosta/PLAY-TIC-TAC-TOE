export const Square = ({children, isSelected, updateBoard, index}) => {

    const className = isSelected ? 'square is-selected' : 'square'
    const handleClickSquare = () => {
      updateBoard(index)
    }
  
    return(
  
      <div className={className} onClick={handleClickSquare}>
        {children}
      </div>
  
    )
}