import React from "react";

const MakePaymentHeader = ({label, desc}) => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-primary-content text-3xl">{label}</h1>
      <p className="text-xs">{desc}</p>
    </div>
  );
};

export default MakePaymentHeader;
