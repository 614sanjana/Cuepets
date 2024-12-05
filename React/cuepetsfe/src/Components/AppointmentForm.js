import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppointmentHistory = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // Get the first day of the month

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const [selectedDate, setSelectedDate] = useState(null);
  const [appointments, setAppointments] = useState({});
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  const [newAppointment, setNewAppointment] = useState({
    clinicName: '',
    place: '',
    doctorName: '',
    petName: '',
    description: '',
  });
  const [hoveredDate, setHoveredDate] = useState(null); // For hover effect
  const [confirmationModal, setConfirmationModal] = useState(false); // For confirmation dialog
  const [appointmentToDelete, setAppointmentToDelete] = useState(null); // Track which appointment to delete

  // Handle saving a new appointment
  const handleSubmit = (date) => {
    const dateKey = date.toLocaleDateString(); // Format the date as MM/DD/YYYY
    setAppointments((prevAppointments) => {
      return { ...prevAppointments, [dateKey]: newAppointment };
    });
    toast.success('Appointment Saved!', {
      position: toast.POSITION.TOP_CENTER,
    });
    setNewAppointment({
      clinicName: '',
      place: '',
      doctorName: '',
      petName: '',
      description: '',
    });
  };

  // Handle unmark confirmation
  const handleUnmarkConfirm = () => {
    if (appointmentToDelete) {
      setAppointments((prevAppointments) => {
        const updatedAppointments = { ...prevAppointments };
        delete updatedAppointments[appointmentToDelete];
        return updatedAppointments;
      });
      toast.success('Appointment Unmarked!', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    setConfirmationModal(false);
  };

  // Handle month change
  const handleMonthChange = (e) => {
    const newMonth = e.target.selectedIndex;
    setMonth(newMonth);
  };

  // Handle year change
  const handleYearChange = (e) => {
    const newYear = e.target.value;
    setYear(newYear);
  };

  // Render calendar days
  const renderCalendarDays = () => {
    const daysArray = [];

    // Fill empty spaces for the first week of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      daysArray.push(<div key={`empty-${i}`} className="w-12 h-12"></div>);
    }

    // Fill the days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const dateKey = date.toLocaleDateString(); // Format date as MM/DD/YYYY
      const isAppointmentScheduled = appointments[dateKey];

      daysArray.push(
        <div
          key={i}
          className={`relative w-12 h-12 flex items-center justify-center cursor-pointer rounded-lg ${
            isAppointmentScheduled ? 'bg-green-500 text-white' : 'hover:bg-gray-200'
          }`}
          onClick={() => handleDateClick(date)}
          onMouseEnter={() => handleDateHover(dateKey)}
          onMouseLeave={() => handleDateLeave()}
        >
          {i}
          {isAppointmentScheduled && hoveredDate === dateKey && (
            <button
              className="absolute top-1 right-1 bg-red-500 text-white text-xs py-1 px-2 rounded"
              onClick={(e) => handleUnmarkClick(e, dateKey)}
            >
              Unmark
            </button>
          )}
        </div>
      );
    }

    return daysArray;
  };

  // Handle date click
  const handleDateClick = (date) => {
    const dateKey = date.toLocaleDateString();
    setSelectedDate(dateKey);
  };

  // Handle date hover
  const handleDateHover = (dateKey) => {
    setHoveredDate(dateKey);
  };

  // Handle hover leave
  const handleDateLeave = () => {
    setHoveredDate(null);
  };

  // Handle unmark click (show confirmation modal)
  const handleUnmarkClick = (e, dateKey) => {
    e.stopPropagation(); // Prevent the date click from firing
    setAppointmentToDelete(dateKey);
    setConfirmationModal(true);
  };

  // Render appointment details or form to add a new appointment
  const renderAppointmentDetails = () => {
    if (selectedDate && appointments[selectedDate]) {
      const appointment = appointments[selectedDate];
      return (
        <div className="mt-4 p-4 border rounded-lg bg-white shadow-md">
          <h3 className="text-xl font-semibold">Appointment Details</h3>
          <p><strong>Clinic Name:</strong> {appointment.clinicName}</p>
          <p><strong>Place:</strong> {appointment.place}</p>
          <p><strong>Doctor Name:</strong> {appointment.doctorName}</p>
          <p><strong>Pet Name:</strong> {appointment.petName}</p>
          <p><strong>Description:</strong> {appointment.description}</p>
        </div>
      );
    } else if (selectedDate) {
      return (
        <div className="mt-4 p-4 border rounded-lg bg-white shadow-md">
          <h3 className="text-xl font-semibold">Add Appointment</h3>
          <input
            type="text"
            placeholder="Clinic Name"
            className="w-full p-2 mb-2 border border-gray-300 rounded-md"
            value={newAppointment.clinicName}
            onChange={(e) => setNewAppointment({ ...newAppointment, clinicName: e.target.value })}
          />
          <input
            type="text"
            placeholder="Place"
            className="w-full p-2 mb-2 border border-gray-300 rounded-md"
            value={newAppointment.place}
            onChange={(e) => setNewAppointment({ ...newAppointment, place: e.target.value })}
          />
          <input
            type="text"
            placeholder="Doctor Name"
            className="w-full p-2 mb-2 border border-gray-300 rounded-md"
            value={newAppointment.doctorName}
            onChange={(e) => setNewAppointment({ ...newAppointment, doctorName: e.target.value })}
          />
          <input
            type="text"
            placeholder="Pet Name"
            className="w-full p-2 mb-2 border border-gray-300 rounded-md"
            value={newAppointment.petName}
            onChange={(e) => setNewAppointment({ ...newAppointment, petName: e.target.value })}
          />
          <textarea
            placeholder="Description"
            className="w-full p-2 mb-2 border border-gray-300 rounded-md"
            value={newAppointment.description}
            onChange={(e) => setNewAppointment({ ...newAppointment, description: e.target.value })}
          />
          <button
            onClick={() => handleSubmit(new Date(year, month, selectedDate.split('/')[1]))}
            className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600"
          >
            Save Appointment
          </button>
        </div>
      );
    }
  };

  // Render confirmation modal
  const renderConfirmationModal = () => {
    if (confirmationModal) {
      return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-semibold">Are you sure you want to unmark this appointment?</h3>
            <div className="mt-4 flex justify-between">
              <button
                onClick={handleUnmarkConfirm}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
              >
                Yes
              </button>
              <button
                onClick={() => setConfirmationModal(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
              >
                No
              </button>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="container mx-auto py-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold">{months[month]} {year}</h2>
        <div className="mt-2 flex justify-center space-x-4">
          <select
            className="border p-2 rounded"
            value={month}
            onChange={handleMonthChange}
          >
            {months.map((month, index) => (
              <option key={index} value={index}>{month}</option>
            ))}
          </select>
          <input
            type="number"
            value={year}
            onChange={handleYearChange}
            className="border p-2 rounded w-20"
            min={1900}
          />
        </div>
      </div>

      <div className="grid grid-cols-7 gap-4 mt-6 text-center">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
          <div key={index} className="font-semibold">{day}</div>
        ))}

        {renderCalendarDays()}
      </div>

      {renderAppointmentDetails()}
      {renderConfirmationModal()}
      <ToastContainer autoClose={5000} limit={1} closeButton={false} />
    </div>
  );
};

export default AppointmentHistory;
