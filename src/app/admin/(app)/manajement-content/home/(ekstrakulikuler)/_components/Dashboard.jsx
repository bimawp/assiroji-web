'use client';
import React, { useState } from 'react';
import { ArrowUpDown, Eye, Plus, RefreshCw } from 'lucide-react';
import ActivityCard from './ActivityCard';
import AddEditActivityModal from './AddEditActivityModal';
import PreviewModal from './PreviewModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import { useSession } from 'next-auth/react';
export default function Dashboard({ activities, setActivities, onRefresh }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [currentActivity, setCurrentActivity] = useState(null);
  const [sortBy, setSortBy] = useState('name');
  const [filterActive, setFilterActive] = useState('all');
  const [hasChanges, setHasChanges] = useState(false);
  const { data: session } = useSession();
  const handleAddActivity = (newActivity) => {
    setActivities([...activities, { ...newActivity, id: Date.now() }]);
    setHasChanges(true);
  };

  const handleEditActivity = (updatedActivity) => {
    setActivities(
      activities.map((activity) =>
        activity.id === updatedActivity.id ? updatedActivity : activity
      )
    );
    setHasChanges(true);
  };

  const handleDeleteActivity = async (id) => {
    setIsLoadingDelete(true);
    try {
      await fetch(`/api/v1.0.0/auth/page/home/ekstrakulikuler/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${session.user.access_token}`,
        },
      });
    } catch (error) {
      console.error('Error deleting item:', error);
    } finally {
      setIsLoadingDelete(true);
      onRefresh();
      setHasChanges(true);
    }
  };

  const handleSort = () => {
    const newSortBy = sortBy === 'name' ? 'date' : 'name';
    setSortBy(newSortBy);
    setActivities(
      [...activities].sort((a, b) =>
        newSortBy === 'name' ? a.name.localeCompare(b.name) : b.id - a.id
      )
    );
    setHasChanges(true);
  };

  const filteredActivities = activities.filter(
    (activity) => filterActive === 'all' || activity.isActive === (filterActive === 'active')
  );

  return (
    <div className="p-3">
      <div className="flex w-full justify-between items-center pb-4">
        <h1 className="text-xl font-semibold mb-4">Ekstrakulikuler</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Plus className="inline-block mr-2 h-4 w-4" />
            Add Activity
          </button>
          {/* <button
            onClick={handleSort}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            <ArrowUpDown className="inline-block mr-2 h-4 w-4" />
            Sort by {sortBy === 'name' ? 'Date' : 'Name'}
          </button>
          <select
            onChange={(e) => {
              setFilterActive(e.target.value);
              setHasChanges(true);
            }}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            <option value="all">All Activities</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive Only</option>
          </select> */}
        </div>
      </div>
      <div className="grid mt-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredActivities.map((activity) => (
          <ActivityCard
            key={activity['id_ekstrakurikuler']}
            activity={activity}
            onEdit={() => {
              setCurrentActivity(activity);
              setIsEditModalOpen(true);
            }}
            onDelete={() => {
              setCurrentActivity(activity);
              setIsDeleteModalOpen(true);
            }}
            onToggleActive={() => {
              handleEditActivity({ ...activity, isActive: !activity.isActive });
            }}
          />
        ))}
      </div>
      <div className="flex justify-between mt-8">
        <button
          onClick={() => setIsPreviewModalOpen(true)}
          className="px-6 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors inline-flex items-center"
        >
          <Eye className="w-4 h-4 mr-2" />
          Preview Landing Page
        </button>
        {/* <button
          onClick={() => {
            // Di sini Anda akan menambahkan logika untuk menyimpan perubahan ke backend
            setHasChanges(false);
            alert('Changes saved to landing page!');
          }}
          className={`px-6 py-2  text-white rounded-lg  transition-colors inline-flex items-center ${
            hasChanges
              ? 'bg-gray-900 hover:bg-gray-800 focus:ring-blue-500'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
          disabled={!hasChanges}
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          save changes
        </button> */}
      </div>
      <AddEditActivityModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddActivity}
        onRefresh={onRefresh}
      />
      <AddEditActivityModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleEditActivity}
        activity={currentActivity}
        onRefresh={onRefresh}
      />
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          console.log('asdasdf', currentActivity['id_ekstrakurikuler']);
          handleDeleteActivity(currentActivity['id_ekstrakurikuler']);
          setIsDeleteModalOpen(false);
        }}
        activityName={currentActivity?.name}
        isLoading={isLoadingDelete}
      />
      <PreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        activities={activities}
      />
    </div>
  );
}
