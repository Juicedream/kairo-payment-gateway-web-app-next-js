import Lottie from 'lottie-react';
import animationData from '../public/success-animation.json';

function Success() {
  return (
    <Lottie 
        animationData={animationData}
        loop={false}
        autoPlay={true}
        style= {{width: 400, height: 400}}
    />
  )
}

export default Success