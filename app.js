document.addEventListener('DOMContentLoaded', () => {
  
  /* ==========================================================================
     SCROLL EFFECTS (HEADER GLASSMORPHISM)
     ========================================================================== */
  const header = document.getElementById('main-header');
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Call once on load in case page was refreshed halfway down

  /* ==========================================================================
     MOBILE HAMBURGER MENU TOGGLE
     ========================================================================== */
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-item');

  const toggleMenu = () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('overflow-hidden');
  };

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', toggleMenu);
  }

  // Close menu when a navigation link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu && navMenu.classList.contains('active')) {
        toggleMenu();
      }
    });
  });

  /* ==========================================================================
     TYPEWRITER EFFECT IN HERO SECTION
     ========================================================================== */
  const typewriter = document.getElementById('typewriter');
  const words = [
    "Backend Systems.",
    "Software Development Engineering.",
    "Scalable API Architectures.",
    "Modular Python & Java Services.",
    "Optimized SQL Performance."
  ];
  
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  const typeEffect = () => {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      // Deleting characters
      typewriter.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // Delete faster
    } else {
      // Typing characters
      typewriter.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    // Handlers for word transitions
    if (!isDeleting && charIndex === currentWord.length) {
      // Pause at full word
      typingSpeed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      // Advance to next word
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 500; // Brief pause before typing next word
    }

    setTimeout(typeEffect, typingSpeed);
  };

  if (typewriter) {
    typeEffect();
  }

  /* ==========================================================================
     ACTIVE NAVIGATION LINK HIGHLIGHTING ON SCROLL
     ========================================================================== */
  const sections = document.querySelectorAll('section');
  
  const navObserverOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px', // Trigger when section occupies the main screen area
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, navObserverOptions);

  sections.forEach(section => {
    navObserver.observe(section);
  });

  /* ==========================================================================
     PROJECTS FILTERING SYSTEM
     ========================================================================== */
  const filterButtons = document.querySelectorAll('.project-filters .filter-btn');
  const projectCards = document.querySelectorAll('.projects-grid .project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Switch active class
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        
        if (filterValue === 'all' || categories.includes(filterValue)) {
          // Fade in transition
          card.classList.remove('hide');
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          }, 50);
        } else {
          // Hide
          card.classList.add('hide');
        }
      });
    });
  });

  /* ==========================================================================
     CONTACT FORM HANDLING & SUBMISSION FEEDBACK
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const formSubmitBtn = document.getElementById('form-submit-btn');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();
      
      if (!name || !email || !subject || !message) {
        showStatus('Please fill in all the fields.', 'error');
        return;
      }

      // Show loading feedback
      formSubmitBtn.disabled = true;
      const originalBtnText = formSubmitBtn.innerHTML;
      formSubmitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
      
      // Simulate form submission
      setTimeout(() => {
        // Construct mailto link
        const mailtoLink = `mailto:rahul.rrk2307@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Hi Rahul,\n\n${message}\n\nFrom,\n${name} (${email})`)}`;
        
        // Open the email client window
        window.location.href = mailtoLink;

        showStatus('Message prepared in your email client! Thank you.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // Restore button state
        formSubmitBtn.disabled = false;
        formSubmitBtn.innerHTML = originalBtnText;
      }, 1200);
    });
  }

  const showStatus = (msg, type) => {
    formStatus.textContent = msg;
    formStatus.className = 'form-status-msg ' + type;
    
    // Clear message after 5 seconds
    setTimeout(() => {
      formStatus.textContent = '';
      formStatus.className = 'form-status-msg';
    }, 5000);
  };
});

/* ==========================================================================
   CUSTOM CURSOR INTERPOLATION (LERP)
   ========================================================================== */
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');

let mouseX = 0;
let mouseY = 0;
let ringX = 0;
let ringY = 0;
let cursorVisible = false;

// Track cursor coordinates
window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    if (!cursorVisible) {
        cursorDot.style.opacity = '1';
        cursorRing.style.opacity = '1';
        cursorVisible = true;
    }
});

// Hide cursor when leaving window
document.addEventListener('mouseleave', () => {
    cursorDot.style.opacity = '0';
    cursorRing.style.opacity = '0';
    cursorVisible = false;
});

// Smooth cursor animation using linear interpolation (lerp)
function updateCursor() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
    
    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;
    
    requestAnimationFrame(updateCursor);
}
requestAnimationFrame(updateCursor);

// Add hover effect states for interactive targets
const registerHoverTargets = () => {
    const targets = document.querySelectorAll('.hover-target');
    targets.forEach(target => {
        target.removeEventListener('mouseenter', addCursorActive);
        target.removeEventListener('mouseleave', removeCursorActive);
        
        target.addEventListener('mouseenter', addCursorActive);
        target.addEventListener('mouseleave', removeCursorActive);
    });
};

