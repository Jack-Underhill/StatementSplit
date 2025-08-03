import { useState } from 'react';
import TransactionItem from './TransactionItem'

function TransactionTable({ sectionHClass, transactions, setTransactions, defaultTag, setDefaultTag }) {
    const thClass = "px-4 py-2 group";
    const tdClass = thClass + " break-words whitespace-normal";
    const trClass = "border-t";

    const [sortBy, setSortBy] = useState("date");
    const [sortOrder, setSortOrder] = useState("desc"); // or asc

    const toggleSort = (column) => {
        if(sortBy === column) {
            // Same column selected will flip the order (asc/desc).
            setSortOrder(prev => prev === "desc" ? "asc" : "desc");
        } else {
            // Sorts by newly selected column descending.
            setSortBy(column);
            setSortOrder("desc");
        }
    };

    const sortedTransactions = [...transactions].sort((a, b) => {
        if(sortBy) {
            const valA = a[sortBy];
            const valB = b[sortBy];

            if(typeof valA === "string" && typeof valB === "string") {
                return sortOrder === "asc" ?
                    valA.localeCompare(valB) :
                    valB.localeCompare(valA);
            }

            if(typeof valA === "number" && typeof valB === "number") {
                return sortOrder === "asc" ?
                    valA - valB :
                    valB - valA;
            }
        }

        return 0;
    });

    const updateTag = (id, newTag) => {
        setTransactions(prev => 
            prev.map(txn => txn.id === id ? {...txn, tag: newTag} : txn)
        );
    };

    const getSortArrow = (col) => {
        return (
            <span className={`group-hover:text-(--color-btn-prim) ${sortBy === col ? "group-hover:text-lg" : ""}`}>
                {sortBy === col && (sortOrder === "asc" ? "▲" : "▼")}
            </span>
        );
    };
    
    return (
        <div className="p-5 flex flex-col gap-3 bg-(--color-card-bg) rounded-lg">
            <div className={`${sectionHClass}`}>
                Transactions
            </div>

            <div className='border rounded-t-lg bg-sky-200'>
                <table className='w-full table-auto lg:table-fixed'>
                    <thead className='bg-(--color-thead-bg)'>
                        <tr>
                            <th 
                                className={`${thClass} rounded-tl-lg`}
                                onClick={() => toggleSort("date")}
                            >
                                Date {getSortArrow("date")}
                            </th>
                            <th 
                                className={`${thClass}`}
                                onClick={() => toggleSort("desc")}
                            >
                                Description {getSortArrow("desc")}
                            </th>
                            <th 
                                className={`${thClass}`}
                                onClick={() => toggleSort("cate")}
                            >
                                Category {getSortArrow("cate")}
                            </th>
                            <th 
                                className={`${thClass}`}
                                onClick={() => toggleSort("type")}
                            >
                                Type {getSortArrow("type")}
                            </th>
                            <th 
                                className={`${thClass}`}
                                onClick={() => toggleSort("amount")}
                            >
                                Amount {getSortArrow("amount")}
                            </th>
                            <th className={`${thClass} rounded-tr-lg`}>
                                <div className='flex gap-2 items-center'>
                                    <span>Pay With</span>
                                    <select 
                                        className="border rounded px-1 py-0.5 text-sm" 
                                        value={defaultTag}
                                        onChange={(e) => setDefaultTag(e.target.value)}
                                    >
                                        <option value="🤝" title='Split'>🤝</option>
                                        <option value="😎" title='Him'>😎</option>
                                        <option value="💅" title='Her'>💅</option>
                                    </select>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedTransactions.map((txn, index) => (
                            <TransactionItem 
                                trClass={trClass}
                                tdClass={tdClass}
                                key={txn.id}
                                txn={txn}
                                index={index}
                                onTagChange={(newTag) => updateTag(txn.id, newTag)}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TransactionTable;