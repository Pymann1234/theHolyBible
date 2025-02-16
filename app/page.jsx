import BibleSearch from "./components/BibleSearch";

export default function Home() {
  return (
    <div className="flex items-center flex-col justify-center min-h-screen bg-gray-200">
      <h1 className="font-semibold font-mono text-[46px] m-7">
        Praise The LORD
      </h1>
      <BibleSearch />
    </div>
  );
}