function addCursorActive() {
    cursorRing.classList.add('active');
}

function removeCursorActive() {
    cursorRing.classList.remove('active');
}

// Initial hover target setup
registerHoverTargets();

/* ==========================================================================
   DYNAMIC GITHUB API REPOSITORIES FETCHING
   ========================================================================== */
const githubUsername = 'DevilRK23';
const githubReposGrid = document.getElementById('github-repos-grid');

const langColors = {
    python: '#3572A5',
    java: '#b07219',
    javascript: '#f1e05a',
    html: '#e34c26',
    css: '#563d7c',
    jupyter: '#DA5B0B',
    default: '#8b8b8b'
};

const escapeHTML = (str) => {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
};

const fetchGitHubRepos = async () => {
    if (!githubReposGrid) return;
    try {
        const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=15`);
        if (!response.ok) throw new Error('Failed to query GitHub repositories.');
        
        const repos = await response.json();
        
        // Filter out Assignments123 / Assigments123, Portfolio, and Wells Fargo tasks (case-insensitive)
        const filteredRepos = repos.filter(repo => {
            const nameLower = repo.name.toLowerCase();
            const isAssignment = nameLower === 'assignments123' || nameLower === 'assigments123';
            const isPortfolio = nameLower.includes('portfolio') || nameLower === 'rk_port';
            const isWellsFargo = nameLower.includes('wells-fargo') || nameLower.includes('wellsfargo') || nameLower.includes('wells_fargo');
            return !isAssignment && !isPortfolio && !isWellsFargo;
        });

        if (filteredRepos.length === 0) {
            githubReposGrid.innerHTML = `
                <div class="loading-state">
                    <span>No public repositories found.</span>
                </div>
            `;
            return;
        }

        githubReposGrid.innerHTML = ''; // Clear loading spinner

        const customRepoDescriptions = {
            'AI_Operations_copilot': 'GenAI incident copilot utilizing a RAG pipeline and ChromaDB semantic searches to ingest logs, detect anomalies and suggest root-cause resolution workflows.',
            'AI_Network_Defence_System': 'High-performance packet validator utilizing Isolation Forest anomaly scoring to scan network traffic, trigger rate-limiting and block suspicious endpoint vectors.',
            'Tumor_Detection': 'Diagnostic backend system mapping predictive machine learning output (96% accuracy) to REST APIs, sending high-speed structured JSON payloads for medical visualizations.',
            'financial-advisory-system': 'Robust database querying microservice managing complex database transactions with multi-table joins. Wrote optimized multi-table JOINs in raw SQL to maximize execution speed.',
            'Employee_Performance_and_Retention_analysis': 'Data-driven analysis utilizing Python libraries to dissect factors contributing to employee retention, training needs and overall workspace productivity levels.',
            'Neural_Network': 'A pure Python implementation of deep neural layers from scratch to solve vanishing gradient issues by replacing Sigmoid with ReLU and implementing Xavier initialization.'
        };

        filteredRepos.forEach(repo => {
            const lang = repo.language ? repo.language : 'Repository';
            const langLower = lang.toLowerCase();
            const color = langColors[langLower] || langColors.default;
            
            // Use custom description if available, fallback to GitHub description
            const rawDesc = repo.description || '';
            const description = customRepoDescriptions[repo.name] || rawDesc || 'No description provided. Click below to inspect code.';
            
            const card = document.createElement('a');
            card.href = repo.html_url;
            card.target = '_blank';
            card.rel = 'noopener';
            card.className = 'repo-card hover-target';
            card.innerHTML = `
                <div class="repo-top">
                    <svg class="repo-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                    <div class="repo-stars">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        <span>${repo.stargazers_count}</span>
                    </div>
                </div>
                <div>
                    <h4 class="repo-title">${escapeHTML(repo.name)}</h4>
                    <p class="repo-desc">${escapeHTML(description)}</p>
                </div>
                <div class="repo-bottom">
                    <div class="repo-lang">
                        <span class="lang-color" style="background-color: ${color}"></span>
                        <span>${lang}</span>
                    </div>
                    <span>Update: ${new Date(repo.updated_at).toLocaleDateString(undefined, {month: 'short', year: 'numeric'})}</span>
                </div>
            `;
            
            githubReposGrid.appendChild(card);
        });

        // Register hover listeners on the dynamically loaded items
        registerHoverTargets();
        
    } catch (error) {
        console.error('GitHub API error:', error);
        // Fallback: leave the pre-rendered static HTML backup cards in place
    }
};

// Robust Load initialization using readystate check to ensure DOMContentLoaded triggers reliably
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fetchGitHubRepos);
} else {
    fetchGitHubRepos();
}
