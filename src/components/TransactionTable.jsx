import TransactionItem from './TransactionItem'

function TransactionTable({ sectionHClass, transactions, setTransactions, defaultTag, setDefaultTag }) {
    const thClass = "px-4 py-2";
    const tdClass = thClass + " break-words whitespace-normal";
    const trClass = "border-t";

    const updateTag = (id, newTag) => {
        setTransactions(prev => 
            prev.map(txn => txn.id === id ? {...txn, tag: newTag} : txn)
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
                            <th className={`${thClass} rounded-tl-lg`}>Date</th>
                            <th className={`${thClass}`}>Description</th>
                            <th className={`${thClass}`}>Category</th>
                            <th className={`${thClass}`}>Type</th>
                            <th className={`${thClass}`}>Amount</th>
                            <th className={`${thClass} rounded-tr-lg`}>
                                <div className='flex gap-2 items-center'>
                                    <span>Pay With</span>
                                    <select 
                                        className="border rounded px-1 py-0.5 text-sm" 
                                        value={defaultTag}
                                        onChange={(e) => setDefaultTag(e.target.value)}
                                    >
                                        <option value="🤝">🤝</option>
                                        <option value="😎">😎</option>
                                        <option value="💅">💅</option>
                                    </select>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((txn, index) => (
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