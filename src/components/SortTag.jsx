
function SortTag({ id, tag, onTagChange }) {
    
    const getTagTitle = (tag) => {
        switch (tag) {
            case "🤝":
                return "Split Expense";
            case "😎":
                return "He Pays";
            case "💅":
                return "She Pays";
            default:
                return "";
        }
    }
    
    return (
        <div className="flex gap-2">
            {["🤝", "😎", "💅"].map(option => (
                <label key={option} className="inline-flex items-center gap-1 cursor-pointer" title={getTagTitle(option)}>
                    <input 
                        type="radio"
                        name={`tag-${id}`}
                        value={option}
                        checked={tag === option}
                        onChange={() => onTagChange(option)}
                        className="accent-blue-500" 
                    />
                    <span className="text-sm">{option}</span>
                </label>
            ))}
        </div>
    )
}

export default SortTag;