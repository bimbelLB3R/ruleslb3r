import { Button, Table, TextInput } from 'flowbite-react';
import { useState,useEffect } from 'react';

export default function Formst30() {
    const [inputValue, setInputValue] = useState('');
    const [sortedData, setSortedData] = useState([]);
    const [sortedTalents, setSortedTalents] = useState([]);
    const [sortedKelompok, setSortedKelompok] = useState([]);
    const [tooltip, setTooltip] = useState({ show: false, text: '' });
    const [colors, setColors] = useState([]);
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

    return (
        <div>
            <div className="w-full mt-0">
                <div className="flex">
                    <div className="relative w-full h-8 bg-gray-200">
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
                                className='w-[300px] md:w-[500px]'
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Enter codes or talents (#Talent) separated by spaces"
                            />
                            {inputValue && (
                                <button
                                    type="button"
                                    className="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-500"
                                    onClick={() => setInputValue('')}
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
                        {sortedData.map((item, index) => (
                            <Table.Row key={index} className="bg-white dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {item.code}
                                </Table.Cell>
                                <Table.Cell>
                                                {item.activities.map((activity, index) => (
                                                    <div className="relative inline-block" key={index}>
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
            <div className="flex items-center justify-center max-w-3xl p-4 m-auto">
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
            </div>
        </div>
    );
}
