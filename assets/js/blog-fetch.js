const BASE_URL = 'https://strapi-qm8b.onrender.com'; // Replace with your live Render URL

async function loadBlogPosts() {
  const container = document.getElementById('blog-grid');
  
  // Safety check: If there is no blog grid on the current page, stop running the script
  if (!container) return; 
  
  container.classList.add('row'); 
  
  // 1. Start with the base URL (Populate images and sort by newest)
  let fetchUrl = `${BASE_URL}/api/blogs?populate=*&sort=publishedAt:desc`;
  
  // 2. Check the HTML for a data-limit attribute
  const limit = container.getAttribute('data-limit');
  
  // 3. If a limit exists (like on the homepage), attach it to the URL
  if (limit) {
    fetchUrl += `&pagination[limit]=${limit}`;
  }

  try {
    // 4. Use our dynamically generated URL!
    const response = await fetch(fetchUrl);
    const { data } = await response.json(); 
    
    data.forEach(post => {
      const title = post.title;
      const slug = post.slug;
      
      const rawDate = post.publishedAt; 
      const formattedDate = new Date(rawDate).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      
      let imageUrl = 'assets/image/start-up2/blog-img.png'; 
      
      // Production-safe image check for Strapi v5 media structures
      if (post.coverImage && post.coverImage.url) {
        if (post.coverImage.url.startsWith('/')) {
          imageUrl = BASE_URL + post.coverImage.url;
        } else {
          imageUrl = post.coverImage.url;
        }
      }

      const articleHTML = `
        <div class="col-lg-4 col-md-6 fade_anim" data-delay=".2">
            <div class="blog-card style-2">
                <div class="blog-image-wrap">
                    <a class="blog-img shape-hover-item" href="news-article-details.html?slug=${slug}">
                        <img src="${imageUrl}" alt="${title}">
                    </a>
                </div>
                <div class="blog-content">
                    <ul class="blog-meta">
                        
                        <li><a href="news-article-details.html?slug=${slug}">${formattedDate}</a></li>
                        <li>
                            <svg width="37" height="6" viewBox="0 0 37 6" xmlns="http://www.w3.org/2000/svg">
                                <path d="M32 3.38672L37 5.77347L37 -3.26633e-05L32 2.38672L32 3.38672ZM5 2.38672L2.18264e-07 -3.54609e-05L-2.18264e-07 5.77347L5 3.38672L5 2.38672ZM32.5 2.88672L32.5 2.38672L4.5 2.38672L4.5 2.88672L4.5 3.38672L32.5 3.38672L32.5 2.88672Z"></path>
                            </svg>
                        </li>
                    </ul>
                    <h3><a href="news-article-details.html?slug=${slug}">${title}</a></h3>
                    <a href="news-article-details.html?slug=${slug}" class="view-details-btn">Read More &rarr;</a>
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



// const BASE_URL = 'http://localhost:1337'; 

// async function loadBlogPosts() {
//   const container = document.getElementById('blog-grid');
  
//   // Safety check: If there is no blog grid on the current page, stop running the script
//   if (!container) return; 
  
//   container.classList.add('row'); 
  
//   // 1. Start with the base URL (Populate images and sort by newest)
//   let fetchUrl = `${BASE_URL}/api/blogs?populate=*&sort=publishedAt:desc`;
  
//   // 2. Check the HTML for a data-limit attribute
//   const limit = container.getAttribute('data-limit');
  
//   // 3. If a limit exists (like on the homepage), attach it to the URL
//   if (limit) {
//     fetchUrl += `&pagination[limit]=${limit}`;
//   }

//   try {
//     // 4. Use our dynamically generated URL!
//     const response = await fetch(fetchUrl);
//     const { data } = await response.json(); 
    
//     data.forEach(post => {
//       const title = post.title;
//       const slug = post.slug;
      
//       const rawDate = post.publishedAt; 
//       const formattedDate = new Date(rawDate).toLocaleDateString('en-GB', {
//         day: 'numeric',
//         month: 'long',
//         year: 'numeric'
//       });
      
//       let imageUrl = 'assets/image/start-up2/blog-img.png'; 
//       if (post.coverImage) {
//         imageUrl = BASE_URL + post.coverImage.url;
//       }

//       const articleHTML = `
//         <div class="col-lg-4 col-md-6 fade_anim" data-delay=".2">
//             <div class="blog-card style-2">
//                 <div class="blog-image-wrap">
//                     <a class="blog-img shape-hover-item" href="news-article-details.html?slug=${slug}">
//                         <img src="${imageUrl}" alt="${title}">
//                     </a>
//                 </div>
//                 <div class="blog-content">
//                     <ul class="blog-meta">
//                         <li><a href="#">Industry Insight</a></li>
//                         <li><a href="news-article-details.html?slug=${slug}">${formattedDate}</a></li>
//                     </ul>
//                     <h3><a href="news-article-details.html?slug=${slug}">${title}</a></h3>
//                     <a href="news-article-details.html?slug=${slug}" class="view-details-btn">Read More &rarr;</a>
//                 </div>
//             </div>
//         </div>
//       `;
      
//       container.insertAdjacentHTML('beforeend', articleHTML);
//     });

//   } catch (error) {
//     console.error("Failed to load posts from Strapi:", error);
//   }
// }

// loadBlogPosts();




