import { useState, useRef } from "react";


function DisclaimerBanner({ sectionHClass }) {
    const [visible, setVisible] = useState(true);

    if(!visible) return null;
    
    return (
        <div className="p-5 flex flex-col gap-3 bg-(--color-banner-bg) rounded-lg">
            <div className="flex justify-between">
                <div className={`${sectionHClass}`}>
                    ⚠️ Disclaimer
                </div>
                <button
                    onClick={() => setVisible(false)}
                    className="cursor-pointer text-gray-900 hover:text-gray-400 hover:ring-2 focus:outline-1 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 rounded-full p-1 transition"
                    aria-label="Dismiss disclaimer"
                >
                    &times;
                </button>
            </div>

            <div className="w-5/6 self-center text-md font-semibold">
                This app runs entirely in your browser. No data is sent or stored anywhere. Your statements remain on your device.
                This project is open source and viewable at
                <a
                    className="pl-1 text-(--color-btn-prim) hover:text-(--color-btn-hover) hover:animate-pulse transition duration-150" 
                    href="https://github.com/Jack-Underhill/StatementSplit"
                    title="GitHub Repo"
                >
                    [GitHub link]
                </a>
                . Feel free to verify exactly what it does.
            </div>
        </div>
    )
}

export default DisclaimerBanner;