const DoctorCard = () => {
  return (
    <div className="max-w-md mx-auto bg-white border-stroke rounded-xl shadow-default overflow-hidden md:max-w-2xl m-3 dark:border-strokedark dark:bg-boxdark">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img
            className="h-48 w-full object-cover md:w-48"
            src="https://randomuser.me/api/portraits/men/75.jpg"
            alt="Doctor's image"
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            Dr. John Doe
          </div>
          <p className="block mt-1 text-lg leading-tight font-medium text-black dark:text-white">
            Specialty: Cardiology
          </p>
          <p className="mt-2 text-gray-500">Available Time Slots:</p>
          <ul className="list-disc unlisted list-inside flex gap-3">
            <li>10:00 - 11:00</li>
            <li>13:00 - 14:00</li>
            <li>16:00 - 17:00</li>
          </ul>
          <button className="mt-5 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
