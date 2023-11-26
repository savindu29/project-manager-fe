import React from 'react';
import MiniDrawer from '../../layout';

const OtherNotes = ({details}:any) => {
  return (
    <div className='h-56'>
      <div >
        <h1 className='mt-4'>Clarification Discussion Details  </h1>
        <p className="ml-2 mt-2">
            <span className="text-sky-500">{details.cdDetails || "Empty"}</span>
          </p>
      </div>
      <div>
        <h1 className='mt-4'>Lessons Learned</h1>
        <p className="ml-2 mt-2">
            <span className="text-sky-500">{details.lessonsLearned || 'Empty'}</span>
          </p>
      </div>
    </div>
  );
};

export default OtherNotes;
