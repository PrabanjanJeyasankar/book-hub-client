import React from 'react'
import './HeroComponent.css'
import SearchFormComponent from '../SearchFormComponent/SearchFormComponent'
import HeroFeedComponent from '../HeroFeedComponent/HeroFeedComponent'

function HeroComponent() {
    return (
        <React.Fragment>
            <div className='hero-outer-container'>
                {/* <NavBarComponent /> */}
                <div className='hero-container'>
                    <div className='hero-section'>
                        <div className='hero-content'>
                            <div className='hero-title'>
                                Find your next literary love
                            </div>
                            <div className='hero-text'>
                                Welcoming book lovers unite to discover their
                                next favorite read.
                            </div>
                        </div>
                        <SearchFormComponent />
                    </div>
                </div>
            </div>
            <div className='hero-feed'>
            
                <HeroFeedComponent />
            </div>
        </React.Fragment>
    )
}

export default HeroComponent
