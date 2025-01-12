export async function addActivity(formData, token) {
  try {
    const response = await fetch('/api/v1.0.0/auth/page/home/ekstrakulikuler', {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return { success: false, message: 'Failed to create article' };
    }
    return { success: true, message: 'Activity added successfully' };
  } catch (error) {
    console.error('Error creating article:', error);
  }
}

export async function updateActivity(formData, token, id) {
  try {
    const response = await fetch(`/api/v1.0.0/auth/page/home/ekstrakulikuler/${id}`, {
      method: 'PUT',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return { success: false, message: 'Failed to create article' };
    }
    return { success: true, message: 'Activity added successfully' };
  } catch (error) {
    console.error('Error creating article:', error);
  }
}
