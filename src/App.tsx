import Navbar from "./components/Navbar";
import Tabs from "./components/Tabs";
import RedditTab from "./components/pages/RedditTab";
import SentenceTab from "./components/pages/SentenceTab";
import TextFileTab from "./components/pages/TextFileTab";

const tabs = [
    { label: "Reddit", content: <RedditTab /> },
    { label: "Sentence", content: <SentenceTab /> },
    { label: "Text file", content: <TextFileTab /> },
];

function App() {
    return (
        <div className="bg-[#fefcf1] bg-cover sm:h-screen">
            <Navbar></Navbar>
            <h1 className="text-3xl font-bold text-[#d4a373] text-center">
                Next Generation Brand Research
            </h1>
            <h2 className="text-xl font-bold text-[#d4a373] text-center">
                Test it out!
            </h2>
            <div className="py-2 px-5 h-max mx-auto">
                <Tabs tabs={tabs} />
            </div>
        </div>
    );
}

export default App;
