import { Button, Table, TextInput } from 'flowbite-react';
import { useState } from 'react';

export default function Formst30() {
    const [codes, setCodes] = useState('');
    const [sortedData, setSortedData] = useState([]);
    const [sortedTalents, setSortedTalents] = useState([]);
    const [tooltip, setTooltip] = useState({ show: false, text: '' });
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
    console.log(tooltip)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/st30/getSortedTipologi', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ codes: codes.split(' ') }),
        });
        const data = await response.json();
        setSortedData(data.sortedData);
        setSortedTalents(data.sortedTalents);
    };

    return (
        <div>
            <div className="flex items-center justify-center m-10">
                <form onSubmit={handleSubmit}>
                    <div className="flex items-center justify-center space-x-3">
                        <TextInput
                            type="text"
                            value={codes}
                            onChange={(e) => setCodes(e.target.value)}
                            placeholder="Enter codes e.g. MED DES CRE"
                        />
                        <Button gradientDuoTone="pinkToOrange" type="submit">
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
            <div className="flex items-center justify-center max-w-3xl p-4 m-auto">
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
                <div className="fixed bottom-0 p-2 bg-gray-900 text-gray-100 left-0 right-0">
                    <p className="text-center text-xs">{tooltip.text}</p>
                </div>
            )}
            <div className="flex items-center justify-center max-w-3xl p-4 m-auto">
                <Table>
                    <Table.Head>
                        <Table.HeadCell>Urutan Bakat</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {sortedTalents.map((item, index) => (
                            <Table.Row key={index} className="bg-white dark:bg-gray-800">
                                <Table.Cell>
                                    {item}
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        </div>
    );
}
