import React, { useEffect, useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import JobList from '../components/JobList';
import JobForm from '../components/JobForm';
import EditModal from '../components/EditModal';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import Toast from '../components/Toast';
import { 
  BriefcaseIcon, 
  DocumentTextIcon, 
  PlusIcon 
} from '@heroicons/react/24/outline';
import { API_ENDPOINTS } from '../config/api';
import { Link } from 'react-router-dom';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [updatingJob, setUpdatingJob] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingJob, setDeletingJob] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    const userEmail = localStorage.getItem('user_email');
    const userName = localStorage.getItem('user_name');
    const userId = localStorage.getItem('user_id');
    
    if (userEmail && userName) {
      setUser({ email: userEmail, name: userName, user_id: userId });
    }
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  const hideToast = () => {
    setToast({ show: false, message: '', type: 'success' });
  };

  const fetchJobs = async () => {
    setLoadingJobs(true);
    setError(null);
    try {
      const userId = localStorage.getItem('user_id');
      
      if (!userId) {
        setError('User ID not found. Please log in again.');
        return;
      }
      
      const url = API_ENDPOINTS.getJobsWithUser(userId);
      
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (res.status === 401) {
        const errorData = await res.json();
        setError(`Authentication failed: ${errorData.message || errorData.error}`);
        return;
      }
      
      const data = await res.json();
      
      if (res.ok) {
        setJobs(data.jobs || data);
      } else {
        setError(data.error || 'Failed to fetch jobs');
      }
    } catch (err) {
      setError('Network error or authentication issue');
    } finally {
      setLoadingJobs(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleJobCreated = (newJob) => {
    setJobs(prev => [...prev, newJob]);
  };

  const handleJobUpdated = (updatedJob) => {
    setJobs(prev => prev.map(job => job._id === updatedJob._id ? updatedJob : job));
  };

  const handleJobDeleted = (jobId) => {
    setJobs(prev => prev.filter(job => job._id !== jobId));
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setEditModalOpen(true);
  };

  const handleUpdateJob = async (updatedData) => {
    setUpdatingJob(true);
    try {
      const userId = localStorage.getItem('user_id');
      const response = await fetch(`${API_ENDPOINTS.getJobById(editingJob._id)}?userId=${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        const updatedJob = await response.json();
        handleJobUpdated(updatedJob);
        showToast(`"${updatedData.title}" updated successfully!`);
        return true;
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to update job');
        showToast(errorData.error || 'Failed to update job', 'error');
        return false;
      }
    } catch (err) {
      setError('Network error while updating job');
      showToast('Network error while updating job', 'error');
      return false;
    } finally {
      setUpdatingJob(false);
    }
  };

  const handleDeleteJob = (jobId) => {
    const job = jobs.find(j => j._id === jobId);
    setJobToDelete({ id: jobId, title: job?.title || 'Unknown Job' });
    setDeleteModalOpen(true);
  };

  const confirmDeleteJob = async () => {
    setDeletingJob(true);
    try {
      const userId = localStorage.getItem('user_id');
      const response = await fetch(`${API_ENDPOINTS.getJobById(jobToDelete.id)}?userId=${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        handleJobDeleted(jobToDelete.id);
        showToast(`"${jobToDelete.title}" deleted successfully!`);
        closeDeleteModal();
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to delete job');
        showToast(errorData.error || 'Failed to delete job', 'error');
      }
    } catch (err) {
      setError('Network error while deleting job');
      showToast('Network error while deleting job', 'error');
    } finally {
      setDeletingJob(false);
    }
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditingJob(null);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setJobToDelete(null);
  };

  if (!user) {
    return <div className="flex justify-center items-center h-screen">Loading user information...</div>;
  }

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold mb-2 text-blue-900 drop-shadow">
          <BriefcaseIcon className="inline-block mr-3 h-10 w-10" />
          Your Jobs
        </h1>
        <p className="text-gray-700 mb-4 text-lg">Manage and track your job applications</p>
      </div>
      
      <div className="glass-card card-effect p-8 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-800">
            <DocumentTextIcon className="inline-block mr-2 h-6 w-6" />
            Job Applications ({jobs.length})
          </h2>
          <Link
            to="/jobs/new"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-[1.02]"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add New Job
          </Link>
        </div>

        {loadingJobs ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">Loading your jobs...</div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-red-800 mb-2">Error Loading Jobs</h3>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchJobs}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : (
          <JobList 
            jobs={jobs} 
            onEdit={handleEdit}
            onDelete={handleDeleteJob}
          />
        )}
      </div>

      {/* Modals */}
      {editModalOpen && (
        <EditModal
          job={editingJob}
          onClose={closeEditModal}
          onUpdate={handleUpdateJob}
          isUpdating={updatingJob}
        />
      )}

      {deleteModalOpen && (
        <DeleteConfirmationModal
          jobTitle={jobToDelete?.title}
          onConfirm={confirmDeleteJob}
          onCancel={closeDeleteModal}
          isDeleting={deletingJob}
        />
      )}

      {/* Toast */}
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}
    </DashboardLayout>
  );
}