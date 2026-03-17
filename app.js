let concerts = JSON.parse(localStorage.getItem("concerts")) || [];

function save() {
  localStorage.setItem("concerts", JSON.stringify(concerts));
}

function render() {
  const list = document.getElementById("list");
  list.innerHTML = "";

  concerts.sort((a,b) => new Date(b.date) - new Date(a.date));

  concerts.forEach((c, i) => {
    list.innerHTML += `
      <div class="concert">
        <strong>${c.artist}</strong> (${c.rating || "-"}/5)<br>
        ${c.venue}, ${c.city}<br>
        ${c.date}<br>
        <em>${c.notes || ""}</em><br>
        <button onclick="removeConcert(${i})">Delete</button>
      </div>
    `;
  });
}

function addConcert() {
  const concert = {
    artist: document.getElementById("artist").value,
    venue: document.getElementById("venue").value,
    city: document.getElementById("city").value,
    date: document.getElementById("date").value,
    rating: document.getElementById("rating").value,
    notes: document.getElementById("notes").value
  };

  concerts.push(concert);
  save();
  render();

  document.querySelectorAll("input, textarea").forEach(el => el.value = "");
}

function removeConcert(i) {
  concerts.splice(i, 1);
  save();
  render();
}

render();

// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}
