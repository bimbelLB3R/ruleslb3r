import Image from 'next/image';
import React from 'react';
import LikertAssessment from './LikertAsesment';

const CanvaEmbed = () => {
  return (
    <div className='flex items-center justify-center w-full m-2  p-1'>
        <div>
        <Image width={300} height={300} className='lg:w-[500px] lg:h-[500px]' alt='design1' src='/image/design1.svg'/>
        <p className='line-through text-center decoration-red-800'>Bingung mau kuliah apa</p>
        <p className='line-through text-center decoration-red-800'>Tidak yakin dengan profesi yang akan diambil</p>
        <p className='line-through text-center decoration-red-800'>Bingung posisi yang pas di organisasi sekolah</p>
        <p className='line-through text-center decoration-red-800'>Minder/kurang PD</p>
        <p className='line-through text-center decoration-red-800'>Tidak tahu kekuatan/kelemahan diri sendiri</p>
        <div className='flex items-center justify-center'>
            {/* <p className='text-center font-roboto '>Kenali dirimu yuk...</p> */}
        <LikertAssessment/>
          
        </div>
        </div>
    </div>
      
  );
};

export default CanvaEmbed;
