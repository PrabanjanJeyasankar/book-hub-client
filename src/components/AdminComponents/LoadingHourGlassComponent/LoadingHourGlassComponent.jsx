import './LoadingHourGlassComponent.css' 
function LoadingHourGlassComponent() { 
    return ( 
        <div className='loading-overlay'> 
            <div className='hourglassBackground'> 
                <div className='hourglassContainer'> 
                    <div className='hourglassCurves' /> 
                    <div className='hourglassCapTop' /> 
                    <div className='hourglassGlassTop' /> 
                    <div className='hourglassSand' /> 
                    <div className='hourglassSandStream' /> 
                    <div className='hourglassCapBottom' /> 
                    <div className='hourglassGlass' /> 
                </div> 
            </div> 
        </div> 
    ) 
} 
 
export default LoadingHourGlassComponent 
