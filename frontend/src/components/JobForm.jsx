import React, { useState } from 'react';
import { 
  BriefcaseIcon, 
  BuildingOfficeIcon, 
  LinkIcon, 
  DocumentTextIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

const JobForm = ({ onSubmit, loading, onSuccess }) => {
  const [form, setForm] = useState({
    title: '',
    company: '',
    status: 'Applied',
    jobUrl: '',
    notes: ''
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      title: '',
      company: '',
      status: 'Applied',
      jobUrl: '',
      notes: ''
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const success = await onSubmit(form);
    if (success) {
      resetForm();
      if (onSuccess) onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center mb-6">
        <BriefcaseIcon className="h-6 w-6 text-blue-600 mr-3" />
        <h2 className="text-2xl font-bold text-blue-800">Job Details</h2>
      </div>
      
      <div className="relative">
        <BriefcaseIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Job Title"
          className="border border-gray-300 p-3 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-base w-full"
          required
        />
      </div>
      
      <div className="relative">
        <BuildingOfficeIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <input
          name="company"
          value={form.company}
          onChange={handleChange}
          placeholder="Company"
          className="border border-gray-300 p-3 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-base w-full"
          required
        />
      </div>
      
      <div className="relative">
        <LinkIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <input
          name="jobUrl"
          value={form.jobUrl}
          onChange={handleChange}
          placeholder="Job URL (optional)"
          type="url"
          className="border border-gray-300 p-3 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-base w-full"
        />
      </div>
      
      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-base w-full"
      >
        <option value="Applied">Applied</option>
        <option value="Interview Scheduled">Interview Scheduled</option>
        <option value="Interviewed">Interviewed</option>
        <option value="Offer Received">Offer Received</option>
        <option value="Rejected">Rejected</option>
        <option value="Archived">Archived</option>
      </select>
      
      <div className="relative">
        <DocumentTextIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Notes (optional)"
          rows="4"
          className="border border-gray-300 p-3 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-base resize-none w-full"
        />
      </div>
      
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold text-base shadow-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center"
        disabled={loading}
      >
        <PlusIcon className="h-5 w-5 mr-2" />
        {loading ? 'Adding...' : 'Add Job'}
      </button>
    </form>
  );
};

export default JobForm; 