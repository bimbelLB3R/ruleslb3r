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
          <Carousel>
            <div>
              {/* <Image
                src="/image/image1.png"
                alt="Foto Seminar Bakat"
                layout="fill"
              /> */}
              <img src="image/image1.png" alt="image1" />
              <p className="legend">SEMINAR BAKAT DAN PEMILIHAN JURUSAN</p>
            </div>
            <div>
              <img src="image/image2.png" alt="image2" />
              <p className="legend">KELAS PEMROGRAMAN WEB</p>
            </div>
            <div>
              <img src="image/image3.png" alt="image3" />
              <p className="legend">KELAS INTENSIF UTBK SNBT</p>
            </div>
            <div>
              <img src="image/image4.png" alt="image4" />
              <p className="legend">KANTOR UTAMA BIMBEL LB3R</p>
            </div>
            <div>
              <img src="image/image5.png" alt="image4" />
              <p className="legend">PRESENSI DENGAN QRQODE </p>
            </div>
            <div>
              <img src="image/image6.png" alt="image5" />
              <p className="legend">BEBERAPA PENGAJAR PEREMPUAN DI LB3R</p>
            </div>
            <div>
              <img src="image/image7.png" alt="image7" />
              <p className="legend">SALAH SATU SISWA MERAYAKAN ULANG TAHUN</p>
            </div>
          </Carousel>
          <Welcome />
        </div>
      </div>
    );
  }
}
