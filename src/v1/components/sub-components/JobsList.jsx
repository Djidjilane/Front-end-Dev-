import { MapPinIcon, ClockIcon, CurrencyEuroIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";

const JobList = ({ jobs }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {jobs.map((job, index) => (
      <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
            {job.urgent && (
              <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Urgent</span>
            )}
          </div>
          <p className="text-gray-600 mt-1">{job.company}</p>

          <div className="mt-4 space-y-2 text-gray-600 text-sm">
            <div className="flex items-center">
              <MapPinIcon className="h-5 w-5 mr-2" />
              <span>{job.location}</span>
            </div>

            <div className="flex items-center">
              <ClockIcon className="h-5 w-5 mr-2" />
              <span>{job.type === "emploi" ? "Emploi" : "Stage"}</span>
            </div>

            {job.type === "emploi" ? (
              <>
                <div><strong>Projet :</strong> {job.project}</div>
                <div><strong>Description :</strong> {job.description}</div>
                <div className="flex items-center">
                  <CurrencyEuroIcon className="h-5 w-5 mr-2" />
                  <span>{job.salary}</span>
                </div>
              </>
            ) : (
              <>
                <div><strong>Domaine :</strong> {job.domain}</div>
                <div><strong>Niveau :</strong> {job.level}</div>
                <div><strong>Description :</strong> {job.description}</div>
              </>
            )}

            <div className="flex items-center">
              <CalendarDaysIcon className="h-5 w-5 mr-2" />
              <span>Date limite : {job.deadline}</span>
            </div>
          </div>

          <button className="px-3 w-full mt-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            Postuler maintenant
          </button>
        </div>
      </div>
    ))}
  </div>
);
export default JobList;

