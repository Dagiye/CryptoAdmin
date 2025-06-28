"use client"

import { useState } from "react"

const ManageBanners = () => {
  const [banners, setBanners] = useState([
    {
      id: 1,
      image: "https://i.ibb.co/Q8QwxFF/tumblr-o5a5r9-Z9-O71tvppquo1-r1-1280.gif",
      status: "active",
      name: "Banner 1",
    },
  ])

  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState("add") // "add" or "edit"
  const [editingBanner, setEditingBanner] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleAddBanner = () => {
    setModalType("add")
    setEditingBanner(null)
    setSelectedFile(null)
    setPreviewUrl("")
    setShowModal(true)
  }

  const handleEdit = (banner) => {
    setModalType("edit")
    setEditingBanner(banner)
    setSelectedFile(null)
    setPreviewUrl(banner.image)
    setShowModal(true)
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this banner?")) {
      setBanners(banners.filter((banner) => banner.id !== id))
    }
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      // Validate file type
      const validTypes = ["image/svg+xml", "image/png", "image/jpeg", "image/jpg", "image/gif"]
      if (!validTypes.includes(file.type)) {
        alert("Please select a valid image file (SVG, PNG, JPG, or GIF)")
        return
      }

      // Validate file size (assuming max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert("File size should be less than 2MB")
        return
      }

      setSelectedFile(file)

      // Create preview URL
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewUrl(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      if (modalType === "add") {
        const newBanner = {
          id: Date.now(),
          image: previewUrl || "/placeholder.svg?height=80&width=120",
          status: "active",
          name: `Banner ${banners.length + 1}`,
        }
        setBanners([...banners, newBanner])
      } else if (modalType === "edit" && editingBanner) {
        setBanners(
          banners.map((banner) =>
            banner.id === editingBanner.id ? { ...banner, image: previewUrl || banner.image } : banner,
          ),
        )
      }

      setIsLoading(false)
      setShowModal(false)
      setSelectedFile(null)
      setPreviewUrl("")
      setEditingBanner(null)
    }, 1000)
  }

  const handleCancel = () => {
    setShowModal(false)
    setSelectedFile(null)
    setPreviewUrl("")
    setEditingBanner(null)
  }

  const styles = {
    container: {
      padding: "20px 30px",
      backgroundColor: "#fdf2f8",
      minHeight: "100vh",
      fontFamily: "Arial, sans-serif",
    },
    header: {
      backgroundColor: "#e91e63",
      color: "white",
      padding: "15px 20px",
      borderRadius: "8px",
      marginBottom: "20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    headerTitle: {
      fontSize: "18px",
      fontWeight: "600",
      margin: 0,
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    addButton: {
      backgroundColor: "transparent",
      border: "2px solid white",
      color: "white",
      borderRadius: "50%",
      width: "35px",
      height: "35px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      fontSize: "18px",
      fontWeight: "bold",
      transition: "all 0.3s ease",
    },
    addButtonHover: {
      backgroundColor: "white",
      color: "#e91e63",
    },
    tableContainer: {
      backgroundColor: "white",
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    tableHeader: {
      backgroundColor: "#f8f9fa",
      borderBottom: "2px solid #e9ecef",
    },
    th: {
      padding: "15px 20px",
      textAlign: "left",
      fontWeight: "600",
      color: "#e91e63",
      fontSize: "14px",
      borderBottom: "1px solid #dee2e6",
    },
    td: {
      padding: "15px 20px",
      borderBottom: "1px solid #dee2e6",
      verticalAlign: "middle",
    },
    serialNumber: {
      fontWeight: "600",
      color: "#e91e63",
      fontSize: "16px",
    },
    bannerImage: {
      width: "120px",
      height: "80px",
      objectFit: "cover",
      borderRadius: "4px",
      border: "1px solid #dee2e6",
    },
    statusActive: {
      color: "#28a745",
      fontWeight: "500",
      fontSize: "14px",
    },
    statusInactive: {
      color: "#dc3545",
      fontWeight: "500",
      fontSize: "14px",
    },
    actionButtons: {
      display: "flex",
      gap: "8px",
    },
    editButton: {
      backgroundColor: "#ffc107",
      color: "white",
      border: "none",
      padding: "8px 16px",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "12px",
      fontWeight: "600",
      transition: "all 0.3s ease",
    },
    editButtonHover: {
      backgroundColor: "#e0a800",
    },
    deleteButton: {
      backgroundColor: "#dc3545",
      color: "white",
      border: "none",
      padding: "8px 16px",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "12px",
      fontWeight: "600",
      transition: "all 0.3s ease",
    },
    deleteButtonHover: {
      backgroundColor: "#c82333",
    },
    emptyState: {
      textAlign: "center",
      padding: "40px 20px",
      color: "#6c757d",
    },
    // Modal Styles
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    },
    modal: {
      backgroundColor: "white",
      borderRadius: "12px",
      padding: "30px",
      width: "90%",
      maxWidth: "500px",
      position: "relative",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
    },
    modalHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "25px",
    },
    modalTitle: {
      fontSize: "20px",
      fontWeight: "600",
      color: "#333",
      margin: 0,
    },
    closeButton: {
      background: "none",
      border: "none",
      fontSize: "24px",
      cursor: "pointer",
      color: "#999",
      padding: "0",
      width: "30px",
      height: "30px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    previewSection: {
      marginBottom: "20px",
    },
    previewLabel: {
      fontSize: "14px",
      color: "#666",
      marginBottom: "10px",
      display: "block",
    },
    previewContainer: {
      width: "100%",
      height: "200px",
      border: "2px dashed #ddd",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "15px",
      backgroundColor: "#f9f9f9",
    },
    previewImage: {
      maxWidth: "100%",
      maxHeight: "100%",
      borderRadius: "4px",
    },
    noPreview: {
      textAlign: "center",
      color: "#999",
    },
    noPreviewIcon: {
      fontSize: "48px",
      marginBottom: "10px",
      display: "block",
    },
    fileInput: {
      display: "none",
    },
    fileInputLabel: {
      display: "inline-block",
      padding: "10px 20px",
      backgroundColor: "#666",
      color: "white",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "14px",
      marginBottom: "10px",
    },
    fileInfo: {
      fontSize: "12px",
      color: "#666",
      marginBottom: "20px",
    },
    modalButtons: {
      display: "flex",
      gap: "10px",
      justifyContent: "flex-end",
    },
    submitButton: {
      backgroundColor: "#dc3545",
      color: "white",
      border: "none",
      padding: "12px 24px",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "600",
      transition: "all 0.3s ease",
    },
    submitButtonHover: {
      backgroundColor: "#c82333",
    },
    cancelButton: {
      backgroundColor: "#6c757d",
      color: "white",
      border: "none",
      padding: "12px 24px",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "600",
      transition: "all 0.3s ease",
    },
    cancelButtonHover: {
      backgroundColor: "#5a6268",
    },
    loadingSpinner: {
      display: "inline-block",
      width: "16px",
      height: "16px",
      border: "2px solid #ffffff",
      borderRadius: "50%",
      borderTopColor: "transparent",
      animation: "spin 1s ease-in-out infinite",
      marginRight: "8px",
    },
  }

  const [hoveredButton, setHoveredButton] = useState(null)
  const [hoveredAdd, setHoveredAdd] = useState(false)

  return (
    <>
      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>

      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.headerTitle}>
            <span>📢</span>
            Manage Banners
          </h1>
          <button
            style={{
              ...styles.addButton,
              ...(hoveredAdd ? styles.addButtonHover : {}),
            }}
            onMouseEnter={() => setHoveredAdd(true)}
            onMouseLeave={() => setHoveredAdd(false)}
            onClick={handleAddBanner}
          >
            +
          </button>
        </div>

        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead style={styles.tableHeader}>
              <tr>
                <th style={styles.th}>SL.</th>
                <th style={styles.th}>Image</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {banners.length > 0 ? (
                banners.map((banner, index) => (
                  <tr key={banner.id}>
                    <td style={styles.td}>
                      <span style={styles.serialNumber}>{index + 1}</span>
                    </td>
                    <td style={styles.td}>
                      <img
                        src={banner.image || "/placeholder.svg"}
                        alt={`Banner ${banner.id}`}
                        style={styles.bannerImage}
                      />
                    </td>
                    <td style={styles.td}>
                      <span style={banner.status === "active" ? styles.statusActive : styles.statusInactive}>
                        {banner.status}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <div style={styles.actionButtons}>
                        <button
                          style={{
                            ...styles.editButton,
                            ...(hoveredButton === `edit-${banner.id}` ? styles.editButtonHover : {}),
                          }}
                          onMouseEnter={() => setHoveredButton(`edit-${banner.id}`)}
                          onMouseLeave={() => setHoveredButton(null)}
                          onClick={() => handleEdit(banner)}
                        >
                          Edit
                        </button>
                        <button
                          style={{
                            ...styles.deleteButton,
                            ...(hoveredButton === `delete-${banner.id}` ? styles.deleteButtonHover : {}),
                          }}
                          onMouseEnter={() => setHoveredButton(`delete-${banner.id}`)}
                          onMouseLeave={() => setHoveredButton(null)}
                          onClick={() => handleDelete(banner.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={styles.emptyState}>
                    No banners found. Click the + button to add a new banner.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {showModal && (
          <div style={styles.modalOverlay} onClick={handleCancel}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
              <div style={styles.modalHeader}>
                <h2 style={styles.modalTitle}>{modalType === "add" ? "Add Banner" : "Update Banner"}</h2>
                <button style={styles.closeButton} onClick={handleCancel}>
                  ×
                </button>
              </div>

              <div style={styles.previewSection}>
                <label style={styles.previewLabel}>Image preview:</label>
                <div style={styles.previewContainer}>
                  {previewUrl ? (
                    <img src={previewUrl || "/placeholder.svg"} alt="Preview" style={styles.previewImage} />
                  ) : (
                    <div style={styles.noPreview}>
                      <span style={styles.noPreviewIcon}>📷</span>
                      <div>no preview available</div>
                    </div>
                  )}
                </div>

                <input
                  type="file"
                  id="fileInput"
                  style={styles.fileInput}
                  accept=".svg,.png,.jpg,.jpeg,.gif"
                  onChange={handleFileChange}
                />
                <label htmlFor="fileInput" style={styles.fileInputLabel}>
                  Choose File
                </label>
                <span style={{ marginLeft: "10px", color: "#666" }}>
                  {selectedFile ? selectedFile.name : "No file chosen"}
                </span>

                <div style={styles.fileInfo}>SVG, PNG, JPG or GIF (MAX. 700x300px)</div>
              </div>

              <div style={styles.modalButtons}>
                <button
                  style={{
                    ...styles.submitButton,
                    ...(hoveredButton === "submit" ? styles.submitButtonHover : {}),
                  }}
                  onMouseEnter={() => setHoveredButton("submit")}
                  onMouseLeave={() => setHoveredButton(null)}
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading && <span style={styles.loadingSpinner}></span>}
                  {isLoading ? "Processing..." : modalType === "add" ? "Add Banner" : "Update Banner"}
                </button>
                <button
                  style={{
                    ...styles.cancelButton,
                    ...(hoveredButton === "cancel" ? styles.cancelButtonHover : {}),
                  }}
                  onMouseEnter={() => setHoveredButton("cancel")}
                  onMouseLeave={() => setHoveredButton(null)}
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default ManageBanners
