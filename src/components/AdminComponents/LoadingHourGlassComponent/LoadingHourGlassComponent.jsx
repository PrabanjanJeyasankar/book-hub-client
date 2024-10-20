import './LoadingHourGlassComponent.css'
function LoadingHourGlassComponent() {
    return (
        <div className='loading-overlay'>
            <div className='hourglassBackground'>
                <div className='hourglassContainer'>
                    <div className='hourglassCurves'></div>
                    <div className='hourglassCapTop'></div>
                    <div className='hourglassGlassTop'></div>
                    <div className='hourglassSand'></div>
                    <div className='hourglassSandStream'></div>
                    <div className='hourglassCapBottom'></div>
                    <div className='hourglassGlass'></div>
                </div>
            </div>
        </div>
    )
}

export default LoadingHourGlassComponent
