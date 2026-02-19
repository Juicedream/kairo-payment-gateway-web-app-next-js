import Image from "next/image";

export default function PaymentsTable({ payments }) {
  return (
    <>
      {payments.map((payment) => (
        <tr key={payment._id}>
          <th>
            <label>
              <input type="checkbox" className="checkbox" />
            </label>
          </th>
          <td>
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="mask mask-squircle h-12 w-12">
                  <Image
                    width={12}
                    height={12}
                    src="/background.png"
                    alt="Avatar Tailwind CSS Component"
                  />
                </div>
              </div>
              <div>
                <div className="font-bold">{payment?._id}</div>
                <div className="text-sm opacity-50">Nigeria</div>
              </div>
            </div>
          </td>

          <td>
            {payment?.email}
            <br />
            <span className="badge badge-ghost badge-sm">Payer</span>
          </td>
          <td className="flex flex-items items-center">
            ₦ {Number(payment?.amount).toLocaleString()}
          </td>
          <td>{payment?.paymentId}</td>
          <td>{payment?.status}</td>
          <td>
            <button className="btn btn-ghost btn-xs">details</button>
          </td>
        </tr>
      ))}
    </>
  );
}
