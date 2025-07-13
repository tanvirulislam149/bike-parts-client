import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import Loading from "../../Loading";
import PartsCard from "./PartsCard";
import styles from "./Parts.module.css";

const Parts = () => {
  const {
    isLoading,
    error,
    data: parts,
  } = useQuery("parts", () =>
    fetch("https://autoparts-vsj8.onrender.com/parts").then((res) => {
      return res.json();
    })
  );

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div id={"parts"}>
      <p className={`text-5xl text-center mt-20 ${styles.title}`}>
        Parts We Provide
      </p>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-20 mt-10 mx-3 md:mx-14">
        {parts?.map((part) => (
          <PartsCard key={part._id} part={part}></PartsCard>
        ))}
      </div>
    </div>
  );
};

export default Parts;
