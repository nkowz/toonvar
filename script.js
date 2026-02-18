window.onload = () => {
  loader.style.display = "none";

  // shuffle trending
  [...trendGrid.children].sort(() => Math.random() - 0.5).forEach(e => trendGrid.appendChild(e));

  loadFavs();
};

// POPUP
document.addEventListener("click", e => {
  let item = e.target.closest(".trend-item");

  if (item && !e.target.classList.contains("fav-btn")) {
    popup.style.display = "flex";
    popupImg.src = item.dataset.img;
    popupTitle.innerText = item.dataset.title;
  }

  if (e.target.id == "popup" || e.target.id == "closePopup") popup.style.display = "none";
});

// SEARCH
document.querySelector(".search-box input").addEventListener("input", e => {
  let q = e.target.value.toLowerCase();
  document.querySelectorAll(".trend-item").forEach(i => {
    i.style.display = i.dataset.title.toLowerCase().includes(q) ? "" : "none";
  });
});

// TAG FILTER
tagFilter.addEventListener("change", e => {
  let tag = e.target.value;
  document.querySelectorAll(".trend-item").forEach(i => {
    i.style.display = tag == "all" || i.dataset.tags.includes(tag) ? "" : "none";
  });
});

// FAVORITES SYSTEM (localStorage)
let favs = JSON.parse(localStorage.getItem("favs") || "[]");

document.addEventListener("click", e => {
  if (!e.target.classList.contains("fav-btn")) return;
  let card = e.target.closest(".trend-item");
  let title = card.dataset.title;

  if (favs.includes(title)) {
    favs = favs.filter(f => f != title);
    e.target.classList.remove("active");
  } else {
    favs.push(title);
    e.target.classList.add("active");
  }

  localStorage.setItem("favs", JSON.stringify(favs));
  loadFavs();
});

function loadFavs() {
  favGrid.innerHTML = "";
  document.querySelectorAll(".trend-item").forEach(card => {
    let btn = card.querySelector(".fav-btn");
    if (favs.includes(card.dataset.title)) {
      btn.classList.add("active");
      favGrid.appendChild(card.cloneNode(true));
    } else {
      btn.classList.remove("active");
    }
  });
}
// ===== UPLOAD POPUP =====
const uploadBtn = document.getElementById("uploadBtn");
const uploadPopup = document.getElementById("uploadPopup");

uploadBtn.onclick = () => uploadPopup.style.display = "flex";
document.getElementById("closeUpload").onclick = () => uploadPopup.style.display = "none";

// ===== LOAD MY POSTS =====
let myPosts = JSON.parse(localStorage.getItem("myPosts") || "[]");

function loadMyPosts() {
  const grid = document.getElementById("myPostGrid");
  grid.innerHTML = "";

  myPosts.forEach(post => {
    const div = document.createElement("div");
    div.className = "trend-item";
    div.dataset.title = post.title;
    div.dataset.tags = post.tags;
    div.dataset.img = post.img;

    div.innerHTML = `
      <button class="delete-btn">🗑</button>
      <button class="fav-btn">☆</button>
      <img src="${post.img}">
      <div class="card-info">
        <p class="title">${post.title}</p>
        <span class="tags">${post.tags}</span>
      </div>
    `;
    grid.appendChild(div);
  });
}

loadMyPosts();

// ===== POST BUTTON =====
document.getElementById("postBtn").onclick = () => {
  const file = document.getElementById("uploadImage").files[0];
  const title = document.getElementById("uploadTitle").value;
  const tags = document.getElementById("uploadTags").value;

  if (!file || !title) return alert("Add image and title");

  const reader = new FileReader();
  reader.onload = () => {
    myPosts.push({
      img: reader.result,
      title,
      tags
    });

    localStorage.setItem("myPosts", JSON.stringify(myPosts));
    loadMyPosts();
    uploadPopup.style.display = "none";
  };

  reader.readAsDataURL(file);
};
