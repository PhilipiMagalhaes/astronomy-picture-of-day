import React from 'react';
import './styles.css';

export default function Footer(){
  const githubURL='https://github.com/philipimagalhaes';
  return(
    <div className='footer'>
    <strong>Developed by <a href={githubURL}>Philipi Magalhães</a></strong>
    </div>
  );
}