import { useState, useEffect } from 'react';
import Papa from 'papaparse';

import './App.css';

import DisclaimerBanner from './components/DisclaimerBanner';
import UploadStatement from './components/UploadStatement';
import TransactionTable from './components/TransactionTable';
import Summary from './components/Summary';

import useWindowBreakpoint from './hooks/useWindowBreakpoint'

function App() {
  const [transactions, setTransactions] = useState([]);
  const [defaultTag, setDefaultTag] = useState("🤝");
  const [totalDue, setTotalDue] = useState({ HisPay: 0, HerPay: 0 });

  useEffect(() => {
    setTransactions(prev => 
      prev.map(txn => ({
        ...txn,
        tag: defaultTag
      }))
    );
  }, [defaultTag]);

  useEffect(() => {
    let hisTotal = 0;
    let herTotal = 0;

    transactions.forEach(txn => {
      const amt = txn.amount;

      switch (txn.tag) {
        case "😎":
          hisTotal += amt;
          break;
        case "💅":
          herTotal += amt;
          break;
        case "🤝":
          hisTotal += amt / 2;
          herTotal += amt / 2;
          break;
        default:
          break;
      }
    });

    setTotalDue({
      HisPay: hisTotal,
      HerPay: herTotal,
    });
  }, [transactions]);

  const handleFilesSelected = (files) => {
    let allTransactions = [];
    setTransactions([]);

    files.forEach((file) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const cleaned = results.data
            .filter(row => {
              const amount = parseFloat(row["Amount"]);
              return !isNaN(amount) && amount < 0;
            })
            .map((row) => ({
              date: row["Post Date"],
              desc: row["Description"],
              cate: row["Category"],
              type: row["Type"],
              id: crypto.randomUUID(),
              amount: parseFloat(row["Amount"]),
              tag: defaultTag,
            }));

          allTransactions = [...allTransactions, ...cleaned];

          setTransactions(prev => [...prev, ...cleaned]);
        },
      });
    });
  };
  
  const sectionHClass = "text-2xl font-semibold text-left";
  const itemBClass = "text-xl font-bold";

  const getAppPadding = () => {
    const breakpoint = useWindowBreakpoint();
    console.log(breakpoint);

    switch (breakpoint) {
      case 'xs': return "py-8 px-8 ";
      case 'sm': return "py-8 px-12 ";
      case 'md': return "py-8 px-16 ";
      case 'lg': return "py-8 px-22 ";
      case 'xl': return "py-8 px-28 ";
      default: return "py-8 px-35 "; // 2xl
    }
  }

  const getAppWidth = () => {
    const breakpoint = useWindowBreakpoint();

    switch (breakpoint) {
      case 'xs': return "w-fit ";
      case 'sm': return "w-fit ";
      case 'md': return "w-fit ";
      case 'lg': return "w-full ";
      case 'xl': return "w-full ";
      default: return "w-full "; // 2xl
    }
  }

  return (
    <div className='w-full'>
      <div className={`${getAppWidth()} ${getAppPadding()} flex flex-col gap-10 rounded-lg text-(--color-text-prim)`}>
        <div className='w-full py-10 rounded-lg text-center text-4xl font-bold bg-(--color-text-bg)'>
          Shared Expense Tracker
        </div>

        <DisclaimerBanner
          sectionHClass={sectionHClass}
        />
        <UploadStatement 
          sectionHClass={sectionHClass}
          itemBClass={itemBClass}
          onFilesSelected={handleFilesSelected}
        />
        <TransactionTable 
          sectionHClass={sectionHClass}
          transactions={transactions}
          setTransactions={setTransactions}
          defaultTag={defaultTag}
          setDefaultTag={setDefaultTag}
        />
        <Summary 
          sectionHClass={sectionHClass} 
          totalDue={totalDue}
        />
      </div>
    </div>
  )
}

export default App
