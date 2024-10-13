import tipologi from './tipologi.json';
import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { codes,talents:userTalents } = req.body; //codes sebagai userset

        if(codes.length>2||codes.length<8){
            const codesSet=new Set(codes); // Konversi input user menjadi set untuk kemudahan perbandingan
            const recommendations=[];

            // mengambil data dari datajurusan.json, serverside
            const filePath = path.join(process.cwd(), 'public', 'datajurusan.json');
            const fileContents = await fs.readFile(filePath, 'utf8');
            const jurusanData = JSON.parse(fileContents);//dataset dari database
            // Proses setiap entry dalam dataset
            // Proses setiap entry dalam dataset
            for (const [key, jurusan] of Object.entries(jurusanData)) {
                const jurusanDataSet = new Set(key.split(' ')); // Konversi komposisi bakat dataset menjadi set
                const intersection = [...codesSet].filter(item => jurusanDataSet.has(item)); // Hitung kecocokan

                // Hitung persentase kecocokan berdasarkan dataset
                const percentageMatch = (intersection.length / jurusanDataSet.size) * 100;

                // Simpan hasil dengan persentase kecocokan
                recommendations.push({
                    jurusan, // Rekomendasi jurusan
                    percentageMatch, // Persentase kecocokan
                    matchedTalents: intersection // Bakat yang cocok
                });
            }
        
        // Urutkan hasil berdasarkan persentase kecocokan tertinggi
        const sortedRecommendations = recommendations.sort((a, b) => b.percentageMatch - a.percentageMatch);
        // console.log(sortedRecommendations)

        const sortedData = []; //code AMB ADM dll
        const talentCount = {};
        const kelompokCount = {}; // Untuk menghitung frekuensi kategori

         // Jika 'codes' dikirim, lakukan pencarian berdasarkan 'codes'
         if (codes && codes.length > 0) {
            codes.forEach(code => {
                if (tipologi[code]) {
                    const { activities, roles, talents, category,kelompok } = tipologi[code];
                    sortedData.push({ code, activities, roles, talents, category,kelompok });

                    // Hitung frekuensi setiap talent yang ditemukan dari 'codes'
                    talents.forEach(talent => {
                        talentCount[talent] = (talentCount[talent] || 0) + 1;
                    });

                    // Hitung frekuensi setiap kategori
                kelompokCount[kelompok] = (kelompokCount[kelompok] || 0) + 1;
                }
                
            });
            
        }

        // Jika 'userTalents' dikirim, lakukan pencarian berdasarkan 'talents'
        if (userTalents && userTalents.length > 0) {
            Object.keys(tipologi).forEach(code => {
                const { activities, roles, talents, category,kelompok } = tipologi[code];

                // Cek apakah talents dari user ada di talents tipologi ini
                const matchingTalents = talents.filter(talent => userTalents.includes(talent));

                if (matchingTalents.length > 0) {
                    sortedData.push({ code, activities, roles, talents, category,kelompok });

                    // Hitung frekuensi setiap talent yang cocok
                    matchingTalents.forEach(talent => {
                        talentCount[talent] = (talentCount[talent] || 0) + 1;
                    });
                    // Hitung frekuensi setiap kategori
                kelompokCount[kelompok] = (kelompokCount[kelompok] || 0) + 1;
                }
                
            });
        }

        // Urutkan talents berdasarkan frekuensi kemunculan
        const sortedTalents = Object.entries(talentCount)
            .sort((a, b) => b[1] - a[1]) // Urutkan dari yang paling banyak muncul
            .map(([talent]) => talent); // Ambil hanya nama talent
        // Hitung persentase setiap kategori
        const totalItems = sortedData.length;
        const kelompokPercentages = Object.keys(kelompokCount).map(kelompok => {
            const count = kelompokCount[kelompok];
            const percentage = ((count / totalItems) * 100).toFixed(2); // Hitung persentase dan batasi hingga 2 angka desimal
            return [ kelompok, percentage ];
        });
    
        res.status(200).json({ sortedData, sortedTalents,kelompokPercentages,sortedRecommendations });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
    } //tutup if
}
