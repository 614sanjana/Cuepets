import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { FaSyringe, FaClipboardList } from "react-icons/fa";

const AppointmentScheduler = () => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const ownerID = localStorage.getItem("ownerID");
  const [appointments, setAppointments] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [pets, setPets] = useState([]);
  const [selectedPetID, setSelectedPetID] = useState(null);
  const [newAppointment, setNewAppointment] = useState({
    clinicName: "",
    location: "",
    veterinarianName: "",
    appointmentType: "regular",
    appointmentTime: "",
    appointmentDate: "",
    description: "",
  });

  const isLeapYear = (year) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

  const getDaysInMonth = (month, year) => {
    if (month === 1) return isLeapYear(year) ? 29 : 28;
    if ([3, 5, 8, 10].includes(month)) return 30;
    return 31;
  };

  const daysInMonth = getDaysInMonth(month, year);
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const handleDateClick = (date) => {
    setSelectedDate(date.toLocaleDateString());
    setNewAppointment((prev) => ({
      ...prev,
      appointmentDate: date.toLocaleDateString(),
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedPetID) {
      toast.error("Please select a pet!", { position: toast.POSITION.TOP_CENTER });
      return;
    }

    try {
      await axios.post(
        `http://localhost:8080/api/v1/appointments/addAppointment/${ownerID}/${selectedPetID}`,
        newAppointment
      );
      toast.success("Appointment Saved!", { position: toast.POSITION.TOP_CENTER });
      setNewAppointment({
        clinicName: "",
        location: "",
        veterinarianName: "",
        appointmentType: "regular",
        appointmentTime: "",
        appointmentDate: "",
        description: "",
      });
    } catch (error) {
      toast.error(`Error: ${error.response?.data || error.message}`, { position: toast.POSITION.TOP_CENTER });
    }
  };

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/pets/names/${ownerID}`);
        setPets(response.data);
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };

    fetchPets();
  }, [ownerID]);

  const renderCalendarDays = () => {
    const daysArray = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      daysArray.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const dateKey = date.toLocaleDateString();
      const isAppointmentScheduled = appointments[dateKey];

      daysArray.push(
        <div
          key={i}
          className={`flex flex-col items-center m-0 p-0 h-20 cursor-pointer rounded-lg border
            ${isAppointmentScheduled ? "bg-green-500 text-white" : "hover:bg-purple-400"}
            ${selectedDate === dateKey ? "bg-blue-300 text-white" : ""}`}
          onClick={() => handleDateClick(date)}
        >
          <div className="flex items-center justify-center h-8">
            {isAppointmentScheduled && (
              <>
                {appointments[dateKey]?.appointmentType === "vaccination" && (
                  <FaSyringe className="text-white text-xl" />
                )}
                {appointments[dateKey]?.appointmentType === "regular" && (
                  <FaClipboardList className="text-white text-xl" />
                )}
              </>
            )}
          </div>
          <div className="font-bold flex items-center justify-center w-10 h-10 text-black">
            {i}
          </div>
        </div>
      );
    }

    return daysArray;
  };

  return (
    <div className="p-4 h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-4">
        <div className="text-4xl font-semibold text-blue-600">Your Appointments</div>
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go Back
        </button>
      </div>

      <div className="flex space-x-10">
        {/* Calendar Section */}
        <div className="w-1/3 p-4 border rounded-lg shadow-md bg-white">
          <div className="flex items-center justify-between mb-4">
            <select
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="border p-2 rounded"
            >
              {months.map((monthName, index) => (
                <option key={index} value={index}>
                  {monthName}
                </option>
              ))}
            </select>
            <select
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="border p-2 rounded"
            >
              {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map((yearValue) => (
                <option key={yearValue} value={yearValue}>
                  {yearValue}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-7 gap-1 bg-gray-100 p-2 rounded-lg">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="font-semibold text-center">
                {day}
              </div>
            ))}
            {renderCalendarDays()}
          </div>
        </div>

        {/* Appointment Details Section */}
        <div className="w-2/3 p-4 border rounded-lg shadow-md bg-white">
          {selectedDate ? (
            <form onSubmit={handleSubmit}>
              <h3 className="text-xl font-semibold mb-4">
                Add Appointment for {selectedDate}
              </h3>

              <div className="mb-4">
                <label className="block font-medium mb-2">Select Pet</label>
                <select
                  value={selectedPetID}
                  onChange={(e) => setSelectedPetID(e.target.value)}
                  className="w-full border p-2 rounded"
                  required
                >
                  <option value="">Select a Pet</option>
                  {pets.map((pet) => (
                    <option key={pet.petID} value={pet.petID}>
                      {pet}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block font-medium mb-2">Clinic Name</label>
                <input
                  type="text"
                  name="clinicName"
                  value={newAppointment.clinicName}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block font-medium mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={newAppointment.location}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block font-medium mb-2">Veterinarian Name</label>
                <input
                  type="text"
                  name="veterinarianName"
                  value={newAppointment.veterinarianName}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block font-medium mb-2">Appointment Type</label>
                <select
                  name="appointmentType"
                  value={newAppointment.appointmentType}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                >
                  <option value="regular">Regular</option>
                  <option value="vaccination">Vaccination</option>
                  <option value="checkup">Check-Up</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block font-medium mb-2">Time</label>
                <input
                  type="time"
                  name="appointmentTime"
                  value={newAppointment.appointmentTime}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block font-medium mb-2">Description</label>
                <textarea
                  name="description"
                  value={newAppointment.description}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  rows="2"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save Appointment
              </button>
            </form>
          ) : (
            <div className="text-center text-gray-500">Select a date to schedule an appointment</div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AppointmentScheduler;
