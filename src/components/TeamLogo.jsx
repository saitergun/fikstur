import React, { useState, useLayoutEffect } from 'react';

import { Link } from 'react-router-dom';

const TeamLogo = ({ src, title, href, size }) => {
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

  if (!href) {
    return (
      <figure>
        <img
          style={{ width, height }}
          src={src}
          alt={title}
        />
      </figure>
    );
  }

  return (
    <Link
      to={href}
      title={title}
    >
      <figure>
        <img
          style={{ width, height }}
          src={src}
          alt={title}
        />
      </figure>
    </Link>
  );
};

export default TeamLogo;
