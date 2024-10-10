import tipologi from './tipologi.json';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { codes } = req.body;

        const sortedData = [];
        const talentCount = {};

        // Mengambil data berdasarkan urutan input user
        codes.forEach(code => {
            if (tipologi[code]) {
                const { activities, roles, talents, category } = tipologi[code];
                sortedData.push({ code, activities, roles, talents, category });

                // Hitung frekuensi setiap talent
                talents.forEach(talent => {
                    talentCount[talent] = (talentCount[talent] || 0) + 1;
                });
            }
        });

        // Urutkan talents berdasarkan frekuensi kemunculan
        const sortedTalents = Object.entries(talentCount)
            .sort((a, b) => b[1] - a[1]) // Urutkan dari yang paling banyak muncul
            .map(([talent]) => talent); // Ambil hanya nama talent

        res.status(200).json({ sortedData, sortedTalents });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
