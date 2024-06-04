'use client'
import Header from "./main-component/layout/header/header";
import Section_1 from "./main-component/layout/section_1/section_1";
import Footer from "./main-component/layout/footer/footer";
export default function Home() {
  return (
    <main className="bg-white max-h-max ">
      <Header />
      <Section_1/>
    <Footer />
    </main>
  );
}
