import { useState, useRef } from "react";


function UploadStatement({ sectionHClass, itemBClass, onFilesSelected }) {
    const [files, setFiles] = useState(null);

    const fileInputRef = useRef();

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if(files.length > 0) {
            setFiles(files);
            onFilesSelected(files);
        }
    };

    const getFileNames = () => {
        return (
            <ul className="text-sm list-disc pl-8">
                {files.map((file, idx) => (
                    <li key={idx}>{file.name}</li>
                ))}
            </ul>
        );
    }

    const fileName = () => {
        if(!files || files.length === 0) {
            return <>No file chosen</>;
        } else {
            return getFileNames();
        }
    }
    
    return (
        <div className="p-5 flex flex-col gap-3 bg-(--color-card-bg) rounded-lg">
            <div className={`${sectionHClass}`}>
                Upload Statement
            </div>

            <div className="p-2 flex gap-3 items-center border-1 border-(--color-border) rounded-md">
                <button 
                    onClick={handleClick}
                    className={`${itemBClass} px-2 py-1.5 cursor-pointer border-1 border-(--color-border) rounded-md bg-(--color-btn-prim) hover:bg-(--color-btn-hover) hover:shadow-md hover:animate-pulse transition duration-150 text-(--color-btn-text)`}
                >
                    Choose File (.CSV)
                </button>

                <input 
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".csv"
                    multiple
                    className="hidden"
                />

                <div className="text-(--color-text-fn)">
                    {fileName()}
                </div>
            </div>
        </div>
    )
}

export default UploadStatement;