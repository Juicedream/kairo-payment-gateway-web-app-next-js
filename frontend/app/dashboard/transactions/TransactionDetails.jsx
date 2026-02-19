import TransactionDetailsForm from "./TransactionDetailsForm";

export default function TransactionDetails({ transaction }) {
  return (
    <dialog id="my_modal_4" className="modal">
      { transaction &&
      <div className="modal-box w-11/12 max-w-5xl">
        <h3 className="font-bold text-lg text-center">Transaction Details</h3>
        <TransactionDetailsForm transaction={transaction} />
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button, it will close the modal */}
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
      }
    </dialog>
  );
}
