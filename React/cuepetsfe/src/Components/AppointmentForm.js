import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppointmentScheduler = () => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const [appointments, setAppointments] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [newAppointment, setNewAppointment] = useState({
    clinicName: '',
    place: '',
    doctorName: '',
    petName: '',
    type: 'regular',
    time: '',
    description: '',
  });

  // List of pets (this should come from your Manage Pet section)
  const pets = ['Buddy', 'Bella', 'Charlie', 'Max']; // Example, replace with actual data

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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dateKey = selectedDate;
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
      type: 'regular',
      time: '',
      description: '',
    });
  };

  const handleUnmark = () => {
    setAppointments((prevAppointments) => {
      const updatedAppointments = { ...prevAppointments };
      delete updatedAppointments[selectedDate];
      return updatedAppointments;
    });
    toast.info('Appointment Unmarked!', { position: toast.POSITION.TOP_CENTER });
    setSelectedDate(null);
  };

  const formatTime = (time) => {
    const date = new Date(`1970-01-01T${time}:00`);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutes} ${ampm}`;
  };

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
          className={`flex items-center justify-center m-0 p-0 cursor-pointer rounded-lg border
            ${isAppointmentScheduled ? 'bg-green-500 text-white' : 'hover:bg-gray-200'} 
            ${selectedDate === dateKey ? 'bg-blue-500 text-white' : ''} flex-1`}
          onClick={() => handleDateClick(date)}
        >
          {i}
        </div>
      );
    }

    return daysArray;
  };

  return (
    <div className="p-4 h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-4">
        <div className="text-xl font-semibold">YOUR APPOINTMENTS</div>
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go Back
        </button>
      </div>

      <div className="flex space-x-10">
        <div className="w-1/3 p-4 border rounded-lg shadow-md bg-light-blue-100 border-light-blue-300">
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
              {Array.from({ length: 26 }, (_, i) => 2015 + i).map((yearValue) => (
                <option key={yearValue} value={yearValue}>
                  {yearValue}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-7 gap-1 bg-light-blue-200 border border-light-blue-400 rounded-lg p-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="font-semibold text-center">
                {day}
              </div>
            ))}
            {renderCalendarDays()}
          </div>
        </div>

        <div className="w-2/3 p-4 border rounded-lg shadow-md bg-gray-100">
          {selectedDate && appointments[selectedDate] ? (
            <div>
              <h3 className="text-xl font-semibold mb-4">Appointment for {selectedDate}</h3>
              <div className="mb-4">
                <p><strong>Clinic Name:</strong> {appointments[selectedDate].clinicName}</p>
                <p><strong>Place:</strong> {appointments[selectedDate].place}</p>
                <p><strong>Doctor Name:</strong> {appointments[selectedDate].doctorName}</p>
                <p><strong>Pet Name:</strong> {appointments[selectedDate].petName}</p>
                <p><strong>Type:</strong> {appointments[selectedDate].type}</p>
                <p><strong>Time:</strong> {formatTime(appointments[selectedDate].time)}</p>
                <p><strong>Description:</strong> {appointments[selectedDate].description}</p>
              </div>
              <button
                onClick={handleUnmark}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Unmark Appointment
              </button>
            </div>
          ) : selectedDate ? (
            <form onSubmit={handleSubmit}>
              <h3 className="text-xl font-semibold mb-4">Add Appointment for {selectedDate}</h3>
              <div className="mb-4">
                <label className="block font-medium mb-2">Clinic Name</label>
                <input
                  type="text"
                  value={newAppointment.clinicName}
                  onChange={(e) =>
                    setNewAppointment({ ...newAppointment, clinicName: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-2">Place</label>
                <input
                  type="text"
                  value={newAppointment.place}
                  onChange={(e) =>
                    setNewAppointment({ ...newAppointment, place: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-2">Doctor Name</label>
                <input
                  type="text"
                  value={newAppointment.doctorName}
                  onChange={(e) =>
                    setNewAppointment({ ...newAppointment, doctorName: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-2">Pet Name</label>
                <select
                  value={newAppointment.petName}
                  onChange={(e) =>
                    setNewAppointment({ ...newAppointment, petName: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                >
                  <option value="">Select Pet</option>
                  {pets.map((petName, index) => (
                    <option key={index} value={petName}>
                      {petName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-2">Appointment Type</label>
                <div className="flex space-x-4">
                  <label>
                    <input
                      type="radio"
                      value="regular"
                      checked={newAppointment.type === 'regular'}
                      onChange={(e) =>
                        setNewAppointment({ ...newAppointment, type: e.target.value })
                      }
                    />
                    Regular
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="vaccination"
                      checked={newAppointment.type === 'vaccination'}
                      onChange={(e) =>
                        setNewAppointment({ ...newAppointment, type: e.target.value })
                      }
                    />
                    Vaccination
                  </label>
                </div>
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-2">Time</label>
                <input
                  type="time"
                  value={newAppointment.time}
                  onChange={(e) =>
                    setNewAppointment({ ...newAppointment, time: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-2">Description</label>
                <textarea
                  value={newAppointment.description}
                  onChange={(e) =>
                    setNewAppointment({ ...newAppointment, description: e.target.value })
                  }
                  className="w-full border p-2 rounded"
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
            <p className="text-center text-gray-600">
              Select a date to view or add an appointment.
            </p>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AppointmentScheduler;
