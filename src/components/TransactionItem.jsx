import SortTag from './SortTag'

function TransactionItem({ trClass, tdClass, txn, index, onTagChange }) {
    const rowBgColor = index % 2 === 0 ? "bg-(--color-trow-even)" : "bg-(--color-trow-odd)" ;

    return (
        <tr className={`${trClass} ${rowBgColor} text-(--color-text-sec) hover:bg-(--color-trow-hover)`}>
            <td className={`${tdClass}`}>{txn.date}</td>
            <td className={`${tdClass}`}>{txn.desc}</td>
            <td className={`${tdClass}`}>{txn.cate}</td>
            <td className={`${tdClass}`}>{txn.type}</td>
            <td className={`${tdClass}`}>${txn.amount.toFixed(2)}</td>
            <td className={`${tdClass}`}>
                <SortTag 
                    id={txn.id}
                    tag={txn.tag}
                    onTagChange={onTagChange}
                />
            </td>
        </tr>
    )
}

export default TransactionItem;