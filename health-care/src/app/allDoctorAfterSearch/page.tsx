/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import "./allDoctorAfterSearch.css";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function allDoctorAfterSearch() {
  const handleAction = () => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/bookAppointment");
    } else {
      toast.error("Please log in or register to access this feature");
    }
  };

  const router = useRouter();
  type allDoctorAfterFiltration = {
    firstname: string;
    lastname: string;
    age: number;
    country: string;
    email: string;
    phonenumber: number;
    userprofilepic: string;
    role_id: number;
    specialization: string;
    clinicname: string;
    city: string;
  }[];

  const {
    searchByLocation,
    setSearchByLocation,
    searchBySpecialization,
    setSearchBySpecialization,
    searchLocationValue,
    setSearchLocationValue,
    searchSpecializationValue,
    setSearchSpecializationValue,
    allDoctors,
    setAllDoctors,
    doctorIdInBookBtn,
    setDoctorIdInBookBtn,
  } = useContext(AuthContext);

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showErrorMessage, seteshowErrorMessage] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/users/allDoctors")
      .then((result) => {
        console.log("result.data: ", result.data);
        if (searchByLocation) {
          const filterByLocation = (
            result.data as allDoctorAfterFiltration
          ).filter((ele, i) => {
            return (
              ele.city.toLocaleLowerCase() ===
              searchLocationValue.toLocaleLowerCase()
            );
          });
          if (filterByLocation.length === 0) {
            seteshowErrorMessage(true);
            setErrorMessage("No Doctors Found wtih the entered location");
            setTimeout(() => {
              seteshowErrorMessage(false);
            }, 2000);
            setAllDoctors(result.data);
          } else {
            setAllDoctors(filterByLocation);
          }
        } else if (searchBySpecialization) {
          const filterBySpecialization = (
            result.data as allDoctorAfterFiltration
          ).filter((ele, i) => {
            return (
              ele.specialization.toLocaleLowerCase() ===
              searchSpecializationValue.toLocaleLowerCase()
            );
          });
          if (filterBySpecialization.length === 0) {
            seteshowErrorMessage(true);
            setErrorMessage(
              "No Doctors Found wtih the entered specialization "
            );
            setTimeout(() => {
              seteshowErrorMessage(false);
            }, 2000);
            setAllDoctors(result.data);
          } else {
            setAllDoctors(filterBySpecialization);
          }
          console.log("searchSpecializationValue: ", searchSpecializationValue);

          console.log("filterBySpecialization: ", filterBySpecialization);
        } else {
          setAllDoctors(result.data);
        }
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  }, []);

  console.log("allDoctors: ", allDoctors);
  return (
    <div className="allDoctorsPageAndFooter">
      <div className="allDoctorsPage">
        <div className="renderAllDoctors">
          {allDoctors.map((ele, i) => {
            return (
              // eslint-disable-next-line react/jsx-key
              <div className="doctorBox">
                <div className="doctorDetailsAndImage">
                  <img
                    className="imageInSearchSectionss"
                    src={ele.userprofilepic}
                    alt="Image"
                    width={150}
                    height={150}
                  />
                  <div className="doctorDetails">
                    <div className="nameAndLocationAndClinic">
                      <div className="nameInJoinRequestInAdminPanel">
                        Dr. {ele.firstname} {ele.lastname}
                      </div>
                      <div>
                        {" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          fill="currentColor"
                          color="#216ecf"
                          className="bi bi-arrow-right-square-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M0 14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2zm4.5-6.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5a.5.5 0 0 1 0-1" />
                        </svg>{" "}
                        {ele.specialization}{" "}
                      </div>
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-geo-alt-fill"
                          viewBox="0 0 16 16"
                          color="#216ecf"
                        >
                          <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                        </svg>{" "}
                        {ele.country},{ele.city}{" "}
                      </div>

                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          fill="currentColor"
                          color="#216ecf"
                          className="bi bi-building-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3 0a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h3v-3.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V16h3a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zm1 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5M4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM7.5 5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5m2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM4.5 8h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5m2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5" />
                        </svg>{" "}
                        {ele.clinicname}{" "}
                      </div>
                    </div>

                    <div className="emailAndPhoneNumber">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          fill="currentColor"
                          color="#216ecf"
                          className="bi bi-envelope-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z" />
                        </svg>{" "}
                        {ele.email}{" "}
                      </div>
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          color="#216ecf"
                          fill="currentColor"
                          className="bi bi-telephone-fill"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"
                          />
                        </svg>{" "}
                        {ele.phonenumber}{" "}
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  className="bookAnAppointmentInDoctorBox"
                  onClick={() => {
                    setDoctorIdInBookBtn({
                      doctor_id: ele.doctor_id,
                      firstname: ele.firstname,
                      lastname: ele.lastname,
                      specialization: ele.specialization,
                      clinicname: ele.clinicname,
                    });
                   handleAction()
                  }}
                >
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    className="bi bi-calendar-check"
                    viewBox="0 0 16 16"
                    id="iconInBookAppointment"
                  >
                    <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0" />
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                  </svg>{" "}
                  Book appointment
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        {showErrorMessage && <div className="errorMessage">{errorMessage}</div>}
      </div>
      <ToastContainer />
    </div>
  );
}

export default allDoctorAfterSearch;
