import React from 'react';

const BackgroundImage = ({ imageUrl, children }) => {
  const styles = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100vw',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: -1,
    margin: 0,
    padding: 0,
    overflow: 'hidden'
  };

  return <div className="background-image" style={styles}>{children}</div>;
};

export default BackgroundImage;
