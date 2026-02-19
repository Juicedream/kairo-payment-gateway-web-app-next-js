
import PaymentDetailsForm from "./PaymentDetailsForm";

export default function PaymentDetails({ payment }) {
  return (
    <dialog id="my_modal_4" className="modal">
      { payment &&
      <div className="modal-box w-11/12 max-w-5xl">
        <h3 className="font-bold text-lg text-center">Payment Details</h3>
        <PaymentDetailsForm payment={payment} />
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
