const AppointmentCard = () => {
  return (
    <div className="max-w-md mx-auto bg-white border-stroke rounded-xl shadow-default overflow-hidden md:max-w-2xl m-5 dark:border-strokedark dark:bg-boxdark">
      <div className="p-8 flex items-center">
        <div className="pr-4 bg-blue-200 dark:bg-blue-500 p-2 rounded-lg text-center">
          <p className="text-4xl font-bold text-white">18th</p>
          <p className="text-sm text-white">November, 2023</p>
        </div>
        <div className="ml-4">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            Clinic Appointment
          </div>
          <p className="mt-2 text-gray-500">9:20 AM - 9:40 AM</p>
          <p className="mt-2 text-gray-500">
            Dr. John Doe, General Practitioner
          </p>
          <p className="mt-2 text-gray-500">Patient: Jane Doe</p>
          <button className="mt-5 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            View Details
          </button>
          <button className="mt-5 ml-3 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
            Cancel Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
