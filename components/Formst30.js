import { Button, Table, TextInput } from 'flowbite-react';
import Image from 'next/image';
import { useState,useEffect } from 'react';
import SpiderChart from './SpiderChart';
import PieChart from './PieChart';

export default function Formst30() {
    const [inputValue, setInputValue] = useState('');
    const [sortedData, setSortedData] = useState([]);
    const [sortedTalents, setSortedTalents] = useState([]);
    const [sortedKelompok, setSortedKelompok] = useState([]);
    const [rekomendasiJurusan, setRekomendasiJurusan] = useState([]);
    const [tooltip, setTooltip] = useState({ show: false, text: '' });
    const [colors, setColors] = useState([]);
    const [inputDuplikat,setInputDuplikat]=useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [activityDescriptions, setActivityDescriptions] = useState({}); // State for activity descriptions
    const [activeActivity, setActiveActivity] = useState(null); // Track which activity is active

    const fetchActivityDescription = async (activity) => {
        const response = await fetch('/activities.json'); // Adjust the path accordingly
        if (!response.ok) {
            console.error('Failed to fetch activity descriptions:', response.statusText);
            return;
        }
        const data = await response.json();
        setActivityDescriptions(data);
        // Set the tooltip text and make sure to clear the tooltip if it already shows
        setTooltip({ show: true, text: data[activity] || 'Description not available' });
    };

    const fetchCodeDescription = async (code) => {
        // console.log(code)
        const response = await fetch('/definition.json'); // Adjust the path accordingly
        if (!response.ok) {
            console.error('Failed to fetch code descriptions:', response.statusText);
            return;
        }
        const data = await response.json();
        setTooltip({ show: true, text: data[code] || 'Code description not available' });
    };
    // console.log(tooltip)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const inputs = inputValue.split(' ').map(item => item.trim()).filter(item => item !== '');
        const codesArray = [];
        const talentsArray = [];

    // Memisahkan codes dan talents
    inputs.forEach(item => {
        if (item.startsWith('#')) {
            // Jika diawali dengan '#', maka dianggap sebagai talent
            talentsArray.push(item.substring(1)); // Hapus tanda '#' di depan
        } else {
            // Selain itu, dianggap sebagai code
            codesArray.push(item);
        }
    });

    // Mengecek duplikat pada codesArray
    const uniqueCodes = new Set(codesArray);
    if (uniqueCodes.size !== codesArray.length) {
        setInputDuplikat(true)
        return;
    }

    // Mengecek duplikat pada talentsArray
    const uniqueTalents = new Set(talentsArray);
    if (uniqueTalents.size !== talentsArray.length) {
        setInputDuplikat(true)
        return;
    }

        const response = await fetch('/api/st30/getSortedTipologi', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ codes: codesArray, talents: talentsArray }),
        });
        const data = await response.json();
        setSortedData(data.sortedData);
        setSortedTalents(data.sortedTalents);
        setSortedKelompok(data.kelompokPercentages);
        setRekomendasiJurusan(data.sortedRecommendations)
        setIsSubmitted(true);
    };
    // console.log(sortedCategory)
    // Fungsi untuk menghasilkan warna acak dalam format hex
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };
    // Set warna acak untuk setiap kategori saat komponen pertama kali di-render
    useEffect(() => {
        const randomColors = sortedKelompok.map(() => getRandomColor());
        setColors(randomColors);
    }, [sortedKelompok]);

    const handleChange = (e) => {
        const inputValue = e.target.value; // Ambil nilai dari input form
        setInputValue(inputValue); // Simpan input value ke state
    
        // Pisahkan input berdasarkan spasi dan megatasi kelebihan spasi pada input user
        const inputs = inputValue.split(' ').map(item => item.trim()).filter(item => item !== '');
    
        const codesArray = [];
        const talentsArray = [];
    
        // Memisahkan codes dan talents
        inputs.forEach(item => {
            if (item.startsWith('#')) {
                talentsArray.push(item.substring(1)); // Hapus tanda '#'
            } else {
                codesArray.push(item);
            }
        });
    
        // Mengecek duplikat pada codesArray
        const uniqueCodes = new Set(codesArray);
        if (uniqueCodes.size !== codesArray.length) {
            setInputDuplikat(true);
            return;
        }
    
        // Mengecek duplikat pada talentsArray
        const uniqueTalents = new Set(talentsArray);
        if (uniqueTalents.size !== talentsArray.length) {
            setInputDuplikat(true);
            return;
        }
    
        // Jika tidak ada duplikat, hapus pesan error
        setInputDuplikat(false);
    };
    const imageSrc="/image/iconlb3r.png";
    // console.log(sortedTalents)
    return (
        <div>
            
            <div className="flex items-center justify-center m-10">
                <form onSubmit={handleSubmit} className='relative'>
                    <div className="flex items-center justify-center space-x-3">
                        <div className="relative">
                            <TextInput
                                type="text"
                                value={inputValue}
                                className='md:w-[500px]'
                                onChange={handleChange}
                                placeholder="Enter codes or talents (#Talent) separated by spaces"
                                disabled={isSubmitted}
                            />
                            {inputValue && (
                                <button
                                    type="button"
                                    className="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-500"
                                    onClick={() => {setInputValue(''); setInputDuplikat(false); setSortedData(''); setSortedKelompok([]); setIsSubmitted(false);}}
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                        <Button gradientDuoTone="pinkToOrange" type="submit">
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
            {inputDuplikat &&(
            <div className='flex items-center justify-center m-auto'>
            <div class="flex items-center justify-center max-w-3xl p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>
                    <span class="sr-only">Info</span>
                <div>
                    <span class="font-medium">Warning!</span> Ada data duplikat.
                </div>
            </div>
            </div>
            )}
    {/* Tabel */}
    {!inputValue?<div className='grid grid-cols-1 md:grid-cols-2 m-auto max-w-3xl p-4'>
            <div className='flex items-center justify-center'>
                <Image src="/image/assets/pilihjurusan.svg" width={300} height={300} alt='jurusan'/>
                
            </div>
            <div className='grid grid-cols-1 gap-2'>
            <p className='font-bold font-architects'>Petunjuk Penggunaan</p>
            <p className='text-justify'>Silahkan masukkan kode Strength Tipology yang berwarna merah pada hasil asessmen Talents Mapping atau hasil asesmen ST-30 Anda. Contoh formatnya, AMB spasi ADM spasi ANA. Anda bisa memasukkan tiga hingga tujuh kode Tipologi.</p>
            <p className='text-justify'>Jika Anda ingin mengetahui data Tipologi berdasarkan bakat, silahkan ketikkan bakat dengan format : #Bakat (Diawali tanda # dan huruf awal huruf besar), maka semua data tipologi yang memiliki bakat tersebut akan di tampilkan.</p>
            <p className='text-justify'>Untuk mengetahui deskripsi dari tipologi atau aktivitas silahkan klik pada tipologi atau aktivitas tersebut. Deskripsi akan muncul pada halaman bawah.</p>
            </div>
        </div>:
        <section>
            {/* Cluster */}
            {isSubmitted &&
            <div className="flex items-center justify-center max-w-3xl m-auto">
            <div className="">
                {/* Mengumpulkan data untuk SpiderChart */}
                <PieChart
                  data={{
                    labels: sortedKelompok.map(([kelompok]) => kelompok), // Mengambil nama kelompok
                    values: sortedKelompok.map(([_, percentage]) => percentage), // Mengambil persentase
                  }}
                  imageSrc={imageSrc}
                />
            </div>
          </div>
          }
            {/* Rekomendasi Jurusan */}
            <div className="grid grid-cols-1 md:max-w-3xl p-6 m-auto ">
                <div className=''>
                    <h1 className='text-center m-3 font-architects bg-purple-200 p-2 rounded-xl' >REKOMENDASI KARIR/JURUSAN</h1>
                    <div className=''>
                        <Table>
                            <Table.Head>
                                <Table.HeadCell>Match Tipology</Table.HeadCell>
                                <Table.HeadCell>Karir/jurusan</Table.HeadCell>
                                <Table.HeadCell>Persentase</Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {sortedData!==''&& rekomendasiJurusan.filter(item => item.percentageMatch > 0) .map((item, index) =>(
                                    
                                    <Table.Row key={index} className="bg-white dark:bg-gray-800" >
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            
                                            <button className="mr-2">
                                            {item.matchedTalents.join(', ')}
                                            </button>
                                        
                                        </Table.Cell>
                                        <Table.Cell>
                                            {item.jurusan.join(', ')} 
                                        </Table.Cell>
                                        <Table.Cell>
                                        {item.percentageMatch.toFixed(2)}%
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                </div>
                </div>
            </div>
            
            <div className="flex items-center justify-center max-w-3xl p-6 m-auto">
                <Table>
                    <Table.Head>
                        <Table.HeadCell>Code</Table.HeadCell>
                        <Table.HeadCell>Activities</Table.HeadCell>
                        <Table.HeadCell>Talents</Table.HeadCell>
                        <Table.HeadCell>Roles</Table.HeadCell>
                        <Table.HeadCell>Category</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {sortedData!==''&& sortedData.map((item, index) =>(
                            
                            <Table.Row key={index} className="bg-white dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    
                                    <button className="mr-2" onClick={() => fetchCodeDescription(item.code)} // Fetch description on click
                                        onMouseLeave={() => setTooltip({ show: false, text: '' })} // Hide tooltip on mouse leave
                                    >
                                        {item.code}
                                    </button>
                                   
                                </Table.Cell>
                                <Table.Cell>
                                                {item.activities.map((activity, index) => (
                                                    <div className="relative inline-block active:text-red-500 hover:text-red-800" key={index}>
                                                        <button
                                                                className="mr-2"
                                                                onClick={() => fetchActivityDescription(activity)} // Fetch description on click
                                                                onMouseLeave={() => setTooltip({ show: false, text: '' })} // Hide tooltip on mouse leave
                                                            >
                                                            {activity}
                                                        </button>
                                            
                                                    </div>
                                            
                                                ))}
                                                
                                </Table.Cell>
                                <Table.Cell>
                                    {item.talents.join(', ')}
                                </Table.Cell>
                                <Table.Cell>
                                    {item.roles.join(', ')}
                                </Table.Cell>
                                <Table.Cell>
                                    {item.category}
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
            {tooltip.show && (
                <div className="fixed z-50 bottom-0 p-2 bg-gray-900 text-gray-100 left-0 right-0">
                    <p className="text-center text-xs">{tooltip.text}</p>
                </div>
            )}
            {/* <div className="flex flex-wrap items-center justify-center mb-20">
                {sortedTalents.map((item,index)=>(
                    <div key={index} className=''>
                        <span className='bg-pink-300 p-1 mr-2 space-x-2  text-xs'>{item}</span>
                    </div>
                ))}
            </div> */}
        </section>
        }

        </div>
    );
}
