import React from 'react';

const BlankPage = () => {
  const loadingImageURL = 'https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca.gif';

  return (
    <div className='flex w-full h-full justify-center items-center p-44'>
      <div className=' flex justify-center items-center center w-full '>
        {/* Use the loadingImageURL as the source for the img tag */}
        <img src={loadingImageURL} alt='Loading' className='w-20 h-20' />
        {/* Alternatively, use it as a background image */}
        {/* <div className='w-20 h-20' style={{ backgroundImage: `url(${loadingImageURL})` }}></div> */}
        {/* <p className='text-gray-300 text-5xl ml-4'>Loading</p> */}
      </div>
    </div>
  );
};

export default BlankPage;
