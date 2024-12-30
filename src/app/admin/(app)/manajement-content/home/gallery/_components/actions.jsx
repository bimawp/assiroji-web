export async function addGallery(formData, token) {
  try {
    const response = await fetch('/api/v1.0.0/auth/page/home/gallery', {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return { success: false, message: 'Failed to create article' };
    }
    return { success: true, message: 'Gallery added successfully' };
  } catch (error) {
    console.error('Error creating article:', error);
  }
}

export async function updateGallery(formData, token, id) {
  try {
    const response = await fetch(`/api/v1.0.0/auth/page/home/gallery/${id}`, {
      method: 'PUT',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return { success: false, message: 'Failed to create article' };
    }
    return { success: true, message: 'Gallery added successfully' };
  } catch (error) {
    console.error('Error creating article:', error);
  }
}
