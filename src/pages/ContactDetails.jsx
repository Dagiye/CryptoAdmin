import React, { useState } from "react";

const ContactDetailsSetup = () => {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "Telegram",
      link: "https://t.me/details_setup",
      status: "active",
    },
    {
      id: 2,
      name: "Telegram Group",
      link: "#",
      status: "active",
    },
    {
      id: 3,
      name: "Whatsapp",
      link: "https://wa.me/12067567423",
      status: "active",
    },
  ]);

  const [editingContact, setEditingContact] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    link: "",
    status: "active"
  });

  const handleEdit = (contact) => {
    setEditingContact(contact);
    setFormData({
      name: contact.name,
      link: contact.link,
      status: contact.status
    });
  };

  const handleDelete = (contactId) => {
    setShowDeleteConfirm(contactId);
  };

  const confirmDelete = () => {
    setContacts(contacts.filter(contact => contact.id !== showDeleteConfirm));
    setShowDeleteConfirm(null);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.link.trim()) {
      alert("Please fill in all fields");
      return;
    }

    if (editingContact) {
      // Update existing contact
      setContacts(contacts.map(contact => 
        contact.id === editingContact.id 
          ? { ...contact, ...formData }
          : contact
      ));
      setEditingContact(null);
    } else {
      // Add new contact
      const newContact = {
        id: Date.now(),
        ...formData
      };
      setContacts([...contacts, newContact]);
      setShowAddForm(false);
    }

    setFormData({ name: "", link: "", status: "active" });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const handleCancel = () => {
    setEditingContact(null);
    setShowAddForm(false);
    setFormData({ name: "", link: "", status: "active" });
  };

  return (
    <div className="settings-section" style={styles.container}>
      <div className="page-header">
        <h1 className="page-title" style={styles.title}>Contact Details Setup</h1>
        <p className="page-subtitle" style={styles.subtitle}>Manage your contact information</p>
      </div>

      <div style={styles.header}>
        <h2 style={styles.headerTitle}>
          📞 Manage Contact Details
        </h2>
        <button 
          style={styles.addButton}
          onClick={() => setShowAddForm(true)}
        >
          +
        </button>
      </div>

      {/* Add/Edit Form */}
      {(showAddForm || editingContact) && (
        <div style={styles.formOverlay}>
          <div style={styles.formCard}>
            <h3 style={styles.formTitle}>
              {editingContact ? "Edit Contact" : "Add New Contact"}
            </h3>
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  style={styles.input}
                  placeholder="Enter contact name"
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Link</label>
                <input
                  type="url"
                  value={formData.link}
                  onChange={(e) => setFormData({...formData, link: e.target.value})}
                  style={styles.input}
                  placeholder="Enter contact link"
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  style={styles.select}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div style={styles.formButtons}>
                <button type="submit" style={styles.saveButton}>
                  {editingContact ? "Update" : "Add"} Contact
                </button>
                <button 
                  type="button" 
                  onClick={handleCancel}
                  style={styles.cancelButton}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3 style={styles.modalTitle}>⚠️ Confirm Delete</h3>
            <p style={styles.modalText}>
              Are you sure you want to delete this contact? This action cannot be undone.
            </p>
            <div style={styles.modalButtons}>
              <button 
                onClick={confirmDelete}
                style={styles.confirmDeleteButton}
              >
                Yes, Delete
              </button>
              <button 
                onClick={() => setShowDeleteConfirm(null)}
                style={styles.cancelButton}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>SL.</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Link</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, index) => (
            <tr key={contact.id} style={styles.tr}>
              <td style={styles.td}>{index + 1}</td>
              <td style={styles.td}>{contact.name}</td>
              <td style={styles.td}>
                <a href={contact.link} style={styles.link} target="_blank" rel="noreferrer">
                  {contact.link}
                </a>
              </td>
              <td style={styles.td}>
                <span style={{
                  ...styles.status,
                  backgroundColor: contact.status === "active" ? "#10b981" : "#6b7280"
                }}>
                  {contact.status}
                </span>
              </td>
              <td style={styles.td}>
                <button 
                  onClick={() => handleEdit(contact)}
                  style={styles.editBtn}
                >
                  ✏️ Edit
                </button>
                <button 
                  onClick={() => handleDelete(contact.id)}
                  style={styles.deleteBtn}
                >
                  🗑️ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Success Message */}
      {success && (
        <div style={styles.successMessage}>
          ✅ {editingContact ? "Contact updated successfully!" : "Contact added successfully!"}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    fontFamily: "'Segoe UI', sans-serif",
  },
  title: {
    color: "#d80d43",
    marginBottom: "5px",
  },
  subtitle: {
    color: "#888",
    marginBottom: "20px",
    fontWeight: 500,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  headerTitle: {
    margin: 0,
    fontWeight: 700,
    color: "#d80d43",
  },
  addButton: {
    backgroundColor: "#d80d43",
    color: "#fff",
    fontSize: "20px",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#fff",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  th: {
    textAlign: "left",
    padding: "14px 16px",
    borderBottom: "1px solid #f2cbd5",
    color: "#d80d43",
    backgroundColor: "#fff0f4",
    fontWeight: 600,
  },
  tr: {
    borderBottom: "1px solid #f5d5dd",
    transition: "background-color 0.2s ease",
  },
  td: {
    padding: "14px 16px",
    fontSize: "15px",
  },
  link: {
    color: "#d80d43",
    textDecoration: "none",
    wordBreak: "break-all",
  },
  status: {
    padding: "4px 8px",
    borderRadius: "4px",
    color: "white",
    fontSize: "12px",
    fontWeight: 500,
  },
  editBtn: {
    backgroundColor: "#f59e0b",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "8px 12px",
    marginRight: "8px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.3s ease",
  },
  deleteBtn: {
    backgroundColor: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "8px 12px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.3s ease",
  },
  formOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  formCard: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "24px",
    width: "90%",
    maxWidth: "500px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
  },
  formTitle: {
    margin: "0 0 20px 0",
    color: "#d80d43",
    fontSize: "18px",
    fontWeight: 600,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "6px",
    fontWeight: 600,
    color: "#d80d43",
    fontSize: "14px",
  },
  input: {
    padding: "10px 12px",
    border: "2px solid #e53e3e",
    borderRadius: "6px",
    fontSize: "14px",
    transition: "border-color 0.3s ease",
  },
  select: {
    padding: "10px 12px",
    border: "2px solid #e53e3e",
    borderRadius: "6px",
    fontSize: "14px",
    backgroundColor: "white",
  },
  formButtons: {
    display: "flex",
    gap: "12px",
    marginTop: "8px",
  },
  saveButton: {
    backgroundColor: "#d80d43",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: 600,
    flex: 1,
  },
  cancelButton: {
    backgroundColor: "#6b7280",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: 600,
    flex: 1,
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "24px",
    width: "90%",
    maxWidth: "400px",
    textAlign: "center",
    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
  },
  modalTitle: {
    margin: "0 0 16px 0",
    color: "#d80d43",
    fontSize: "18px",
    fontWeight: 600,
  },
  modalText: {
    margin: "0 0 20px 0",
    color: "#666",
    lineHeight: "1.5",
  },
  modalButtons: {
    display: "flex",
    gap: "12px",
  },
  confirmDeleteButton: {
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: 600,
    flex: 1,
  },
  successMessage: {
    marginTop: "20px",
    padding: "12px 16px",
    backgroundColor: "#10b981",
    color: "white",
    borderRadius: "6px",
    textAlign: "center",
    fontWeight: 600,
  },
};

export default ContactDetailsSetup;
