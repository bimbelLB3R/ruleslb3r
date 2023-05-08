import React, { Component } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Welcome from './Welcome';
import Image from 'next/image';

export default class ImageSlide extends Component {
  render() {
    return (
      <div className="flex items-center justify-center">
        <div className="md:max-w-2xl  overflow-hidden">
          {/* <h2>NextJs Carousel - GeeksforGeeks</h2> */}
          <Carousel showArrows={true} showThumbs={false}>
            <div>
              <Image
                src="/image/image1.webp"
                alt="Foto Seminar Bakat"
                width="500px"
                height="500px"
              />
              {/* <img src="image/image1.webp" alt="Foto Seminar Bakat" /> */}
              <p className="legend">SEMINAR BAKAT DAN PEMILIHAN JURUSAN</p>
            </div>
            <div>
              <Image
                src="/image/image2.webp"
                alt="Foto Kelas Programming"
                width="500px"
                height="500px"
              />
              {/* <img src="image/image2.webp" alt="Foto Kelas Programming" /> */}
              <p className="legend">KELAS PEMROGRAMAN WEB</p>
            </div>
            <div>
              <Image
                src="/image/image3.webp"
                alt="Foto Kelas UTBK"
                width="500px"
                height="500px"
              />
              {/* <img src="image/image3.webp" alt="Foto Kelas UTBK" /> */}
              <p className="legend">KELAS INTENSIF UTBK SNBT</p>
            </div>
            <div>
              <Image
                src="/image/image4.webp"
                alt="Foto Kantor Bimbel"
                width="500px"
                height="500px"
              />
              {/* <img src="image/image4.webp" alt="Foto Kantor Bimbel" /> */}
              <p className="legend">KANTOR UTAMA BIMBEL LB3R</p>
            </div>
            <div>
              <Image
                src="/image/image5.webp"
                alt="Foto presensi QRcode"
                width="500px"
                height="500px"
              />
              {/* <img src="image/image5.webp" alt="Foto presensi QRcode" /> */}
              <p className="legend">PRESENSI DENGAN QRQODE </p>
            </div>
            <div>
              <Image
                src="/image/image6.webp"
                alt="Foto Pengajar"
                width="500px"
                height="500px"
              />
              {/* <img src="image/image6.webp" alt="Foto Pengajar LB3R" /> */}
              <p className="legend">BEBERAPA PENGAJAR PEREMPUAN DI LB3R</p>
            </div>
            <div>
              <Image
                src="/image/image7.webp"
                alt="Foto Siswa Ultah"
                width="500px"
                height="500px"
              />
              {/* <img src="image/image7.webp" alt="Foto Siswa LB3R Ultah" /> */}
              <p className="legend">SALAH SATU SISWA MERAYAKAN ULANG TAHUN</p>
            </div>
          </Carousel>
          <Welcome />
        </div>
      </div>
    );
  }
}
