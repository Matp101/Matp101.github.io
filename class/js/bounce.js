document.addEventListener("DOMContentLoaded", function() {
    const scrollForMore = document.querySelector(".for-more");

    function updateScrollForMoreVisibility() {
        const scrollPosition = window.scrollY;

        if (scrollPosition > 0) {
            scrollForMore.style.display = "none";
        } else {
            scrollForMore.style.display = "block";
        }
    }

    window.addEventListener("scroll", updateScrollForMoreVisibility);
    updateScrollForMoreVisibility();
});