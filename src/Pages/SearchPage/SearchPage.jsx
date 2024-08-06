import React from 'react'
import "@fontsource/archivo-black"; 

import InputBoxWithButton from '../../Components/InputBoxWithButton/InputBoxWithButton'
import './SearchPage.css'

const SearchPage = () => {
  return (
    <div>
        <div className='search-title'>
            <h1 style={{color: '#5e43f3'}}>FIND</h1>
            <h1 style={{color: 'white'}}> AN ITEM</h1>
        </div>

        <div className='components'>

        <InputBoxWithButton displayValue="Search For an Item"/>


        </div>

    </div>
  )
}

export default SearchPage
