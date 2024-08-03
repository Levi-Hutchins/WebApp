import React from 'react'
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Search';
const SendButton = (props) => {
  return (
    <div>
      <Button variant="contained" endIcon={<SendIcon />} className='SearchButton' onClick={() => {alert(props.inputData)}}>
        {props.displayValue}
      </Button>
    </div>
  )
}

export default SendButton
