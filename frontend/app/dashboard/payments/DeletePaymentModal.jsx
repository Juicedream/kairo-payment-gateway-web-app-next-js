import { useState } from "react";

export default function DeletePaymentModal({ onDelete, payment }) {
  const [confirmationInput, setConfirmationInput] = useState("");
  const showDeleteButton = confirmationInput === payment?.paymentId;
  return (
    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
      {payment && (
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete Payment Confirmation</h3>
          <p className="py-4">
            Are you sure you want to delete this: Note
            <br />
            This action cannot be undone.
            <br />
            <span>
              Type <b className="text-md">{payment?.paymentId}</b> to delete
            </span>
          </p>
          <input
            value={confirmationInput}
            onChange={(e) => setConfirmationInput(e.target.value)}
            type="text"
            placeholder="Type here"
            className="input w-full text-lg"
          />
          <div className="modal-action">
            <form method="dialog" className="space-x-4">
              {/* if there is a button in form, it will close the modal */}
              {showDeleteButton && (
                <button
                  className="btn btn-error"
                  onClick={() => onDelete(payment?.paymentId)}
                >
                  Delete
                </button>
              )}
              <button className="btn">Cancel</button>
            </form>
          </div>
        </div>
      )}
    </dialog>
  );
}
