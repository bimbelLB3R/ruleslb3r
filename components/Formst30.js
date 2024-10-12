import { Button, Table, TextInput } from 'flowbite-react';
import { useState,useEffect } from 'react';

export default function Formst30() {
    const [inputValue, setInputValue] = useState('');
    const [sortedData, setSortedData] = useState([]);
    const [sortedTalents, setSortedTalents] = useState([]);
    const [sortedKelompok, setSortedKelompok] = useState([]);
    const [tooltip, setTooltip] = useState({ show: false, text: '' });
    const [colors, setColors] = useState([]);
    const [inputDuplikat,setInputDuplikat]=useState(false)
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
        // Pisahkan input berdasarkan spasi
    const inputs = inputValue.split(' ');

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
    
        // Pisahkan input berdasarkan spasi
        const inputs = inputValue.split(' ');
    
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

    return (
        <div>
            <div className="w-full mt-0">
                <div className="flex">
                    <div className="relative w-full h-8 ">
                        {sortedKelompok.map(([kelompok, percentage], index) => (
                            <div
                                key={index}
                                className="absolute h-full text-center"
                                style={{
                                    width: `${percentage}%`, // Sesuaikan lebar berdasarkan persentase
                                    left: `${sortedKelompok.slice(0, index).reduce((acc, curr) => acc + parseFloat(curr[1]), 0)}%`, // Hitung posisi left
                                    backgroundColor: colors[index], // Gunakan warna acak
                                }}
                            >
                                <span className="text-white text-xs p-1 ">{kelompok} ({percentage}%)</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
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
                            />
                            {inputValue && (
                                <button
                                    type="button"
                                    className="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-500"
                                    onClick={() => {setInputValue(''); setInputDuplikat(false); setSortedData('')}}
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

            <div className="flex items-center justify-center max-w-3xl p-4 m-auto mb-20">
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
            {/* <div className="flex items-center justify-center max-w-3xl p-4 m-auto">
                <Table>
                    <Table.Head>
                        <Table.HeadCell>Persentase Kelompok</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {sortedKelompok.map((item, index) => (
                            <Table.Row key={index} className="bg-white dark:bg-gray-800">
                                <Table.Cell className='flex justify-center items-center space-x-2'>
                                    <p>{item[0]}</p><p>{item[1]}%</p>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div> */}
        </div>
    );
}
