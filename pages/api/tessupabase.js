import { supabase } from "../../libs/supabase";

export default async function handler(req, res) {
    const { data, error } = await supabase.from("literasi_indo").select("*").limit(1);

    if (error) {
        return res.status(500).json({ message: "Koneksi Supabase gagal", error });
    }

    return res.status(200).json({ message: "Supabase terkoneksi!", data });
}

// kemudian cek di http://localhost:3000/api/tessupabase