
function Summary({ sectionHClass, totalDue }) {

    
    return (
        <div className="p-5 flex flex-col gap-3 bg-(--color-card-bg) rounded-lg">
            <div className={`${sectionHClass}`}>
                Summary
            </div>

            <div className="px-4 py-2 flex flex-col gap-3 items-start border rounded-md">
                <div className="my-2 px-4 flex gap-5 border-b text-lg font-semibold">
                    <div className="">
                        Total Amount:
                    </div>
                    <div className="text-(--color-text-sec)">
                        ${(totalDue.HisPay + totalDue.HerPay).toFixed(2)}
                    </div>
                </div>

                <div className="pl-4 flex gap-5 text-lg font-semibold">
                    <div className="">
                        😎 He Owes:
                    </div>
                    <div className="text-(--color-text-sec)">
                        ${totalDue.HisPay.toFixed(2)}
                    </div>
                </div>

                <div className="pl-4 flex gap-5 text-lg font-semibold">
                    <div className="">
                        💅 She Owes:
                    </div>
                    <div className="text-(--color-text-sec)">
                        ${totalDue.HerPay.toFixed(2)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Summary;