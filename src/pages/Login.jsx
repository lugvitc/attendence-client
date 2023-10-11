import React from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster, ToastBar } from "react-hot-toast";
import { useFormik } from "formik";
import axios from "axios";
import QRCode from "qrcode";
import { useState, useEffect } from "react";
import b64ux from 'b64ux';
import favicon from '../assets/favicon.png'


export default function Login() {
  const [imageUrl, setImageUrl] = useState("");
  const [checkFlg, setCheckFlg] = useState(false);
  const generateQrCode = async (text) => {
    try {
      const response = await QRCode.toDataURL(text);

      setImageUrl(response);
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      // console.log(values);
      axios
        .post("http://localhost:8000/login", values)
        .then(function (response) {
          // console.log(response.data);
          const encoded = b64ux.encode(response.data.toString(), 'string');
          // console.log(encoded);
          generateQrCode(encoded);
          setCheckFlg(true);
        })
        .catch(function (error) {
          console.log(error);
          toast.error("This didn't work.");
        });
    },
    validate: (values) => {
      let errors = {};
      if (!values.username) {
        errors.username = "Required";
        // console.log("name de");
      }
      if (!values.password) {
        errors.password = "Required";
        // console.log("pasport de");
      }
      return errors;
    },
  });

  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center flex flex-col justify-center items-center">
          <img src={favicon} className="h-40 w-40" alt="img" />
          <h1 className="text-2xl text-zinc-50 font-bold sm:text-3xl">The Linux Club</h1>

          <p className="mt-4 text-zinc-50">
            Username : Register number <br />
            Password : Phone number
          </p>
        </div>

        <form
          action=""
          className="mx-auto mb-0 mt-8 max-w-md space-y-4"
          onSubmit={formik.handleSubmit}
        >
          <div>
            <label htmlFor="email" className="sr-only">
              Username
            </label>

            <div className="relative">
              <input
                type="text"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter Register No."
                onChange={formik.handleChange}
                value={formik.values.username}
                id="username"
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>

            <div className="relative">
              <input
                type="password"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter password"
                required
                onChange={formik.handleChange}
                value={formik.values.password}
                id="password"
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="inline-block rounded-lg bg-slate-600 px-5 py-3 text-sm font-medium text-white"
              // type="submit"
            >
              Generate
            </button>
          </div>
        </form>
      </div>
      {/* QR Code */}
      <div className="mx-auto flex justify-center items-center">
        {checkFlg ? <img src={imageUrl} alt="img" /> : null}
      </div>
    </>
  );
}
