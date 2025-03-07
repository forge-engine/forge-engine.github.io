document.addEventListener('DOMContentLoaded', function() {
    // Toggle sidebar sections
    document.querySelectorAll('.sidebar-topic').forEach(topic => {
        topic.addEventListener('click', function(e) {
            if (this.nextElementSibling && this.nextElementSibling.classList.contains('sidebar-subitems')) {
                const subitems = this.nextElementSibling;
                const toggle = this.querySelector('.sidebar-topic-toggle');
                
                if (subitems.style.display === 'none') {
                    subitems.style.display = 'block';
                    if (toggle) toggle.textContent = '↓';
                } else {
                    if (!this.getAttribute('href').startsWith('#')) {
                        return;
                    }
                    subitems.style.display = 'none';
                    if (toggle) toggle.textContent = '→';
                }
            }
        });
    });
    
    // Mobile menu toggle functionality
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const sidebar = document.querySelector('.sidebar');
    
    if (mobileMenuButton && sidebar) {
        mobileMenuButton.addEventListener('click', function() {
            sidebar.classList.toggle('open');
        });
        
        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', function(event) {
            const isClickInsideSidebar = sidebar.contains(event.target);
            const isClickOnMenuButton = mobileMenuButton.contains(event.target);
            
            if (!isClickInsideSidebar && !isClickOnMenuButton && sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
            }
        });
    }
});