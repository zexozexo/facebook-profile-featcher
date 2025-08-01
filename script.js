const api = "https://forestapi.vercel.app/api/facebook/user/";
const accountLink = document.getElementById("accountLink");
const resultContent = document.getElementById("resultContent");

function getUserProfile() {
  if (accountLink.value.startsWith("https://www.facebook.com/")) {
    
    const username = accountLink.value.slice(25);
    async function getUser() {
      try {
        const res = await fetch(api + username);
        const result = await res.json();
        return result;
      } catch (e) {
        console.log(`Error: ${e}`);
      }
    }
    
    getUser().then(result => {
      if (result.status == true) {
        resultContent.innerHTML = `
          <div class="flex items-center justify-between gap-5">
            <div class="flex items-center gap-5">
              <div class="w-[50px] h-[50px] flex items-center justify-center overflow-hidden rounded-full">
                <img class="w-full h-auto flex items-center justify-center" src="${result.image_url}" alt="User profile photo">
              </div>
              <div class="flex flex-col">
                <h3 class="font-semibold">${result.name}</h3>
                <h4>Facebook</h4>
              </div>
            </div>
            <a href="${accountLink}">
              <button class="text-white py-1 px-3 bg-blue-500 rounded" type="button">Visit</button>
            </a>
          </div>
        `;
      } else {
        resultContent.innerHTML = `
          <div class="w-fit mx-auto">
            <h4>Account not found.</h4>
          </div>
        `;
      }
    });
    
    resultContent.classList.add("hidden");
    resultContent.classList.remove("hidden");
    
  } else {
    alert("Invalid account link.");
  }
}