const STRAPI_URL = 'http://localhost:1337/api/blogs?populate=*&sort=publishedAt:desc&pagination[limit]=3';
const BASE_URL = 'http://localhost:1337'; 

async function loadBlogPosts() {
  const container = document.getElementById('blog-grid');
  container.classList.add('row'); 
  
  try {
    const response = await fetch(STRAPI_URL);
    const { data } = await response.json(); 
    
    data.forEach(post => {
    // Add this line to see the exact field names Strapi is using!
      console.log("My Strapi Post Data:", post);
      // 1. Strapi 5 flattened the response! We access fields directly now.
      const title = post.title;
      const slug = post.slug;
      
      const rawDate = post.publishedAt; 
      const formattedDate = new Date(rawDate).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      
      // 2. Images are also flattened, so we just ask for post.coverImage.url
      let imageUrl = 'assets/image/start-up2/blog-img.png'; 
      if (post.coverImage) {
        imageUrl = BASE_URL + post.coverImage.url;
      }

      // 3. Inject into your HTML
      const articleHTML = `
        <div class="col-lg-4 col-md-6 fade_anim" data-delay=".2">
            <div class="blog-card style-2">
                <div class="blog-image-wrap">
                    <a class="blog-img shape-hover-item" href="news-article-details.html?slug=${slug}">
                        <div class="shape-hover-img"
                            data-displacement="assets/image/start-up/hover-img-shape2.png"
                            data-intensity="0.6" data-speedin="1" data-speedout="1">
                            <img src="${imageUrl}" alt="${title}">
                        </div>
                    </a>
                    <div class="icon">
                        <a href="news-article-details.html?slug=${slug}">
                            <svg width="23" height="23" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.48587 4.91838C6.55342 5.54426 8.67525 6.53409 9.146 6.57738L14.3857 6.93811L5.60611 15.7944C5.2952 16.108 5.33757 16.6541 5.70074 17.0142C6.06392 17.3742 6.61038 17.4118 6.92129 17.0982L15.7009 8.24191L16.1072 13.4783C16.1442 13.9546 17.2876 16.0662 17.7642 16.0991C18.2408 16.1319 17.87 14.0734 17.8331 13.5971L17.2653 6.27854C17.2283 5.80227 16.812 5.38962 16.3354 5.35671L9.01219 4.85254C8.51447 4.8243 6.42959 4.34627 6.48587 4.91838Z" />
                            </svg>
                        </a>
                    </div>
                </div>
                <div class="blog-content">
                    <ul class="blog-meta">
                        <li><a href="#">Industry Insight</a></li>
                        <li>
                            <svg width="37" height="6" viewBox="0 0 37 6" xmlns="http://www.w3.org/2000/svg">
                                <path d="M32 3.38672L37 5.77347L37 -3.26633e-05L32 2.38672L32 3.38672ZM5 2.38672L2.18264e-07 -3.54609e-05L-2.18264e-07 5.77347L5 3.38672L5 2.38672ZM32.5 2.88672L32.5 2.38672L4.5 2.38672L4.5 2.88672L4.5 3.38672L32.5 3.38672L32.5 2.88672Z" />
                            </svg>
                        </li>
                        <li><a href="news-article-details.html?slug=${slug}">${formattedDate}</a></li>
                    </ul>
                    <h3><a href="news-article-details.html?slug=${slug}">${title}</a></h3>
                    <a href="news-article-details.html?slug=${slug}" class="view-details-btn">Read More
                        <svg class="arrow" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <g>
                                <path d="M6.36416 4.94946C6.37964 5.45612 8.04642 6.14424 8.42737 6.15312L12.6752 6.15311L4.95937 13.8689C4.68614 14.1421 4.68613 14.5851 4.95937 14.8584C5.23261 15.1316 5.67561 15.1316 5.94884 14.8584L13.6646 7.14259L13.6646 11.3904C13.6647 11.7767 14.4631 13.4347 14.8494 13.4347C15.2358 13.4347 15.0638 11.7767 15.0638 11.3904L15.0638 5.45351C15.0637 5.06717 14.7506 4.754 14.3642 4.75392L8.42738 4.75392C8.0235 4.75884 6.35447 4.48604 6.36416 4.94946Z"></path>
                            </g>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
      `;
      
      container.insertAdjacentHTML('beforeend', articleHTML);
    });

  } catch (error) {
    console.error("Failed to load posts from Strapi:", error);
  }
}

loadBlogPosts();