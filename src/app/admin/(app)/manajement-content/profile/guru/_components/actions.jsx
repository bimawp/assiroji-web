export async function addGuru(formData, token) {
  try {
    console.log(formData);
    const response = await fetch('/api/v1.0.0/auth/guru', {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return { success: false, message: 'Failed to create article' };
    }
    return { success: true, message: 'Guru added successfully' };
  } catch (error) {
    console.error('Error creating article:', error);
  }
}

export async function updateGuru(formData, token, id) {
  try {
    const response = await fetch(`/api/v1.0.0/auth/guru/${id}`, {
      method: 'PUT',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return { success: false, message: 'Failed to create article' };
    }
    return { success: true, message: 'Guru added successfully' };
  } catch (error) {
    console.error('Error creating article:', error);
  }
}
