import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for React Router v6+
import 'react-toastify/dist/ReactToastify.css';

const AppointmentHistory = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const [appointments, setAppointments] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  const [newAppointment, setNewAppointment] = useState({
    clinicName: '',
    place: '',
    doctorName: '',
    petName: '',
    type: 'regular', // default to "regular"
    time: '',
    description: '',
  });
  const [clickCount, setClickCount] = useState({});
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [dateToUnmark, setDateToUnmark] = useState(null);

  const navigate = useNavigate(); // Initialize useNavigate

  const handleDateClick = (date) => {
    const dateKey = date.toLocaleDateString();
    const currentClickCount = clickCount[dateKey] || 0;

    if (currentClickCount === 1 && appointments[dateKey]) {
      setClickCount((prev) => ({ ...prev, [dateKey]: 2 }));
    } else {
      setClickCount((prev) => ({ ...prev, [dateKey]: 1 }));
    }
    setSelectedDate(dateKey);
  };

  const handleUnmarkClick = (dateKey) => {
    setShowConfirmDialog(true);
    setDateToUnmark(dateKey);
  };

  const confirmUnmark = () => {
    setAppointments((prevAppointments) => {
      const updatedAppointments = { ...prevAppointments };
      delete updatedAppointments[dateToUnmark];
      return updatedAppointments;
    });
    setShowConfirmDialog(false);
    setDateToUnmark(null);
    toast.success('Appointment Unmarked!', { position: toast.POSITION.TOP_CENTER });
  };

  const cancelUnmark = () => {
    setShowConfirmDialog(false);
    setDateToUnmark(null);
  };

  const handleSubmit = (date) => {
    const dateKey = date.toLocaleDateString();
    setAppointments((prevAppointments) => ({
      ...prevAppointments,
      [dateKey]: newAppointment,
    }));
    toast.success('Appointment Saved!', { position: toast.POSITION.TOP_CENTER });
    setNewAppointment({
      clinicName: '',
      place: '',
      doctorName: '',
      petName: '',
      type: 'regular', // reset type
      time: '',
      description: '',
    });
  };

  const renderCalendarDays = () => {
    const daysArray = [];
    
    // First, create the empty divs for the days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      daysArray.push(<div key={`empty-${i}`} className="w-12 h-12"></div>);
    }
  
    // Now, loop through the actual days of the month, from 1 to daysInMonth
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i); // Create a date object for each day
      const dateKey = date.toLocaleDateString(); // Get a unique key for the date
      const isAppointmentScheduled = appointments[dateKey];
  
      daysArray.push(
        <div
          key={i}
          className={`flex items-center justify-center m-0 p-0 cursor-pointer rounded-lg border
            ${isAppointmentScheduled ? 'bg-green-500 text-white' : 'hover:bg-gray-200'} 
            ${selectedDate === dateKey ? 'bg-blue-500 text-white' : ''} flex-1`}
          onClick={() => handleDateClick(date)}
        >
          {i}
          {isAppointmentScheduled && clickCount[dateKey] === 2 && (
            <button
              className="absolute top-1 right-1 bg-red-500 text-white text-xs py-1 px-2 rounded"
              onClick={(e) => {
                e.stopPropagation();
                handleUnmarkClick(dateKey);
              }}
            >
              Unmark
            </button>
          )}
        </div>
      );
    }
  
    return daysArray;
  };
  

  const renderAppointmentDetails = () => {
    if (selectedDate && appointments[selectedDate]) {
      const appointment = appointments[selectedDate];
      return (
        <div className="p-4 border rounded-lg shadow-md bg-white">
          <h3 className="text-xl font-semibold">Appointment Details</h3>
          <p><strong>Clinic Name:</strong> {appointment.clinicName}</p>
          <p><strong>Place:</strong> {appointment.place}</p>
          <p><strong>Doctor Name:</strong> {appointment.doctorName}</p>
          <p><strong>Pet Name:</strong> {appointment.petName}</p>
          <p><strong>Type:</strong> {appointment.type === 'vaccination' ? 'Vaccination' : 'Regular Appointment'}</p>
          <p><strong>Time:</strong> {new Date(`1970-01-01T${appointment.time}`).toLocaleString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
          <p><strong>Description:</strong> {appointment.description}</p>
        </div>
      );
    } else if (selectedDate) {
      return (
        <div className="p-4 border rounded-lg shadow-md bg-white">
          <h3 className="text-xl font-semibold">Add Appointment</h3>
          <input
            type="text"
            placeholder="Clinic Name"
            className="w-full p-2 mb-2 border rounded"
            value={newAppointment.clinicName}
            onChange={(e) => setNewAppointment({ ...newAppointment, clinicName: e.target.value })}
          />
          <input
            type="text"
            placeholder="Place"
            className="w-full p-2 mb-2 border rounded"
            value={newAppointment.place}
            onChange={(e) => setNewAppointment({ ...newAppointment, place: e.target.value })}
          />
          <input
            type="text"
            placeholder="Doctor Name"
            className="w-full p-2 mb-2 border rounded"
            value={newAppointment.doctorName}
            onChange={(e) => setNewAppointment({ ...newAppointment, doctorName: e.target.value })}
          />
          <input
            type="text"
            placeholder="Pet Name"
            className="w-full p-2 mb-2 border rounded"
            value={newAppointment.petName}
            onChange={(e) => setNewAppointment({ ...newAppointment, petName: e.target.value })}
          />
          <div className="mb-4">
            <label className="mr-4">Appointment Type</label>
            <label className="mr-4">
              <input
                type="radio"
                name="appointmentType"
                value="regular"
                checked={newAppointment.type === 'regular'}
                onChange={() => setNewAppointment({ ...newAppointment, type: 'regular' })}
              />
              Regular Appointment
            </label>
            <label>
              <input
                type="radio"
                name="appointmentType"
                value="vaccination"
                checked={newAppointment.type === 'vaccination'}
                onChange={() => setNewAppointment({ ...newAppointment, type: 'vaccination' })}
              />
              Vaccination
            </label>
          </div>
          <input
            type="time"
            className="w-full p-2 mb-2 border rounded"
            value={newAppointment.time}
            onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
          />
          <textarea
            placeholder="Description"
            className="w-full p-2 mb-2 border rounded"
            value={newAppointment.description}
            onChange={(e) => setNewAppointment({ ...newAppointment, description: e.target.value })}
          />
          <button
            onClick={() => handleSubmit(new Date(selectedDate))}
            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Save Appointment
          </button>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-4 h-screen relative overflow-hidden">
      {/* Go Back Button (outside the form, at top-right corner) */}
      <button
        onClick={() => navigate(-1)} // Navigate to the previous page
        className="absolute top-4 right-4 text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
      >
        Go Back
      </button>

      {/* Calendar and Appointment Section */}
      <div className="flex space-x-20 mt-16 h-screen">
        {/* Calendar Section */}
        <div className="w-1/2 h-screen overflow-hidden p-4 border rounded-lg shadow-md bg-light-blue-200 border-light-blue-300">
          <div className="flex items-center space-x-4 mb-4 bg-light-blue-300 p-4 rounded-t-lg">
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
              {Array.from({ length: 10 }, (_, i) => currentYear - 5 + i).map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </select>
          </div>
          <div className="grid h-3/4 grid-cols-7 gap-2 ">{renderCalendarDays()}</div>
        </div>

        {/* Appointment Form Section */}
        <div className="w-1/2 p-4 border rounded-lg shadow-md bg-white">{renderAppointmentDetails()}</div>
      </div>

      {/* Confirm Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
            <p>Do you really want to unmark this appointment?</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={confirmUnmark}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Yes
              </button>
              <button
                onClick={cancelUnmark}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default AppointmentHistory;
