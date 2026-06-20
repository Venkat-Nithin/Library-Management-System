document.addEventListener('DOMContentLoaded', () => {
    const refreshBtn = document.getElementById('refresh-btn');
    const apiKeyInput = document.getElementById('api-key-input');
    const tableBody = document.getElementById('table-body');
    const totalOutstandingEl = document.getElementById('total-outstanding');
    const totalOverdueEl = document.getElementById('total-overdue');
    const booksTableBody = document.getElementById('books-table-body');

    const fetchOutstandingBooks = async () => {
        const apiKey = apiKeyInput.value.trim();
        
        if (!apiKey) {
            showError('Please enter an API Key');
            return;
        }

        tableBody.innerHTML = `<tr><td colspan="6" class="text-center loading-state">Fetching data...</td></tr>`;

        try {
            // Wait a moment for visual effect (simulate network if very fast local)
            const response = await fetch('/dashboard/outstanding-books', {
                method: 'GET',
                headers: {
                    'x-api-key': apiKey,
                    'Content-Type': 'application/json'
                }
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Failed to fetch data');
            }

            renderTable(result.data);

        } catch (error) {
            showError(error.message);
        }
    };

    const renderTable = (data) => {
        if (!data || data.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="6" class="text-center">No outstanding books found.</td></tr>`;
            totalOutstandingEl.textContent = '0';
            totalOverdueEl.textContent = '0';
            return;
        }

        let overdueCount = 0;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const rows = data.map(item => {
            const issuedDate = new Date(item.issuance_date).toLocaleDateString();
            const targetDateObj = new Date(item.target_return_date);
            const targetDate = targetDateObj.toLocaleDateString();
            
            const isOverdue = targetDateObj < today;
            if (isOverdue) overdueCount++;

            const statusClass = isOverdue ? 'overdue' : 'pending';
            const statusText = isOverdue ? 'Overdue' : 'Pending';

            return `
                <tr>
                    <td><strong>${item.member_name}</strong></td>
                    <td>${item.book_name}</td>
                    <td>${item.book_author || '-'}</td>
                    <td>${issuedDate}</td>
                    <td>${targetDate}</td>
                    <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                </tr>
            `;
        });

        tableBody.innerHTML = rows.join('');
        totalOutstandingEl.textContent = data.length.toString();
        totalOverdueEl.textContent = overdueCount.toString();
    };

    const showError = (message) => {
        tableBody.innerHTML = `<tr><td colspan="6" class="text-center error-state">Error: ${message}</td></tr>`;
        totalOutstandingEl.textContent = '-';
        totalOverdueEl.textContent = '-';
    };

    const fetchAllBooks = async () => {
        const apiKey = apiKeyInput.value.trim();
        
        if (!apiKey) {
            return;
        }

        booksTableBody.innerHTML = `<tr><td colspan="7" class="text-center loading-state">Fetching data...</td></tr>`;

        try {
            const response = await fetch('/books', {
                method: 'GET',
                headers: {
                    'x-api-key': apiKey,
                    'Content-Type': 'application/json'
                }
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Failed to fetch books');
            }

            renderBooksTable(result.data);

        } catch (error) {
            booksTableBody.innerHTML = `<tr><td colspan="7" class="text-center error-state">Error: ${error.message}</td></tr>`;
        }
    };

    const renderBooksTable = (data) => {
        if (!data || data.length === 0) {
            booksTableBody.innerHTML = `<tr><td colspan="7" class="text-center">No books found.</td></tr>`;
            return;
        }

        const rows = data.map(item => {
            const launchDate = item.book_launch_date ? new Date(item.book_launch_date).toLocaleDateString() : '-';
            
            return `
                <tr>
                    <td>${item.book_id}</td>
                    <td><strong>${item.book_name}</strong></td>
                    <td>${item.book_cat_id}</td>
                    <td>${item.book_collection_id}</td>
                    <td>${launchDate}</td>
                    <td>${item.book_publisher || '-'}</td>
                    <td>${item.book_author || '-'}</td>
                </tr>
            `;
        });

        booksTableBody.innerHTML = rows.join('');
    };

    const refreshAll = () => {
        fetchOutstandingBooks();
        fetchAllBooks();
    };

    refreshBtn.addEventListener('click', refreshAll);

    // Initial fetch
    refreshAll();
});
