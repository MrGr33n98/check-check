import React, { useState, useEffect, useCallback, useRef } from 'react';
import styles from './styles.module.css';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'md', color = 'border-blue-500', className = '' }) => {
  const sizeClasses = {
    sm: 'h-5 w-5',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className={`${styles.spinner} ${sizeClasses[size]} ${color} ${className}`} />
  );
};

export default Spinner;
