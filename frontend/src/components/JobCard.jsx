import React from 'react';
import { 
  PencilIcon, 
  TrashIcon, 
  LinkIcon, 
  DocumentTextIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

const statusColors = {
  'Applied': 'border-blue-500',
  'Interview Scheduled': 'border-yellow-500',
  'Interviewed': 'border-orange-500',
  'Offer Received': 'border-green-500',
  'Rejected': 'border-red-500',
  'Archived': 'border-gray-500',
};

const statusBgColors = {
  'Applied': 'bg-blue-100 text-blue-700',
  'Interview Scheduled': 'bg-yellow-100 text-yellow-700',
  'Interviewed': 'bg-orange-100 text-orange-700',
  'Offer Received': 'bg-green-100 text-green-700',
  'Rejected': 'bg-red-100 text-red-700',
  'Archived': 'bg-gray-100 text-gray-700',
};

const JobCard = ({ job, onEdit, onDelete }) => {
  const borderColor = statusColors[job.status] || 'border-gray-300';
  const statusBgColor = statusBgColors[job.status] || 'bg-gray-100 text-gray-700';
  
  return (
    <div className={`bg-white shadow-lg rounded-lg p-4 sm:p-5 flex flex-col gap-3 border-l-8 ${borderColor} transition-transform hover:scale-[1.02] hover:shadow-xl duration-200`}> 
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 break-words">{job.title}</h2>
        <span className={`text-xs px-2 sm:px-3 py-1 rounded-full font-semibold whitespace-nowrap ${statusBgColor} self-start sm:self-auto`}>
          {job.status}
        </span>
      </div>
      <div className="text-sm sm:text-base text-gray-600 font-medium">{job.company}</div>
      
      {job.jobUrl && (
        <div className="text-xs sm:text-sm">
          <a 
            href={job.jobUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline break-all block flex items-start gap-1"
          >
            <LinkIcon className="h-3 w-3 sm:h-4 sm:w-4 mt-0.5 flex-shrink-0" />
            <span>View Job Posting →</span>
          </a>
        </div>
      )}
      
      {job.notes && (
        <div className="text-xs sm:text-sm text-gray-600 bg-gray-50 p-2 sm:p-3 rounded-lg">
          <div className="font-medium text-gray-700 mb-1 flex items-start gap-1">
            <DocumentTextIcon className="h-3 w-3 sm:h-4 sm:w-4 mt-0.5 flex-shrink-0" />
            <span>Notes:</span>
          </div>
          <div className="text-gray-600 break-words">{job.notes}</div>
        </div>
      )}
      
      <div className="text-gray-400 text-xs mt-auto flex items-center">
        <CalendarIcon className="h-3 w-3 mr-1" />
        Applied: {new Date(job.createdAt).toLocaleDateString()}
      </div>
      
      <div className="flex gap-2 mt-2">
        <button
          onClick={() => onEdit(job)}
          className="flex-1 bg-blue-50 text-blue-600 py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg text-xs sm:text-sm font-medium hover:bg-blue-100 transition-colors border border-blue-200 flex items-center justify-center gap-1"
        >
          <PencilIcon className="h-3 w-3 sm:h-4 sm:w-4" />
          <span>Edit</span>
        </button>
        <button
          onClick={() => onDelete(job._id)}
          className="flex-1 bg-red-50 text-red-600 py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg text-xs sm:text-sm font-medium hover:bg-red-100 transition-colors border border-red-200 flex items-center justify-center gap-1"
        >
          <TrashIcon className="h-3 w-3 sm:h-4 sm:w-4" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};

export default JobCard; 