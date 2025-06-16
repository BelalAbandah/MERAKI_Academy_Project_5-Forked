"use client";
import React, { useEffect, useState } from "react";
import "./register.css";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    age: "",
    country: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const [msg, setMsg] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const [userID, setUID] = useState<string>("");
  const [role, setRole] = useState<string>("");

  console.log(form);
  console.log(msg);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/users/register", form)
      .then((response) => {
        console.log(response.data);
        setForm(response.data);
        setMsg("Registered Successfully");
        setSuccess(true);
        setTimeout(() => {
          setMsg("");
        }, 3000);
        localStorage.setItem("token", response.data.token);
        const token_decoded = JSON.parse(
          atob(response.data.token.split(".")[1])
        );
        localStorage.setItem("UID", token_decoded.userID);
        localStorage.setItem("role", token_decoded.role);
        setToken(response.data.token);
        setUID(token_decoded.userId);
        setRole(token_decoded.role.role);
        router.push("/home");
      })
      .catch((err) => {
        // setSuccess(false);
        setMsg("Can't register please check the fields again");
        setTimeout(() => {
          setMsg("");
        }, 3000);
      });
    setSuccess(false);
  };

  //  useEffect(() => {

  // }, []);

  return (
    <div className="container">
      <div className="title">Registration</div>
      <div className="content">
        <form onSubmit={onSubmit}>
          <div className="user-details">
            <div className="input-box">
              <span className="details">First Name</span>
              <input
                name="firstName"
                type="text"
                placeholder="Enter your First Name"
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-box">
              <span className="details">Last Name</span>
              <input
                name="lastName"
                type="text"
                placeholder="Enter your Last Name"
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-box">
              <span className="details">Age</span>
              <input
                name="age"
                type="text"
                placeholder="Enter your Age"
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-box">
              <span className="details">Country</span>
              <input
                name="country"
                type="text"
                placeholder="Enter your Country"
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-box">
              <span className="details">Phone Number</span>
              <input
                name="phoneNumber"
                type="text"
                placeholder="Enter your number"
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-box">
              <span className="details">Email</span>
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-box">
              <span className="details">Password</span>
              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="gender-details">
            <input type="radio" name="gender" id="dot-1" />
            <input type="radio" name="gender" id="dot-2" />
            <span className="gender-title">Gender</span>
            <div className="category">
              <label htmlFor="dot-1">
                <span className="dot one"></span>
                <span className="gender">Male</span>
              </label>

              <label htmlFor="dot-2">
                <span className="dot two"></span>
                <span className="gender">Female</span>
              </label>
            </div>
          </div>

          <div className="button">
            <input type="submit" value="Register" />
          </div>

          {msg && (
            <div className={success ? "success" : "failed"}>
              {" "}
              <p className="msg">{msg}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
