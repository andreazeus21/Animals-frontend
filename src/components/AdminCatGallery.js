import React, { useState, useEffect } from 'react';

const AdminCatGallery = () => {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ _id: null, name: '', origin: '', temperament: '', colors: '', description: '', image: '' });
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const fetchCats = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/cats');
      const data = await response.json();
      setCats(data);
    } catch (error) {
      console.error('Failed to fetch cats:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCats();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editMode ? `http://localhost:3000/cats/${form._id}` : 'http://localhost:3000/cats';
    const method = editMode ? 'PATCH' : 'POST';
    const colorsArray = form.colors.split(',').map(color => color.trim());

    const catData = { ...form, colors: colorsArray };
    if (!editMode) delete catData.id;  // Ensure id is not sent for new cats

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(catData)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      fetchCats();
      setForm({ id: null, name: '', origin: '', temperament: '', colors: '', description: '', image: '' });
      setEditMode(false);
      setShowForm(false);
    } catch (error) {
      console.error('Failed to submit form:', error);
      setError(error.message);
    }
  };

  const handleEdit = (cat) => {
    setForm({ ...cat, colors: cat.colors.join(', ') });
    setEditMode(true);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    console.log(`Attempting to delete cat with id: ${id}`);
    if (!id) {
      console.error('No ID provided for delete operation');
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/cats/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log(`Delete response:`, response);
      fetchCats();
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error('Failed to delete cat:', error);
      setError(error.message);
    }
  };

  const openDeleteConfirm = (id) => {
    console.log(`Open delete confirmation for id: ${id}`);
    setDeleteId(id ? id.toString() : '');
    setShowDeleteConfirm(true);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="admin-page">
      <h2 className="admin-title">Admin Page</h2>
      <p className="admin-subtitle">Want to create a new cat?</p>
      <button className='create-button' onClick={() => { setForm({ name: '', origin: '', temperament: '', colors: '', description: '', image: '' }); setEditMode(false); setShowForm(true); }}>Create Cat</button>

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowForm(false)}>&times;</span>
            <h2>{editMode ? 'Edit Cat' : 'Create Cat'}</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
              <input type="text" name="origin" placeholder="Origin" value={form.origin} onChange={handleChange} required />
              <input type="text" name="temperament" placeholder="Temperament" value={form.temperament} onChange={handleChange} required />
              <input type="text" name="colors" placeholder="Colors (comma separated)" value={form.colors} onChange={handleChange} required />
              <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required></textarea>
              <input type="url" name="image" placeholder="Image URL" value={form.image} onChange={handleChange} required />
              <button type="submit">{editMode ? 'Update Cat' : 'Create Cat'}</button>
            </form>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowDeleteConfirm(false)}>&times;</span>
            <h4>Are you sure you want to delete this cat?</h4>
            <button onClick={() => handleDelete(deleteId)}>Yes</button>
            <button onClick={() => setShowDeleteConfirm(false)}>No</button>
          </div>
        </div>
      )}

      <h2>All Cats</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Origin</th>
            <th>Temperament</th>
            <th>Colors</th>
            <th>Description</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cats.map((cat) => (
            <tr key={cat._id}>
              <td>{cat.name}</td>
              <td>{cat.origin}</td>
              <td>{cat.temperament}</td>
              <td>{cat.colors.join(', ')}</td>
              <td>{cat.description}</td>
              <td><img src={cat.image} alt={cat.name} style={{ width: '50px', height: '50px' }} /></td>
              <td>
                <button className="edit" onClick={() => handleEdit(cat)}>Edit</button>
                <button className="delete" onClick={() => openDeleteConfirm(cat._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCatGallery;
