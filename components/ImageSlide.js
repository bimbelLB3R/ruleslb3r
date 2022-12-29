import React, { Component } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Welcome from './Welcome';

export default class ImageSlide extends Component {
  render() {
    return (
      <div className="flex items-center justify-center">
        <div className="md:max-w-2xl  overflow-hidden">
          {/* <h2>NextJs Carousel - GeeksforGeeks</h2> */}
          <Carousel>
            <div>
              <img src="image/image1.svg" alt="image1" />
              <p className="legend">SEMINAR BAKAT SMA N 1 TANJUNG</p>
            </div>
            <div>
              <img src="image/image2.svg" alt="image2" />
              <p className="legend">KELAS PEMROGRAMAN WEBSITE</p>
            </div>
            <div>
              <img src="image/image3.svg" alt="image3" />
              <p className="legend">TRY OUT UJIAN MASUK KAMPUS</p>
            </div>
            <div>
              <img src="image/image4.svg" alt="image4" />
              <p className="legend">KANTOR UTAMA BIMBEL LB3R</p>
            </div>
            <div>
              <img src="image/image5.svg" alt="image4" />
              <p className="legend">PENERAPAN TEKNOLOGI TERKINI </p>
            </div>
            <div>
              <img src="image/image6.svg" alt="image4" />
              <p className="legend">BEBERAPA PENGAJAR PEREMPUAN DI LB3R</p>
            </div>
            <div>
              <img src="image/image7.svg" alt="image4" />
              <p className="legend">SALAH SATU SISWA MERAYAKAN ULANG TAHUN</p>
            </div>
          </Carousel>
          <Welcome />
        </div>
      </div>
    );
  }
}
