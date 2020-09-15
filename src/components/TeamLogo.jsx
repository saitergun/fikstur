import React, { useState, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';

const TeamLogo = ({ src, alt, size }) => {
  const [width, setWidth] = useState('24px');
  const [height, setHeight] = useState('24px');

  useLayoutEffect(() => {
    switch(size) {
      case 'md':
        setWidth('48px');
        setHeight('48px');
        break;
      case 'lg':
        setWidth('72px');
        setHeight('72px');
        break;
      default:
    }
  }, [size]);

  if (!src) {
    return null;
  }

  return (
    <figure>
      <img
        style={{ width, height }}
        src={src}
        alt={alt}
      />
    </figure>
  );
};

TeamLogo.defaultProps = {
  src: null,
  alt: null,
  size: null,
}

TeamLogo.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  size: PropTypes.oneOf(['md', 'lg']),
}

export default TeamLogo;
