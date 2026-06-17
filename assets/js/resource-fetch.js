// 1. Point this directly to your live production Render URL
const BASE_URL = 'https://strapi-qm8b.onrender.com'; 

async function loadResources() {
  // Make sure your wrapper container on the HTML page has this exact ID: id="resource-grid"
  const container = document.getElementById('resource-grid');
  
  if (!container) return; 
  
  container.classList.add('row'); 
  
  // 2. Fetch data from your safe 'resources' collection type
  let fetchUrl = `${BASE_URL}/api/resources?populate=*&sort=publishedAt:desc`;
  
  const limit = container.getAttribute('data-limit');
  if (limit) {
    fetchUrl += `&pagination[limit]=${limit}`;
  }

  try {
    const response = await fetch(fetchUrl);
    const { data } = await response.json(); 

    data.forEach(item => {
      const title = item.title;
      const category = item.category || 'Industry Insight';
      
      // Parse and format the publication date
      const rawDate = item.publishedAt; 
      const formattedDate = new Date(rawDate).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      
      // Handle Cover Image fallback logic safely
      let imageUrl = 'assets/image/start-up2/JSE-Document.png'; 
      if (item.coverImage && item.coverImage.url) {
        if (item.coverImage.url.startsWith('/')) {
          imageUrl = BASE_URL + item.coverImage.url;
        } else {
          imageUrl = item.coverImage.url;
        }
      }

      // Handle actual downloadable file asset resolution securely
      let fileUrl = '#'; 
      if (item.file && item.file.url) {
        if (item.file.url.startsWith('/')) {
          fileUrl = BASE_URL + item.file.url;
        } else {
          fileUrl = item.file.url;
        }
      }

      // 3. Inject variables cleanly into your original HTML mockup
      const resourceHTML = `
        <div class="col-lg-4 col-md-6 fade_anim" data-delay=".2">
            <div class="blog-card style-2">
                <div class="blog-image-wrap">
                    <a class="blog-img shape-hover-item" href="${fileUrl}" download>
                        <div class="shape-hover-img" data-displacement="assets/image/start-up/hover-img-shape2.png" data-intensity="0.6" data-speedin="1" data-speedout="1">
                            <img src="${imageUrl}" alt="${title}">
                        </div>
                    </a>
                    <div class="icon">
                        <a href="${fileUrl}" download>
                            <svg width="23" height="23" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.48587 4.91838C6.55342 5.54426 8.67525 6.53409 9.146 6.57738L14.3857 6.93811L5.60611 15.7944C5.2952 16.108 5.33757 16.6541 5.70074 17.0142C6.06392 17.3742 6.61038 17.4118 6.92129 17.0982L15.7009 8.24191L16.1072 13.4783C16.1442 13.9546 17.2876 16.0662 17.7642 16.0991C18.2408 16.1319 17.87 14.0734 17.8331 13.5971L17.2653 6.27854C17.2283 5.80227 16.812 5.38962 16.3354 5.35671L9.01219 4.85254C8.51447 4.8243 6.42959 4.34627 6.48587 4.91838Z"></path>
                            </svg>
                        </a>
                    </div>
                </div>
                <div class="blog-content">
                    <ul class="blog-meta">
                        <li><a href="#">${formattedDate}</a></li>
                        <li>
                            <svg width="37" height="6" viewBox="0 0 37 6" xmlns="http://www.w3.org/2000/svg">
                                <path d="M32 3.38672L37 5.77347L37 -3.26633e-05L32 2.38672L32 3.38672ZM5 2.38672L2.18264e-07 -3.54609e-05L-2.18264e-07 5.77347L5 3.38672L5 2.38672ZM32.5 2.88672L32.5 2.38672L4.5 2.38672L4.5 2.88672L4.5 3.38672L32.5 3.38672L32.5 2.88672Z"></path>
                            </svg>
                        </li>
                        
                    </ul>
                    <h3><a href="${fileUrl}" download>${title}</a></h3>
                    <a class="primary-btn2 transparent" href="${fileUrl}" download>
                        <span class="icon">
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 9L9 1M9 1C7.22222 1.33333 3.33333 2 1 1M9 1C8.66667 2.66667 8 6.33333 9 9" stroke-width="1.5" stroke-linecap="round"></path>
                            </svg>
                        </span>
                        <span class="content">Download</span>
                        <span class="icon two">
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 9L9 1M9 1C7.22222 1.33333 3.33333 2 1 1M9 1C8.66667 2.66667 8 6.33333 9 9" stroke-width="1.5" stroke-linecap="round"></path>
                            </svg>
                        </span>
                    </a>
                </div>
            </div>
        </div>
      `;
      
      container.insertAdjacentHTML('beforeend', resourceHTML);
    });

  } catch (error) {
    console.error("Failed to load documents from Strapi:", error);
  }
}

loadResources();