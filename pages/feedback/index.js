import Image from "next/image";
import StarRating from "../../components/RatingTentor";
import { useState } from "react";

const FeedbackForm = () => {
  const [ratings, setRatings] = useState(0);
  const [submitted, setSubmitted] = useState({});

  // Contoh data orang
  const people = [
    { id: 1, name: "Paijo" },
    { id: 2, name: "Inem" },
    { id: 3, name: "Cenil" },
  ];

  const handleRatingChange = (personId, value) => {
    const personName = people.find((person) => person.id === personId).name;
    if (!submitted[personId]) {
      setRatings({ ...ratings, [personId]: value });
    }
  };

  const handleSubmit = (personId) => {
    const personName = people.find((person) => person.id === personId).name;
    // Validasi apakah pengguna memberikan penilaian sebelum mengirimkan data
    if (ratings[personId] !== undefined) {
      // Kirim rating ke server atau lakukan tindakan lainnya.
      console.log(`${personName}'s Rating:`, ratings[personId]);
      setSubmitted({ ...submitted, [personId]: true });
    } else {
      alert(`Anda belum memberikan penilaian untuk ${personName}`);
    }
  };

  return (
    <div className=" mt-20">
      <h2 className="text-center font-bold uppercase">Beri Penilaian</h2>
      {people.map((person) => (
        <form
          key={person.id}
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(person.id);
          }}
        >
          <div className="flex items-center justify-center space-x-3">
            <Image
              src="/image/image1.webp"
              width={100}
              height={100}
              alt="Pengajar"
              className="rounded-full"
            />
            <StarRating
              onChange={(value) => handleRatingChange(person.id, value)}
              disabled={submitted[person.id]}
            />
            <button type="submit" disabled={submitted[person.id]}>
              {submitted[person.id] ? "Terkirim" : "Kirim"}
            </button>
          </div>
        </form>
      ))}
    </div>
  );
};

export default FeedbackForm;
