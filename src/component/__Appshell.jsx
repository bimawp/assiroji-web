import Image from "next/image";
import Link from "next/link";

export default function Appshell({ children }) {
  return (
    <div className="h-24 ">
      <div className="flex h-full items-center justify-around">
        <div className="flex items-center gap-3 ">
          <Image src="/image/logo.png" width={80} height={80} alt="logo" />
          <h1 className="font-bold">
            Madrasah Aliyah (MA) <br />
            AS-SIROJI
          </h1>
        </div>
        <ul className="flex items-center gap-12">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
          <li>
            <Link href="/sarana">Sarana</Link>
          </li>
          <li>
            <Link href="/prestasi">Prestasi</Link>
          </li>
          <li>
            <Link href="/ppdb">PPDB</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </div>
      <main className="">{children}</main>
    </div>
  );
}
