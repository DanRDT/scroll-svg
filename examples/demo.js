document.addEventListener("click", (e) => {
  if (e.target.closest("[data-dropdown]") === null) {
    document.querySelector("[data-dropdown].active").classList.remove("active")
    return
  }
  e.target.closest("[data-dropdown]").classList.add("active")
})
