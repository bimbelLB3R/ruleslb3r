import Formst30 from "../../components/Formst30";
import Head from "next/head";

export default function Tipologi(){
    return (
        <div>
            <Head>
            <title>Career Tracker</title>
            <meta name="description" content="Menemukan jurusan yang paling sesuai dengan bakat yang dimiliki. Penelusuran bakat menggunakan asesmen Talents Mapping." key="desc" />
            <link
            rel="icon"
            type="image/png"
            sizes="4x16"
            href="/image/logolb3r.png"
            />
            <meta name="theme-color" content="#581c87" />
            <meta
            property="og:image"
            itemProp="image"
            content="https://raw.githubusercontent.com/bimbelLB3R/ruleslb3r/main/public/image/assets/pilihjurusan.svg"
            />
            </Head>
            <Formst30/>
        </div>
    )
}