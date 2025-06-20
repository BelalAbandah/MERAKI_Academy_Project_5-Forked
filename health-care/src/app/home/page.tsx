"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import "./home.css";

const Home = () => {
  const { data: session } = useSession();
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showLoginAndRegister, setShowLoginAndRegister] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (session) {
      localStorage.setItem("roleId", session.user.role_id.toString());
      localStorage.setItem("email", session.user.email);
      localStorage.setItem("userId", session.user.id.toString());
      localStorage.setItem("token", session.user.token);
    }
  }, []);

  useEffect(() => {
    const roleId = localStorage.getItem("roleId");
    if (roleId !== null) {
      if (+roleId === 1) {
        setShowAdminPanel(true);
        setShowLoginAndRegister(true);
      } else if (+roleId === 2 || +roleId === 3) {
        setShowLoginAndRegister(true);
        setShowAdminPanel(false);
      }
    }
  }, []);

  return (
    <div>
    
<div className="massHead">
  <p className="headTextInMassHead"> Your health, our priority trusted care solutions</p>
  <p className="bodyTextInMassHead">Empowering healthcare with innovative, user-friendly designs for medical professionals and institutions.</p>
  <button className="BlogsbuttonInMassHead" onClick={()=>{
router.push("/symptomChecker");
  }}>Blogs</button>
</div>
      <div className="searchSection">
        <p className="textInsearchSection">Find Doctors Near You </p>
        <span className="searchBarAndButton">
          <svg
            className="iconInSearch"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="https://www.w3.org/2000/svg"
          >
            <path
              d="M4.5921 1.6665V3.86763H3.08846V6.9305C3.08838 8.07422 3.71356 9.1311 4.72849 9.70299C5.74342 10.2749 6.99388 10.2749 8.00881 9.70299C9.02374 9.1311 9.64892 8.07422 9.64884 6.9305V3.86763H8.15084V1.6665H11.9099V3.86763H11.9043V6.93087C11.9043 9.62966 9.86602 11.8726 7.2129 12.2705C7.3416 14.0985 8.93047 15.5428 10.8715 15.5428C12.897 15.5428 14.5391 13.9699 14.5392 12.0296L14.539 11.2262C13.7892 10.7491 13.2945 9.93009 13.2945 8.99984C13.2945 7.52708 14.5344 6.33317 16.0638 6.33317C17.5932 6.33317 18.833 7.52708 18.833 8.99984C18.833 10.2422 17.9507 11.2862 16.7566 11.5824L16.7561 12.0296C16.7561 15.1377 14.1162 17.6665 10.8715 17.6665C7.6732 17.6665 5.06257 15.2096 4.98847 12.1628C2.60166 11.5632 0.833008 9.44484 0.833008 6.93087V1.6665H4.5921ZM16.0638 8.61889C15.8453 8.61889 15.6682 8.78944 15.6682 8.99984C15.6682 9.15392 15.7646 9.29283 15.9124 9.35179C16.0602 9.41076 16.2304 9.37816 16.3435 9.26921C16.4567 9.16026 16.4905 8.99641 16.4293 8.85405C16.368 8.7117 16.2238 8.61889 16.0638 8.61889Z"
              fill="#7384d8"
            ></path>
          </svg>
          <input
            className="searchInput"
            placeholder="Search By Specialization"
          ></input>
          <input
            className="searchInput"
            placeholder="Search By Location"
          ></input>
          <button className="searchButton">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="searchIcon"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
            Search
          </button>
        </span>
        <p className="text2InsearchSection"> Access doctors’ profiles and qualifications.</p>
      </div>
    </div>
  );
};

export default Home;
