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
  const [selectedPetName, setSelectedPetName] = useState("");
  const [selectedPetID, setSelectedPetID] = useState(null);
  const [newAppointment, setNewAppointment] = useState({
    clinicName: "",
    location: "",
    veterinarianName: "",
    appointmentType: "regular",
    appointmentTime: "",
    appointmentDate: "",
    description: "",
    ampm: "",
  });
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // For hover effect

  const isLeapYear = (year) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

  const getDaysInMonth = (month, year) => {
    if (month === 1) return isLeapYear(year) ? 29 : 28;
    if ([3, 5, 8, 10].includes(month)) return 30;
    return 31;
  };

  const daysInMonth = getDaysInMonth(month, year);
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const handleDateClick = (date) => {
    const dateKey = date.toLocaleDateString();
    setSelectedDate(dateKey);
    setNewAppointment((prev) => ({
      ...prev,
      appointmentDate: dateKey,
    }));

    if (appointments[dateKey] && appointments[dateKey].length > 0) {
      setSelectedAppointment(appointments[dateKey][0]);
      setIsFormVisible(false);
    } else {
      setSelectedAppointment(null);
      setIsFormVisible(true);
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

  const fetchPetID = async (petName) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/pets/getPetID/${petName}`);
      setSelectedPetID(response.data);
    } catch (error) {
      toast.error(`Error fetching pet ID: ${error.response?.data || error.message}`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const handlePetChange = (e) => {
    const petName = e.target.value;
    setSelectedPetName(petName);
    fetchPetID(petName);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/appointments/getAppointments/${ownerID}`);
      const appointmentsData = response.data.reduce((acc, appointment) => {
        const date = new Date(appointment.appointmentDate).toLocaleDateString();
        if (!acc[date]) acc[date] = [];
        acc[date].push(appointment);
        return acc;
      }, {});
      setAppointments(appointmentsData);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [ownerID]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedPetID) {
      toast.error("Please select a pet!", { position: toast.POSITION.TOP_CENTER });
      return;
    }

    const finalAppointmentTime = `${newAppointment.appointmentTime} ${newAppointment.ampm}`;

    const appointmentData = { ...newAppointment, appointmentTime: finalAppointmentTime };

    try {
      await axios.post(
        `http://localhost:8080/api/v1/appointments/addAppointment/${ownerID}/${selectedPetID}`,
        appointmentData
      );
      toast.success("Appointment Saved!", { position: toast.POSITION.TOP_CENTER });
      fetchAppointments();
      setNewAppointment({
        clinicName: "",
        location: "",
        veterinarianName: "",
        appointmentType: "regular",
        appointmentTime: "",
        appointmentDate: "",
        description: "",
        ampm: "AM",
      });
      setSelectedPetName("");
      setSelectedPetID(null);
      setIsFormVisible(false);
    } catch (error) {
      toast.error(`Error saving appointment: ${error.response?.data || error.message}`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div className="p-4 h-screen bg-gray-50">
      <ToastContainer />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-semibold text-blue-600">Appointment Scheduler</h1>
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go Back
        </button>
      </div>

      <div className="flex space-x-10">
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
            {[...Array(firstDayOfMonth)].map((_, index) => (
              <div key={`empty-${index}`} className="w-8 h-8"></div>
            ))}
            {[...Array(daysInMonth)].map((_, index) => {
              const date = new Date(year, month, index + 1);
              const dateKey = date.toLocaleDateString();
              const isAppointmentScheduled = appointments[dateKey];

              return (
                <div
                  key={index}
                  onClick={() => handleDateClick(date)}
                  className={`flex flex-col items-center m-0 p-0 h-20 cursor-pointer rounded-lg border 
                  ${isAppointmentScheduled ? "bg-green-500 text-white" : "hover:bg-purple-400"}
                  ${selectedDate === dateKey ? "bg-blue-300 text-white" : ""}`}
                >
                  <div className="flex items-center justify-center h-8">
                    {isAppointmentScheduled && (
                      <>
                        {appointments[dateKey].map((appt, idx) => (
                          appt.appointmentType === "vaccination" ? (
                            <FaSyringe key={`vaccine-${idx}`} className="text-white text-xl" />
                          ) : (
                            <FaClipboardList key={`regular-${idx}`} className="text-white text-xl" />
                          )
                        ))}
                      </>
                    )}
                  </div>
                  <div className="font-bold flex items-center justify-center w-10 h-10 text-black">
                    {index + 1}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-2/3 p-4 border rounded-lg shadow-md bg-white">
          {isFormVisible ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block font-medium mb-2">Pet Name</label>
                <select
                  name="petName"
                  value={selectedPetName}
                  onChange={handlePetChange}
                  className="w-full border p-2 rounded"
                  required
                >
                  <option value="">Select a Pet</option>
                  {pets.map((pet, index) => (
                    <option key={index} value={pet}>
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
                >
                  <option value="regular">Regular</option>
                  <option value="vaccination">Vaccination</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block font-medium mb-2">Appointment Time</label>
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
                  rows="3"
                  required
                />
              </div>

              <div className="mb-4">
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
                >
                  Save Appointment
                </button>
              </div>
            </form>
          ) : selectedAppointment ? (
            <div
              className={`border-2 border-blue-500 bg-blue-50 rounded-lg p-6 max-w-2xl mx-auto text-center shadow-xl transition-transform duration-300 ease-in-out transform ${
                isHovered ? 'scale-105' : ''
              }`}
              onClick={() => setIsHovered(!isHovered)}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <h3 className="text-3xl font-bold text-blue-600 mb-6">Appointment Details</h3>
              <p className="text-lg mb-2"><strong>Pet Name:</strong> {selectedAppointment.petId}</p>
              <p className="text-lg mb-2"><strong>Clinic:</strong> {selectedAppointment.clinicName}</p>
              <p className="text-lg mb-2"><strong>Location:</strong> {selectedAppointment.location}</p>
              <p className="text-lg mb-2"><strong>Veterinarian:</strong> {selectedAppointment.veterinarianName}</p>
              <p className="text-lg mb-2"><strong>Type:</strong> {selectedAppointment.appointmentType}</p>
              <p className="text-lg mb-2"><strong>Date:</strong> {selectedAppointment.appointmentDate}</p>
              <p className="text-lg mb-2"><strong>Time:</strong> {selectedAppointment.appointmentTime}</p>
              <p className="text-lg mb-4"><strong>Description:</strong> {selectedAppointment.description}</p>
            </div>
          ) : (
            <div className="text-center text-xl text-gray-600">Click a date to view or create an appointment</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentScheduler;
