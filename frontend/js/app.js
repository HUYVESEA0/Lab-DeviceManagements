// App State
let currentDevices = [];
let currentCategories = [];
let currentRooms = [];
let currentUser = null;
let selectedRoomFilter = null;
let deviceModal, categoryModal;

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    deviceModal = new bootstrap.Modal(document.getElementById('deviceModal'));
    categoryModal = new bootstrap.Modal(document.getElementById('categoryModal'));
    
    // Check login status
    await checkLoginStatus();
    
    // Load data
    await loadRooms();
    await loadCategories();
    await loadDevices();
    setupEventListeners();
});

// Check Login Status
async function checkLoginStatus() {
    try {
        const user = await api.auth.me();
        currentUser = user;
        document.getElementById('currentUsername').textContent = user.full_name || user.username;
    } catch (error) {
        console.error('Not logged in:', error);
        // Redirect to login page
        window.location.href = 'login.html';
    }
}

// Handle Logout
async function handleLogout() {
    try {
        await api.auth.logout();
        window.location.href = 'login.html';
    } catch (error) {
        console.error('Logout error:', error);
        showAlert('Lỗi khi đăng xuất', 'danger');
    }
}

// Event Listeners
function setupEventListeners() {
    document.getElementById('searchDevice').addEventListener('input', loadDevices);
    document.getElementById('filterStatus').addEventListener('change', loadDevices);
    document.getElementById('filterCategory').addEventListener('change', loadDevices);
    document.getElementById('filterRoom').addEventListener('change', (e) => {
        selectedRoomFilter = e.target.value ? parseInt(e.target.value) : null;
        loadDevices();
    });
}

// Load Rooms
async function loadRooms() {
    try {
        const response = await api.rooms.list({ per_page: 100 });
        currentRooms = response.data;
        renderRooms();
        populateRoomSelect();
    } catch (error) {
        console.error('Error loading rooms:', error);
        showAlert('Lỗi khi tải danh sách phòng', 'danger');
    }
}

