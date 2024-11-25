// Initial leave counts
const leaveCounts = {
    casual: 12,
    medical: 10,
    earned: 15,
    maternity: 30,
};

// Update available leave counts in UI
function updateLeaveCounts() {
    document.getElementById("casual-leave").textContent = leaveCounts.casual;
    document.getElementById("medical-leave").textContent = leaveCounts.medical;
    document.getElementById("earned-leave").textContent = leaveCounts.earned;
    document.getElementById("maternity-leave").textContent = leaveCounts.maternity;
}

// Add leave application to the list
function addAppliedLeave(leaveType, days, reason) {
    const appliedList = document.getElementById("applied-leaves-list");
    const listItem = document.createElement("li");
    listItem.innerHTML = `
        <strong>${leaveType} Leave</strong> - ${days} day(s)
        <p>Reason: ${reason}</p>
    `;
    appliedList.appendChild(listItem);
}

// Handle leave application
document.getElementById("apply-leave-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form submission

    const leaveType = document.getElementById("leave-type").value;
    const days = parseInt(document.getElementById("leave-days").value, 10);
    const reason = document.getElementById("leave-reason").value;

    if (leaveType && days > 0 && reason) {
        if (leaveCounts[leaveType] >= days) {
            leaveCounts[leaveType] -= days; // Deduct days
            updateLeaveCounts();
            addAppliedLeave(leaveType, days, reason);
            alert("Leave applied successfully!");
        } else {
            alert("Insufficient leave balance.");
        }
    } else {
        alert("Please fill all the fields correctly.");
    }
});

// Initialize page
updateLeaveCounts();
