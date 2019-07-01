import React from 'react';

//props are passed as args if any
export default () => {
  return (
    <div>
      <h1 className="display-4"><span className='text-danger'>404 NOT FOUND!</span></h1>
      <p className='lead'>Sorry. The page doesn't exist.</p>
    </div>
  );
}