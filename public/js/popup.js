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
            console.log("Member data script content:", memberDataScript.textContent);
            try {
                const allMembersData = JSON.parse(JSON.parse(memberDataScript.textContent));
                console.log("Parsed member data:", allMembersData);
                if (Array.isArray(allMembersData)) {
                    return allMembersData.find(member => member.id === memberId);
                } else {
                    console.error("Parsed member data is not an array.");
                    return null;
                }
            } catch (e) {
                console.error("Error parsing member data:", e);
                return null;
            }
        }
        console.error("Could not find member-data script tag.");
        return null;
    }


    if (memberImageBoxes.length > 0 && memberDetailsPopupOverlay) {
        memberImageBoxes.forEach(box => {
            box.addEventListener('click', async function() {
                const memberId = this.dataset.memberId; // Get member ID from data attribute
                console.log("Clicked on member box with id:", memberId);
                const memberData = await fetchMemberData(memberId); // Fetch member data
                console.log("Fetched member data:", memberData);


                if (memberData) {
                    memberPopupName.textContent = memberData.name;
                    memberPopupDescriptionEn.textContent = memberData.description_en;
                    memberPopupDescriptionJp.textContent = memberData.description_jp;

                    memberDetailsPopupOverlay.style.display = 'flex';
                    memberDetailsPopupOverlay.classList.add('active');
                    console.log("Showing member details popup for member:", memberId);
                } else {
                    console.error("Could not find member data for id:", memberId);
                }
            });
        });
    }

    // New section for Past Events Popups
    const pastEventBoxes = document.querySelectorAll('.past-event-box');
    const pastEventPopupOverlay = document.getElementById('past-event-popup');
    const pastEventPopupContent = document.getElementById('past-event-popup-content');

    // Function to fetch past event data from embedded JSON
    function fetchPastEventData(eventId) {
        const pastEventDataScript = document.getElementById('past-event-data');
        if (pastEventDataScript) {
            try {
                const allPastEventsData = JSON.parse(JSON.parse(pastEventDataScript.textContent));
                if (Array.isArray(allPastEventsData)) {
                    return allPastEventsData.find(event => event.id === eventId);
                }
            } catch (e) {
                console.error("Error parsing past event data:", e);
            }
        }
        return null;
    }

    if (pastEventBoxes.length > 0 && pastEventPopupOverlay) {
        pastEventBoxes.forEach(box => {
            box.addEventListener('click', async function() {
                const eventId = this.dataset.eventId;
                const eventData = await fetchPastEventData(eventId);

                if (eventData) {
                    pastEventPopupContent.innerHTML = `
                        <h2>${eventData.title}</h2>
                        <p class="en">${eventData.event_description_en}</p>
                        <p class="jp">${eventData.event_description_jp}</p>
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?list=${eventData.youtube_playlist_id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    `;
                    pastEventPopupOverlay.style.display = 'flex';
                    pastEventPopupOverlay.classList.add('active');
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