import React, { useState, useEffect } from 'react';

const EditModal = ({ job, onClose, onUpdate, isUpdating }) => {
  const [form, setForm] = useState({
    title: '',
    company: '',
    status: 'Applied',
    jobUrl: '',
    notes: ''
  });

  useEffect(() => {
    if (job) {
      setForm({
        title: job.title || '',
        company: job.company || '',
        status: job.status || 'Applied',
        jobUrl: job.jobUrl || '',
        notes: job.notes || ''
      });
    }
  }, [job]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const success = await onUpdate(form);
    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="glass-card card-effect p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-800">Edit Job</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold transition-colors"
          >
            ×
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Job Title"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-base w-full"
            required
          />
          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Company"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-base w-full"
            required
          />
          <input
            name="jobUrl"
            value={form.jobUrl}
            onChange={handleChange}
            placeholder="Job URL (optional)"
            type="url"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-base w-full"
          />
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
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Notes (optional)"
            rows="4"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-base resize-none w-full"
          />
          
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold text-base hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold text-base shadow-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-[1.02]"
              disabled={isUpdating}
            >
              {isUpdating ? 'Updating...' : 'Update Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal; 