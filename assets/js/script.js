document.addEventListener('DOMContentLoaded', function () {
    // Function to open the sidebar topic based on the URL hash
    function openSidebarTopicBasedOnHash() {
        const hash = window.location.hash;
        const topics = document.querySelectorAll('.sidebar-topic');

        topics.forEach(topic => {
            topic.classList.remove('active');
            const subitems = topic.nextElementSibling;
            if (subitems && subitems.classList.contains('sidebar-subitems')) {
                subitems.style.display = 'none';
                const toggle = topic.querySelector('.sidebar-topic-toggle');
                if (toggle) toggle.textContent = '→';
            }
        });

        if (hash) {
            const topic = document.querySelector(`.sidebar-topic[href="${hash}"]`);
            if (topic) {
                topic.classList.add('active');
                const subitems = topic.nextElementSibling;
                if (subitems && subitems.classList.contains('sidebar-subitems')) {
                    subitems.style.display = 'block';
                    const toggle = topic.querySelector('.sidebar-topic-toggle');
                    if (toggle) toggle.textContent = '↓';
                }
            }
        }
    }

    // Toggle sidebar sections
    document.querySelectorAll('.sidebar-topic').forEach(topic => {
        topic.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent the default anchor behavior
            const topics = document.querySelectorAll('.sidebar-topic');

            topics.forEach(t => {
                t.classList.remove('active');
                const subitems = t.nextElementSibling;
                if (subitems && subitems.classList.contains('sidebar-subitems')) {
                    subitems.style.display = 'none';
                    const toggle = t.querySelector('.sidebar-topic-toggle');
                    if (toggle) toggle.textContent = '→';
                }
            });

            this.classList.add('active');
            if (this.nextElementSibling && this.nextElementSibling.classList.contains('sidebar-subitems')) {
                const subitems = this.nextElementSibling;
                const toggle = this.querySelector('.sidebar-topic-toggle');

                subitems.style.display = 'block';
                if (toggle) toggle.textContent = '↓';
            }

            // Update the URL hash
            window.location.hash = this.getAttribute('href');

            // Close the mobile menu if it's open
            const sidebar = document.querySelector('.sidebar');
            if (sidebar && sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
            }
        });
    });

    // Mobile menu toggle functionality
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const sidebar = document.querySelector('.sidebar');

    if (mobileMenuButton && sidebar) {
        mobileMenuButton.addEventListener('click', function () {
            sidebar.classList.toggle('open');
        });

        document.addEventListener('click', function (event) {
            const isClickInsideSidebar = sidebar.contains(event.target);
            const isClickOnMenuButton = mobileMenuButton.contains(event.target);

            if (!isClickInsideSidebar && !isClickOnMenuButton && sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
            }
        });
    }

    openSidebarTopicBasedOnHash();
    window.addEventListener('hashchange', openSidebarTopicBasedOnHash);
});
