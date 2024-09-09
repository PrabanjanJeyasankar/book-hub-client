import React, { useEffect } from 'react'
import './HeroComponent.css'
import { Search } from 'lucide-react'
import SearchFormComponent from '../SearchBarComponent/SearchBarComponent'
import HeroFeedComponent from '../HeroFeedComponent/HeroFeedComponent'
import book3DAsset from '../../assets/img/book_3d_assets_2.png'

function HeroComponent() {
    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = e.clientX
            const y = e.clientY
            const windowWidth = window.innerWidth
            const windowHeight = window.innerHeight

            const offsetX = (x / windowWidth - 0.5) * 25
            const offsetY = (y / windowHeight - 0.5) * 25

            const image = document.querySelector('.hero-book-3d-asset')
            if (image) {
                image.style.transform = `translate(${offsetX}px, ${offsetY}px)`
            }
        }

        window.addEventListener('mousemove', handleMouseMove)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [])

    return (
        <React.Fragment>
            <div className='hero-outer-container'>
                <div className='hero-container'>
                    <div className='hero-section-left'>
                        <div className='hero-content'>
                            <div className='hero-title'>
                                Discover the Book That Won&#8217;t Judge You.
                            </div>
                            <div className='hero-description'>
                                Search effortlessly, Start Reading.
                            </div>
                        </div>
                        <div>
                            <SearchFormComponent />
                        </div>
                    </div>
                    <div className='hero-content-right'>
                        <img
                            className='hero-book-3d-asset'
                            src={book3DAsset}
                            alt='landing-3d-image'
                        />
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
