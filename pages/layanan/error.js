import Link from "next/link";
import { useRouter } from 'next/router';


export default function Error() {
  const router = useRouter();
  const { order_id } = router.query;
  return <>
  <div className="flex items-center justify-center m-auto">
    <div>
        <p>Pembayaran {order_id} Gagal</p>
        <div>
          <Link href={"https://www.bimbellb3r.com"} className="underline">Kembali</Link>
        </div>
    </div>
  </div>
  
  </>;
}
