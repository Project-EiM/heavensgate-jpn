document.addEventListener('DOMContentLoaded', function() {
    const introLink = document.querySelector('a[href="/"]'); // Updated selector
    const scheduleLink = document.querySelector('a[href="#schedule"]');
    const introPopupOverlay = document.getElementById('introduction-popup');
    const schedulePopupOverlay = document.getElementById('schedule-popup');
    const closeButtons = document.querySelectorAll('.popup-overlay .close-button');

    // Ensure popups are hidden on load
    if (introPopupOverlay) {
        introPopupOverlay.style.display = 'none';
    }
    if (schedulePopupOverlay) {
        schedulePopupOverlay.style.display = 'none';
    }

    // Function to show the introduction popup
    function showIntroPopup() {
        if (introPopupOverlay) {
            introPopupOverlay.style.display = 'flex';
            introPopupOverlay.classList.add('active'); // Show the popup
        }
    }

    // Check for query parameter on page load
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('showIntroPopup') === 'true') {
        showIntroPopup();
    }

    // Event listener for the Introduction link
    if (introLink) { // No need to check introPopupOverlay here, as it's checked in showIntroPopup
        introLink.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default anchor behavior

            // Navigate to homepage with query parameter
            window.location.href = '/?showIntroPopup=true';
        });
    }

    if (scheduleLink && schedulePopupOverlay) {
        scheduleLink.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default anchor behavior
            schedulePopupOverlay.style.display = 'flex';
            schedulePopupOverlay.classList.add('active'); // Show the popup
            // Add a class to trigger the slide-in animation
            setTimeout(() => {
                schedulePopupOverlay.querySelector('.popup-content').style.transform = 'translateX(0%)';
            }, 500);
        });
    }

    // New section for Member Details Popups
    const memberImageBoxes = document.querySelectorAll('.image-box');
    const memberDetailsPopupOverlay = document.getElementById('member-details-popup');
    const memberPopupName = document.getElementById('member-popup-name');
    const memberPopupDescriptionEn = document.getElementById('member-popup-description-en');
    const memberPopupDescriptionJp = document.getElementById('member-popup-description-jp');

    // Function to fetch member data from embedded JSON
    function fetchMemberData(memberId) {
        const memberDataScript = document.getElementById('member-data');
        if (memberDataScript) {
            const allMembersData = JSON.parse(JSON.parse(memberDataScript.textContent)); // Parse twice
            return allMembersData.find(member => member.id === memberId);
        }
        return null;
    }


    if (memberImageBoxes.length > 0 && memberDetailsPopupOverlay) {
        memberImageBoxes.forEach(box => {
            box.addEventListener('click', async function() {
                const memberId = this.dataset.memberId; // Get member ID from data attribute
                const memberData = await fetchMemberData(memberId); // Fetch member data

                if (memberData) {
                    memberPopupName.textContent = memberData.name;
                    memberPopupDescriptionEn.textContent = memberData.description_en;
                    memberPopupDescriptionJp.textContent = memberData.description_jp;

                    memberDetailsPopupOverlay.style.display = 'flex';
                    memberDetailsPopupOverlay.classList.add('active');
                }
            });
        });
    }

    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const parentPopup = this.closest('.popup-overlay');
            if (parentPopup) {
                if (parentPopup.classList.contains('right-slide')) {
                    // For right-slide popup, animate out before hiding
                    parentPopup.querySelector('.popup-content').style.transform = 'translateX(100%)';
                    setTimeout(() => {
                        parentPopup.classList.remove('active');
                        parentPopup.style.display = 'none';
                    }, 500); // Match CSS transition duration
                } else {
                    parentPopup.classList.remove('active'); // Hide immediately for other popups
                    parentPopup.style.display = 'none';
                }
            }
        });
    });

    document.querySelectorAll('.popup-overlay').forEach(overlay => {
        overlay.addEventListener('click', function(event) {
            if (event.target === overlay) {
                if (overlay.classList.contains('right-slide')) {
                    overlay.querySelector('.popup-content').style.transform = 'translateX(100%)';
                    setTimeout(() => {
                        overlay.classList.remove('active');
                        overlay.style.display = 'none';
                    }, 500);
                } else {
                    overlay.classList.remove('active');
                    overlay.style.display = 'none';
                }
            }
        });
    });
});