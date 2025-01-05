export async function addSarana(formData, token) {
  try {
    const response = await fetch('/api/v1.0.0/auth/sarana', {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return { success: false, message: 'Failed to create sarana' };
    }
    return { success: true, message: 'Sarana added successfully' };
  } catch (error) {
    console.error('Error creating article:', error);
  }
}

export async function updateSarana(formData, token, id) {
  try {
    const response = await fetch(`/api/v1.0.0/auth/sarana/${id}`, {
      method: 'PUT',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return { success: false, message: 'Failed to create article' };
    }
    return { success: true, message: 'Sarana added successfully' };
  } catch (error) {
    console.error('Error creating article:', error);
  }
}
