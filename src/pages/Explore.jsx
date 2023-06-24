import React from 'react'
import { Link } from 'react-router-dom'
import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg'
import sellCategoryImage from '../assets/jpg/sellCategoryImage.jpg'
import Slider from '../components/Slider'

function Explore() {
  return (
    <div className='explore'>
      <header className='pageHeader'>
        Explore Properties
      </header>
      <main>
        {/*Slider */}
        <Slider />

        <p className='exploreCategoryHeading'>
          Categories
        </p>
        <div className="exploreCategories">
          <Link to='/category/rent'>
            <img 
            src={rentCategoryImage} 
            alt='Rent Category'
            className='exploreCategoryImg'
            />
            <p
            className='exploreCategoryName'
            >
              Places on Rent
            </p>
          </Link>
          <Link to='/category/sale'>
            <img 
            src={sellCategoryImage} 
            alt='Rent Category'
            className='exploreCategoryImg'
            />
            <p
            className='exploreCategoryName'
            >
              Places for Sale
            </p>
          </Link>
        </div>

      </main>
    </div>
  )
}

export default Explore