// Render Rooms
function renderRooms() {
    const container = document.getElementById('roomsGrid');
    
    if (currentRooms.length === 0) {
        container.innerHTML = '<p class="text-muted col-12 text-center py-4">Không có phòng nào</p>';
        return;
    }
    
    const statusLabelMap = {
        'available': 'Sẵn có',
        'in_use': 'Đang sử dụng',
        'maintenance': 'Bảo trì',
        'closed': 'Đóng cửa'
    };
    
    const html = currentRooms.map(room => `
        <div class="col-md-4 col-lg-3 col-xl-2 mb-3">
            <div class="room-card" onclick="selectRoomFilter(${room.id})">
                <div>
                    <div class="room-number">Phòng ${room.room_number}</div>
                    <div class="room-info">
                        <strong>${room.name}</strong><br>
                        <small>${room.location || 'N/A'}</small><br>
                        <small>Sức chứa: ${room.capacity || 'N/A'}</small>
                    </div>
                </div>
                <div class="room-status ${room.status}">
                    ${statusLabelMap[room.status]}
                </div>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = html;
}

// Select Room Filter
function selectRoomFilter(roomId) {
    const filterSelect = document.getElementById('filterRoom');
    selectedRoomFilter = selectedRoomFilter === roomId ? null : roomId;
    filterSelect.value = selectedRoomFilter || '';
    
    // Update room card visual states
    document.querySelectorAll('.room-card').forEach((card, index) => {
        if (currentRooms[index].id === selectedRoomFilter) {
            card.classList.add('selected');
        } else {
            card.classList.remove('selected');
        }
    });
    
    loadDevices();
}

// Populate Room Select
function populateRoomSelect() {
    const select = document.getElementById('filterRoom');
    const options = currentRooms.map(room => 
        `<option value="${room.id}">Phòng ${room.room_number} - ${room.name}</option>`
    ).join('');
    
    select.innerHTML = '<option value="">-- Tất cả phòng --</option>' + options;
}

// Load Devices
async function loadDevices() {
    try {
        const filters = {
            search: document.getElementById('searchDevice').value,
            status: document.getElementById('filterStatus').value,
            category_id: document.getElementById('filterCategory').value || undefined,
            room_id: selectedRoomFilter || undefined
        };
        
        const response = await api.devices.list(filters);
        currentDevices = response.data;
        renderDevices();
    } catch (error) {
        console.error('Error loading devices:', error);
        showAlert('Lỗi khi tải danh sách thiết bị', 'danger');
    }
}

// Render Devices
function renderDevices() {
    const container = document.getElementById('devicesList');
    
    if (currentDevices.length === 0) {
        container.innerHTML = '<p class="text-muted text-center py-4">Không có thiết bị nào</p>';
        return;
    }
    
    const statusLabelMap = {
        'available': 'Sẵn có',
        'in_use': 'Đang sử dụng',
        'maintenance': 'Bảo trì',
        'broken': 'Hỏng'
    };
    
    const html = currentDevices.map(device => {
        let roomInfo = '';
        if (device.room_id && device.room && device.room.room_number) {
            roomInfo = `<span class="device-room-badge">📍 Phòng ${device.room.room_number}</span>`;
        }
        
        return `
            <div class="device-card">
                <div class="device-header">
                    <div>
                        <div class="device-name">${device.name}</div>
                        <small class="text-muted">Serial: ${device.serial_number}</small>
                    </div>
                    <span class="device-status ${device.status}">
                        ${statusLabelMap[device.status]}
                    </span>
                </div>
                <div class="device-details">
                    <div class="device-detail-item">
                        <span class="device-detail-label">Danh mục:</span> ${device.category}
                    </div>
                    <div class="device-detail-item">
                        <span class="device-detail-label">Số lượng:</span> ${device.quantity}
                    </div>
                    <div class="device-detail-item">
                        <span class="device-detail-label">Model:</span> ${device.model || 'N/A'}
                    </div>
                    <div class="device-detail-item">
                        <span class="device-detail-label">Vị trí:</span> ${device.location || 'N/A'}
                    </div>
                </div>
                ${roomInfo}
                ${device.description ? `<p class="text-muted small mb-2">${device.description}</p>` : ''}
                <div class="text-end">
                    <button class="btn btn-sm btn-primary" onclick="editDevice(${device.id})">
                        <i class="fas fa-edit"></i> Sửa
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteDevice(${device.id})">
                        <i class="fas fa-trash"></i> Xóa
                    </button>
                </div>
            </div>
        `;
    }).join('');
    
    container.innerHTML = html;
}

// Show Add Device Modal
function showAddDeviceModal() {
    document.getElementById('deviceId').value = '';
    document.getElementById('deviceForm').reset();
    document.getElementById('deviceModalTitle').textContent = 'Thêm Thiết Bị Mới';
    deviceModal.show();
}

// Edit Device
async function editDevice(id) {
    try {
        const device = await api.devices.get(id);
        document.getElementById('deviceId').value = device.id;
        document.getElementById('deviceName').value = device.name;
        document.getElementById('deviceSerial').value = device.serial_number;
        document.getElementById('deviceCategory').value = device.category_id;
        document.getElementById('deviceModel').value = device.model || '';
        document.getElementById('deviceQuantity').value = device.quantity;
        document.getElementById('deviceStatus').value = device.status;
        document.getElementById('deviceLocation').value = device.location || '';
        document.getElementById('devicePurchaseDate').value = device.purchase_date || '';
        document.getElementById('deviceDescription').value = device.description || '';
        document.getElementById('deviceModalTitle').textContent = 'Chỉnh Sửa Thiết Bị';
        deviceModal.show();
    } catch (error) {
        console.error('Error loading device:', error);
        showAlert('Lỗi khi tải thiết bị', 'danger');
    }
}

// Save Device
async function saveDevice() {
    try {
        const deviceId = document.getElementById('deviceId').value;
        const data = {
            name: document.getElementById('deviceName').value,
            serial_number: document.getElementById('deviceSerial').value,
            category_id: parseInt(document.getElementById('deviceCategory').value),
            model: document.getElementById('deviceModel').value,
            quantity: parseInt(document.getElementById('deviceQuantity').value),
            status: document.getElementById('deviceStatus').value,
            location: document.getElementById('deviceLocation').value,
            purchase_date: document.getElementById('devicePurchaseDate').value,
            description: document.getElementById('deviceDescription').value
        };
        
        if (deviceId) {
            await api.devices.update(deviceId, data);
            showAlert('Cập nhật thiết bị thành công', 'success');
        } else {
            await api.devices.create(data);
            showAlert('Thêm thiết bị thành công', 'success');
        }
        
        deviceModal.hide();
        loadDevices();
    } catch (error) {
        console.error('Error saving device:', error);
        showAlert('Lỗi khi lưu thiết bị', 'danger');
    }
}

// Delete Device
async function deleteDevice(id) {
    if (!confirm('Bạn có chắc chắn muốn xóa thiết bị này?')) return;
    
    try {
        await api.devices.delete(id);
        showAlert('Xóa thiết bị thành công', 'success');
        loadDevices();
    } catch (error) {
        console.error('Error deleting device:', error);
        showAlert('Lỗi khi xóa thiết bị', 'danger');
    }
}

// Load Categories
async function loadCategories() {
    try {
        const response = await api.categories.list({ per_page: 100 });
        currentCategories = response.data;
        renderCategories();
        populateCategorySelect();
    } catch (error) {
        console.error('Error loading categories:', error);
        showAlert('Lỗi khi tải danh mục', 'danger');
    }
}

// Render Categories
function renderCategories() {
    const container = document.getElementById('categoriesList');
    
    if (currentCategories.length === 0) {
        container.innerHTML = '<p class="text-muted text-center py-4">Không có danh mục nào</p>';
        return;
    }
    
    const html = currentCategories.map(category => `
        <div class="card mb-2">
            <div class="card-body">
                <div class="row align-items-center">
                    <div class="col">
                        <h6 class="mb-0">${category.name}</h6>
                        ${category.description ? `<small class="text-muted">${category.description}</small>` : ''}
                    </div>
                    <div class="col-auto">
                        <button class="btn btn-sm btn-primary" onclick="editCategory(${category.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="deleteCategory(${category.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = html;
}

// Populate Category Select
function populateCategorySelect() {
    const select = document.getElementById('deviceCategory');
    const filterSelect = document.getElementById('filterCategory');
    const options = currentCategories.map(cat => 
        `<option value="${cat.id}">${cat.name}</option>`
    ).join('');
    
    select.innerHTML = '<option value="">-- Chọn danh mục --</option>' + options;
    filterSelect.innerHTML = '<option value="">-- Tất cả danh mục --</option>' + options;
}

// Show Add Category Modal
function showAddCategoryModal() {
    document.getElementById('categoryId').value = '';
    document.getElementById('categoryForm').reset();
    document.getElementById('categoryModalTitle').textContent = 'Thêm Danh Mục Mới';
    categoryModal.show();
}

// Edit Category
async function editCategory(id) {
    try {
        const category = await api.categories.get(id);
        document.getElementById('categoryId').value = category.id;
        document.getElementById('categoryName').value = category.name;
        document.getElementById('categoryDescription').value = category.description || '';
        document.getElementById('categoryModalTitle').textContent = 'Chỉnh Sửa Danh Mục';
        categoryModal.show();
    } catch (error) {
        console.error('Error loading category:', error);
        showAlert('Lỗi khi tải danh mục', 'danger');
    }
}

// Save Category
async function saveCategory() {
    try {
        const categoryId = document.getElementById('categoryId').value;
        const data = {
            name: document.getElementById('categoryName').value,
            description: document.getElementById('categoryDescription').value
        };
        
        if (categoryId) {
            await api.categories.update(categoryId, data);
            showAlert('Cập nhật danh mục thành công', 'success');
        } else {
            await api.categories.create(data);
            showAlert('Thêm danh mục thành công', 'success');
        }
        
        categoryModal.hide();
        loadCategories();
    } catch (error) {
        console.error('Error saving category:', error);
        showAlert('Lỗi khi lưu danh mục', 'danger');
    }
}

// Delete Category
async function deleteCategory(id) {
    if (!confirm('Bạn có chắc chắn muốn xóa danh mục này?')) return;
    
    try {
        await api.categories.delete(id);
        showAlert('Xóa danh mục thành công', 'success');
        loadCategories();
    } catch (error) {
        console.error('Error deleting category:', error);
        showAlert('Lỗi khi xóa danh mục', 'danger');
    }
}

// Show Alert
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    const container = document.querySelector('.container-fluid');
    container.insertBefore(alertDiv, container.firstChild);
    
    setTimeout(() => alertDiv.remove(), 5000);
}
