import Lottie from 'lottie-react'
import SearchNotFound from '../../../assets/animation/search_not_found.json'

function SearchNotFoundAnimation() {
    return (
        <Lottie
            animationData={SearchNotFound}
            loop={true}
            autoplay={true}
            style={{ width: '250px', height: '250px', color: '#FFFFFF' }}
        />
    )
}

export default SearchNotFoundAnimation
