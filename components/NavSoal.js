import { Button } from 'flowbite-react';

export default function NavSoal({ sumSoal }) {
  return (
    <div>
      {/* {console.log(sumSoal)} */}
      <div className=" text-gray-100 text-center font-bold p-2 fixed bottom-8 left-0 right-0  flex md:items-center justify-center">
        <p className="bg-orange-600 p-2 rounded text-xs">
          Link Soal (Geser kanan-kiri)
        </p>
      </div>
      <Button.Group>
        {sumSoal.map((item) => (
          <Button key={item[0]} className="bg-orange-600" href={`#${item[0]}`}>
            {item[0]}
          </Button>
        ))}
        {/* <Button color="gray">2</Button>
        <Button color="gray">3</Button>
        <Button color="gray">4</Button>
        <Button color="gray">5</Button>
        <Button color="gray">6</Button>
        <Button color="gray">7</Button>
        <Button color="gray">8</Button>
        <Button color="gray">9</Button>
        <Button color="gray">10</Button>
    <Button color="gray">11</Button> */}
      </Button.Group>
    </div>
  );
}
