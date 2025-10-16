// App State
let currentDevices = [];
let currentCategories = [];
let deviceModal, categoryModal;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    deviceModal = new bootstrap.Modal(document.getElementById('deviceModal'));
    categoryModal = new bootstrap.Modal(document.getElementById('categoryModal'));
    
    loadCategories();
    loadDevices();
    setupEventListeners();
});

// Event Listeners
function setupEventListeners() {
    document.getElementById('searchDevice').addEventListener('input', loadDevices);
    document.getElementById('filterStatus').addEventListener('change', loadDevices);
    document.getElementById('filterCategory').addEventListener('change', loadDevices);
}

// Load Devices
async function loadDevices() {
    try {
        const filters = {
            search: document.getElementById('searchDevice').value,
            status: document.getElementById('filterStatus').value,
            category_id: document.getElementById('filterCategory').value || undefined
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
    
    const statusBadgeMap = {
        'available': 'success',
        'in_use': 'info',
        'maintenance': 'warning',
        'broken': 'danger'
    };
    
    const statusLabelMap = {
        'available': 'Sẵn có',
        'in_use': 'Đang sử dụng',
        'maintenance': 'Bảo trì',
        'broken': 'Hỏng'
    };
    
    const html = currentDevices.map(device => `
        <div class="card mb-2">
            <div class="card-body">
                <div class="row align-items-center">
                    <div class="col-md-6">
                        <h6 class="mb-0">${device.name}</h6>
                        <small class="text-muted">Serial: ${device.serial_number}</small>
                        <br>
                        <small class="text-muted">Danh mục: ${device.category}</small>
                    </div>
                    <div class="col-md-2">
                        <span class="badge bg-${statusBadgeMap[device.status]}">
                            ${statusLabelMap[device.status]}
                        </span>
                    </div>
                    <div class="col-md-2">
                        <small class="text-muted">SL: ${device.quantity}</small>
                        ${device.location ? `<br><small class="text-muted">Vị trí: ${device.location}</small>` : ''}
                    </div>
                    <div class="col-md-2 text-end">
                        <button class="btn btn-sm btn-primary" onclick="editDevice(${device.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="deleteDevice(${device.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
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
