import React, { useState } from 'react';
import img from './assets/pd.svg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowRoundBack } from "react-icons/io";
import { logout } from "../../store/auth";

const SelfDeclaration = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const userId = useSelector((state) => state.auth.userId);
    const [formData, setFormData] = useState({
        userId,
        username: "",
        mobile: "",
        email: "",
        address: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "mobile") {
            const isNumeric = /^[0-9]*$/.test(value); // Check if the value is numeric
            if (isNumeric && value.length <= 10) {
                setFormData({
                    ...formData,
                    [name]: value
                });
            }
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Validate form fields
        if (
            !formData.username ||
            !formData.mobile ||
            !formData.email ||
            !formData.address
        ) {
            setError("Please fill in all fields.");
            setIsSubmitting(false);
            return;
        }

        if (localStorage.getItem('email') !== formData.email) {
            setError("The email you entered doesn't match with your account.");
            setIsSubmitting(false);
            return;
        }

        try {
            // Store form data in local storage
            localStorage.setItem("formData", JSON.stringify(formData));

            navigate("/terms-and-condition"); // Navigate to Terms and Conditions page

            // Reset form after successful submission
            setFormData({
                username: "",
                mobile: "",
                email: "",
                address: "",
            });
            setError(""); // Clear any existing error
        } catch (error) {
            console.error("There was an error submitting the form:", error);
        } finally {
            setIsSubmitting(false); // Stop loader
        }
    };

    const handleBackClick = async () => {
        try {
            await axios.post(
                `${process.env.REACT_APP_API_URL}/logout`,
                { userId },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            localStorage.removeItem("token");
            dispatch(logout());
            navigate("/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <>
            <div className="flex items-center m-5 ">
                <button
                    onClick={handleBackClick}
                    className="text-[#666666] flex items-center gap-2"
                >
                    <IoIosArrowRoundBack className="text-2xl" />
                    Back
                </button>
            </div>
            <div className="w-full flex justify-center py-10">
                <div className="w-[90%] flex flex-col gap-10">
                    <div>
                        <h2 className="text-[#666666] text-center text-[52px] max-xl:text-[35px] max-lg:text-[28px] max-sm:text-[24px] font-semibold">
                            Welcome to{" "}
                            <span className="text-[#FB861E]">Fucturica Technologies </span>
                        </h2>
                    </div>
                    <div className="flex justify-center gap-20">
                        <img src={img} alt="logo" />

                        <form
                            onSubmit={handleSubmit}
                            className="space-x-10 bg-[#fff] p-10 rounded-[30px] shadow-xl"
                        >
                            <h3 className="text-[#666666] text-center text-[24px] font-light">
                                Please Fill Out the Following Information
                            </h3>
                            <div className="flex flex-col py-10">
                                <div className="space-y-5">
                                    <div>

                                        <input
                                            type="text"
                                            id="username"
                                            name="username"
                                            placeholder="Username"
                                            className="bg-transparent w-full border border-[#666666] rounded-2xl px-4 py-3"
                                            value={formData.username}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <input
                                            type="text"
                                            id="mobile"
                                            name="mobile"
                                            placeholder="Mobile No."
                                            className="bg-transparent w-full border border-[#666666] rounded-2xl px-4 py-3"
                                            value={formData.mobile}
                                            onChange={handleChange}
                                            maxLength="10"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder="Email"
                                            className="bg-transparent w-full border border-[#666666] rounded-2xl px-4 py-3"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <textarea
                                            id="address"
                                            name="address"
                                            placeholder="Permanent Address"
                                            className="bg-transparent w-full border border-[#666666] rounded-2xl px-4 py-3"
                                            value={formData.address}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                            </div>
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="py-2 px-6 bg-gradient-to-r from-[#007BFF] to-[#0056B3] text-white rounded-[30px]"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Please wait..." : "Next"}
                                </button>
                            </div>

                            {error && <p className='text-red-500 text-center mt-2 text-sm'>{error}</p>}
                        </form>

                    </div>
                </div>
            </div>
        </>
    );
};

export default SelfDeclaration;
