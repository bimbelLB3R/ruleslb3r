// pages/hasil/index.jsx
import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import Head from "next/head";
import ProfilSiswa        from "../../components/hasil/ProfilSiswa";
import TabJenisUjian      from "../../components/hasil/TabJenisUjian";
import KartuSkorTotal     from "../../components/hasil/KartuSkorTotal";
import GrafikRadar        from "../../components/hasil/GrafikRadar";
import TabelSubtes        from "../../components/hasil/TabelSubtes";
import CatatanInterpretasi from "../../components/hasil/CatatanInterpretasi";
import StatusBelumAda     from "../../components/hasil/StatusBelumAda";

export default function HalamanHasil() {
  const { data: session, status } = useSession();

  const [profil,    setProfil]    = useState(null);   // { nisn, nama, hasSnbt, hasTka }
  const [aktifTab,  setAktifTab]  = useState("snbt"); // "snbt" | "tka"
  const [dataSnbt,  setDataSnbt]  = useState(null);
  const [dataTka,   setDataTka]   = useState(null);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(null);

  // 1. Fetch profil saat session tersedia
  useEffect(() => {
    if (!session?.user?.email) return;

    const fetchProfil = async () => {
      setLoading(true);
      try {
        const res  = await fetch(`/api/hasil/profil?email=${encodeURIComponent(session.user.email)}`);
        const data = await res.json();

        if (!res.ok || !data.terdaftar) {
          setProfil({ terdaftar: false });
          return;
        }

        setProfil(data);

        // Set tab default ke jenis yang punya data
        if (data.hasSnbt) setAktifTab("snbt");
        else if (data.hasTka) setAktifTab("tka");

      } catch { setError("Gagal memuat data profil."); }
      finally  { setLoading(false); }
    };

    fetchProfil();
  }, [session]);

  // 2. Fetch data analisis sesuai tab aktif
  useEffect(() => {
    if (!profil?.nisn) return;

    const fetchAnalisis = async (jenis) => {
      const res  = await fetch(`/api/analisis-siswa?nisn=${profil.nisn}&jenis=${jenis}`);
      const data = await res.json();
      return data;
    };

    // Fetch keduanya sekaligus (tidak perlu tunggu tab ganti)
    Promise.all([
      profil.hasSnbt ? fetchAnalisis("snbt") : Promise.resolve(null),
      profil.hasTka  ? fetchAnalisis("tka")  : Promise.resolve(null),
    ]).then(([snbt, tka]) => {
      setDataSnbt(snbt);
      setDataTka(tka);
    });

  }, [profil]);

  // ── State: belum login ──────────────────────────────────────────────────────
  if (status === "loading") {
    return <ScreenLoading />;
  }

  if (status === "unauthenticated") {
    return (
      <ScreenBelumLogin onSignIn={() => signIn("google", { prompt: "select_account" })} />
    );
  }

  if (loading) return <ScreenLoading />;
  if (error)   return <ScreenError pesan={error} />;

  // ── State: email tidak terdaftar ────────────────────────────────────────────
  if (profil && !profil.terdaftar) {
    return (
      <StatusBelumAda
        tipe="tidak-terdaftar"
        email={session.user.email}
      />
    );
  }

  // ── State: terdaftar tapi belum ada hasil ───────────────────────────────────
  const dataAktif = aktifTab === "snbt" ? dataSnbt : dataTka;
  const tidakAdaData = dataAktif && !dataAktif.ada;

  return (
    <>
      <Head>
        <title>Hasil Try Out — {profil?.nama ?? ""}</title>
        <link rel="icon" type="image/png" href="/image/logolb3r.png" />
      </Head>

      <div className="min-h-screen bg-gray-50 pb-16">
        {/* ── Header ───────────────────────────────────────────────── */}
        <div className="bg-gradient-to-r from-gray-900 to-green-900 text-white px-4 py-6">
          <div className="max-w-3xl mx-auto">
            <ProfilSiswa
              nama={profil?.nama}
              nisn={profil?.nisn}
              foto={session?.user?.image}
            />
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 mt-4 space-y-4">

          {/* ── Tab SNBT / TKA ───────────────────────────────────────── */}
          {profil?.hasSnbt && profil?.hasTka && (
            <TabJenisUjian aktif={aktifTab} onChange={setAktifTab} />
          )}

          {/* ── Konten per tab ───────────────────────────────────────── */}
          {tidakAdaData ? (
            <StatusBelumAda tipe="belum-dianalisis" jenis={aktifTab} />
          ) : dataAktif ? (
            <>
              <KartuSkorTotal
                skorTotal={dataAktif.skorTotal}
                jenis={aktifTab}
              />

              <GrafikRadar
                subtes={dataAktif.subtes}
                jenis={aktifTab}
              />

              <TabelSubtes
                subtes={dataAktif.subtes}
                jenis={aktifTab}
              />

              <CatatanInterpretasi
                subtes={dataAktif.subtes}
                jenis={aktifTab}
              />
            </>
          ) : (
            <ScreenLoading />
          )}
        </div>
      </div>
    </>
  );
}

// ── Sub-render helpers ────────────────────────────────────────────────────────

function ScreenLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-8 h-8 border-4 border-gray-300 border-t-green-600 rounded-full animate-spin" />
    </div>
  );
}

function ScreenError({ pesan }) {
  return (
    <div className="flex items-center justify-center min-h-screen text-red-600">
      <p>{pesan}</p>
    </div>
  );
}

function ScreenBelumLogin({ onSignIn }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-gray-50">
      <p className="text-gray-700 text-lg font-semibold">
        Login dulu untuk lihat hasil try out kamu
      </p>
      <button
        onClick={onSignIn}
        className="px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800"
      >
        Login dengan Google
      </button>
    </div>
  );
}