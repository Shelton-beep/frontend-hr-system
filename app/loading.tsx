"use client";
import { DNA } from "react-loader-spinner";
const Loading = () => {
  return (
    <div className="mx-auto flex justify-center">
      <DNA
        visible={true}
        height="100"
        width="100"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </div>
  );
};

export default Loading;
