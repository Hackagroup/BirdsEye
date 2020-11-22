import React from 'react';
import Lottie from 'react-lottie';
import loader from './animations/loader.json';
import success from './animations/success.json';

// create a mapping between the passed variant and the associated json file
const variants = {
  loader,
  success,
};

function LottieAnimation({ variant, loop = false }) {
  return (
    <Lottie
      options={{
        animationData: variants[variant],
        loop,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice',
        },
      }}
      isClickToPauseDisabled
    />
  );
}

export default LottieAnimation;
