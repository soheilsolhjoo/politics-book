(function() {
    // Immediate execution to prevent flash of wrong font size
    const savedSize = localStorage.getItem("customFontSize");
    if (savedSize) {
        document.documentElement.style.setProperty('--base-font-size', savedSize + 'px');
    }

    function initFontControl() {
        const btnDecrease = document.getElementById("font-decrease");
        const btnReset = document.getElementById("font-reset");
        const btnIncrease = document.getElementById("font-increase");

        if (!btnDecrease || !btnReset || !btnIncrease) return;

        let currentSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--base-font-size')) || 21;
        const minSize = 16;
        const maxSize = 34;
        const step = 2;

        function applyFontSize(size) {
            document.documentElement.style.setProperty('--base-font-size', size + 'px');
            localStorage.setItem("customFontSize", size);
            currentSize = size;
        }

        btnDecrease.onclick = function() {
            if (currentSize > minSize) applyFontSize(currentSize - step);
        };

        btnIncrease.onclick = function() {
            if (currentSize < maxSize) applyFontSize(currentSize + step);
        };

        btnReset.onclick = function() {
            applyFontSize(21);
            localStorage.removeItem("customFontSize");
        };
    }

    // Run on page load
    document.addEventListener("DOMContentLoaded", initFontControl);

    // Support Material's instant loading (pjax)
    if (typeof subscribe$ !== 'undefined') {
        subscribe$.subscribe(function() {
            initFontControl();
        });
    }
})();
